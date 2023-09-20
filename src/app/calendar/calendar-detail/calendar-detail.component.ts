import { Component, OnInit } from '@angular/core';
import { PageRoute, RouterExtensions } from 'nativescript-angular/router';
import { CalendarService } from '~/app/calendar/calendar.service';

@Component({
    selector: 'ns-calendar-detail',
    templateUrl: './calendar-detail.component.html',
    styleUrls: ['./calendar-detail.component.css']
})
export class CalendarDetailComponent implements OnInit {
    doctorId: string;
    doctorMedicalServiceId: string;
    officeId: string;

    searchUrl: string;
    days: Array<any>;
    isBusy: boolean;

    constructor(
        private router: RouterExtensions,
        private pageRoute: PageRoute,
        private calendarService: CalendarService
    ) {}

    ngOnInit() {
        this.pageRoute.activatedRoute.subscribe(activatedRoute => {
            activatedRoute.paramMap.subscribe(param => {
                this.isBusy = true;

                this.doctorId = param.get('doctorId');
                this.doctorMedicalServiceId = param.get(
                    'doctorMedicalServiceId'
                );
                this.officeId = param.get('officeId');
                this.calendarService
                    .getOfficeSchedule(
                        param.get('officeId'),
                        this.buildSearchUrlWithParameters(
                            param.get('date'),
                            param.get('doctorMedicalServiceId')
                        )
                    )
                    .subscribe(
                        (results: any) => {
                            //console.log(results);
                            this.days = results;
                            this.isBusy = false;
                        },
                        error => {
                            this.isBusy = false;
                            //console.log(error);
                            alert(
                                'Error al cargar los horarios. Intente más tarde.'
                            );
                            this.router.backToPreviousPage();
                        }
                    );
            });
        });
    }

    navigateToConfirmation(hour, date, status) {
        console.log(hour, date, status);
        if (status !== 'available') return;
        // appointment-confirmation/:doctorId/:date/:doctorMedicalServiceId/:officeId/:hour
        this.router.navigate([
            `/appointment-confirmation/${this.doctorId}/${date}/${
                this.doctorMedicalServiceId
            }/${this.officeId}/${hour}`
        ]);
    }

    buildSearchUrlWithParameters(date, doctorMedicalServiceId) {
        let url = '?';
        if (date != 0 && date != null) url += `date=${date}&`;

        if (doctorMedicalServiceId != 0 && doctorMedicalServiceId != null)
            url += `doctorMedicalServiceId=${doctorMedicalServiceId}&`;

        this.searchUrl = url.slice(0, url.length - 1);

        return url.slice(0, url.length - 1);
    }
}
