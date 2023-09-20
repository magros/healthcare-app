import { Component, OnInit } from '@angular/core';
import { RouterExtensions, PageRoute } from 'nativescript-angular/router';
import {
    ValueList,
    SelectedIndexChangedEventData,
    DropDown
} from 'nativescript-drop-down';
import { Page } from 'tns-core-modules/ui/page/page';
import { CalendarService } from '~/app/calendar/calendar.service';

@Component({
    selector: 'ns-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
    private weeks = [];
    private months: ValueList<number>;

    weekDays = ['D', 'L', 'M', 'Mi', 'J', 'V', 'S'];
    days: { dayInMonth: number; dayInWeek: number }[] = [];
    selectedMedicalService: number;
    selectedOffice: number;
    selectedMonthIndex: number;
    private currentMonth: number;
    private currentYear: number;
    private currentDay: number;

    doctorId: string;
    isBusy: boolean = false

    private docOffices: ValueList<string>;

    private medicalServices: ValueList<string>;

    constructor(
        private router: RouterExtensions,
        private page: Page,
        private pageRoute: PageRoute,
        private calendarService: CalendarService
    ) {}

    ngOnInit() {
        this.isBusy = true;
        this.pageRoute.activatedRoute.subscribe(activatedRoute => {
            activatedRoute.paramMap.subscribe(param => {
                this.doctorId = param.get('doctorId');

                this.calendarService
                    .getDoctorOffices(this.doctorId)
                    .subscribe((transformedData: any) => {
                        this.docOffices = new ValueList<string>(
                            transformedData
                        );
                    });
                this.calendarService
                    .getDoctorServices(this.doctorId)
                    .subscribe((transformedData: any) => {
                        this.medicalServices = new ValueList<string>(
                            transformedData
                        );
                    });
                this.initCalendar();
                this.initMonthList();
                this.isBusy = false;
            });
        });
    }

    get weeksInMonth() {
        return this.weeks;
    }

    get allMonths() {
        return this.months;
    }

    get allOffices() {
        return this.docOffices;
    }

    get allServices() {
        return this.medicalServices;
    }

    navigateToCalendarDetail(day) {
        if(day < new Date().getDate()) return

        const medicalService = this.medicalServices.getValue(
            this.selectedMedicalService
        );
        const selectedOffice = this.docOffices.getValue(this.selectedOffice);
        console.log(selectedOffice, medicalService)
        if(!medicalService || !selectedOffice) return

        this.currentDay = day;
        console.log(this.buildSearchUrl());
        return this.router.navigate([
            '/calendar-detail/' + this.buildSearchUrl()
        ]);
    }

    buildSearchUrl() {
        const medicalService = this.medicalServices.getValue(
            this.selectedMedicalService
        );
        const selectedOffice = this.docOffices.getValue(this.selectedOffice);

        return `${this.doctorId}/${
            this.currentDay < 10 ? `0${this.currentDay}` : this.currentDay
        }-${
            this.currentMonth + 1 < 10 ? `0${this.currentMonth + 1}` : this.currentMonth + 1
        }-${this.currentYear}/${medicalService}/${selectedOffice}`;
    }

    initCalendar(month = null) {
        this.currentYear = new Date().getFullYear();
        this.currentMonth = month ? month : new Date().getMonth();
        const daysInMont = new Date(
            this.currentYear,
            this.currentMonth + 1,
            0
        ).getDate();

        for (let i = 1; i < daysInMont + 1; i++) {
            const date = new Date(this.currentYear, this.currentMonth, i);
            const dayInWeek = date.getDay();
            this.days.push({ dayInMonth: i, dayInWeek: dayInWeek });
        }
    }

    getRow(index: number, day: { dayInMonth: number; dayInWeek: number }) {
        const startRow = 1;
        const weekRow = Math.floor(index / 7);
        const firstWeekDayOfMonth = new Date(
            this.currentYear,
            this.currentMonth,
            1
        ).getDay();
        const irregularRow = day.dayInWeek < firstWeekDayOfMonth ? 1 : 0;

        return startRow + weekRow + irregularRow;
    }

    changeMonth(args: SelectedIndexChangedEventData) {
        console.log('Month changed: ', args.newIndex)
        this.days = [];
        this.initCalendar(this.months.getValue(args.newIndex));
    }

    initMonthList() {
        let months = [
            'Enero',
            'Febrero',
            'Marzo',
            'Abril',
            'Mayo',
            'Junio',
            'Julio',
            'Agosto',
            'Septiembre',
            'Octubre',
            'Noviembre',
            'Diciembre'
        ];
        this.months = new ValueList<number>();

        for (let i = this.currentMonth; i < 12; i++)
            this.months.push({ value: i, display: months[i] });

        this.selectedMonthIndex = 0;
    }

    officeChanged(args: SelectedIndexChangedEventData) {
        this.selectedOffice = args.newIndex;
    }

    serviceChanged(args: SelectedIndexChangedEventData) {
        this.selectedMedicalService = args.newIndex;
    }

    isCurrentDay(day) {
        let date = new Date()
        return day === date.getDate() && this.currentMonth == date.getMonth()
    }

    isInvalidDate(day) {
        let date = new Date()
        return day < date.getDate() && this.currentMonth == date.getMonth()
    }
}
