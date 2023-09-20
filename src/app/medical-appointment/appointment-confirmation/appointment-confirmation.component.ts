import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {
    PageRoute,
    RouterExtensions,
    ModalDialogService
} from 'nativescript-angular';
import { AppointmentConfirmationService } from '~/app/medical-appointment/appointment-confirmation/appointment-confirmation.service';
import { tap } from 'rxjs/operators';
import { PaymentSelectionModalComponent } from './payment-selection/payment-selection-modal.component';
import { NotificationService } from '~/app/auth/notification.service';

@Component({
    selector: 'ns-appointment-confirmation',
    templateUrl: './appointment-confirmation.component.html',
    styleUrls: ['./appointment-confirmation.component.css']
})
export class AppointmentConfirmationComponent implements OnInit {
    doctorId;
    date;
    hour;
    doctorMedicalServiceId;
    isBusy: boolean = false;

    doctorOffice = {
        address: '',
        suburb: '',
        description: '',
        contact_phone: '',
        id: ''
    };
    service = { cost: '' };

    constructor(
        private router: RouterExtensions,
        private pageRoute: PageRoute,
        private appointmentConfirmationService: AppointmentConfirmationService,
        private modalService: ModalDialogService,
        private vcRef: ViewContainerRef,
        private notificationService: NotificationService
    ) {}

    ngOnInit() {
        this.isBusy = true;
        this.pageRoute.activatedRoute.subscribe(activatedRoute => {
            activatedRoute.paramMap.subscribe(param => {
                this.doctorId = param.get('doctorId');
                this.hour = param.get('hour');
                this.date = new Date(
                    parseInt(param.get('year')),
                    parseInt(param.get('month')),
                    parseInt(param.get('day'))
                );
                this.doctorMedicalServiceId = param.get(
                    'doctorMedicalServiceId'
                );

                this.appointmentConfirmationService
                    .findOffice(param.get('officeId'))
                    .subscribe((results: any) => {
                        this.doctorOffice = results;
                    });

                this.appointmentConfirmationService
                    .findDoctorService(
                        this.doctorId,
                        this.doctorMedicalServiceId
                    )
                    .subscribe((results: any) => {
                        console.log(results);
                        this.service = results;
                    });
                this.isBusy = false;
            });
        });
    }

    confirmAppointment() {
        this.isBusy = true;

        this.modalService
            .showModal(PaymentSelectionModalComponent, {
                fullscreen: false,
                viewContainerRef: this.vcRef
            })
            .then((res: any) => {
                if (res) {
                    this.makePayment();
                    this.appointDate();
                }
                this.isBusy = false;
            });
    }

    appointDate() {
        this.appointmentConfirmationService
            .appointDate(
                this.doctorOffice.id,
                this.doctorMedicalServiceId,
                this.hour,
                this.date
            )
            .subscribe(
                (res: any) => {
                    console.log('response', res);
                    this.isBusy = false;
                    alert('Cita agendada correctamente');
                    this.notificationService.scheduleNotification({
                        id: res.data.id,
                        date: res.data.date,
                        service: res.data.medical_service.name,
                        hour: res.data.hour,
                        name: res.data.office.doctor.name
                    });
                    this.router.navigate(['/appointments'], {
                        clearHistory: true
                    });
                },
                err => {
                    this.isBusy = false;
                    alert(err);
                }
            );
    }

    makePayment() {}
}
