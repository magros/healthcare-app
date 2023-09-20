import { Component, OnInit } from '@angular/core';
import { MedicalAppointmentService } from './medical-appointment.service';
import { RouterExtensions } from 'nativescript-angular';

@Component({
    selector: 'ns-medical-appointment',
    templateUrl: './medical-appointment.component.html',
    styleUrls: ['./medical-appointment.component.css']
})
export class MedicalAppointmentComponent implements OnInit {
    appointments = [{ date: '', hour: '', id: '', name: '' }];
    isBusy: boolean = false;

    constructor(
        private appointmentService: MedicalAppointmentService,
        private router: RouterExtensions
    ) {}

    ngOnInit() {
        this.isBusy = true;
        this.appointmentService.fetchAppointments().subscribe(
            (res: any) => {
                //console.log(res)
                this.appointments = res;
                this.isBusy = false;
            },
            err => {
                this.isBusy = false;
                //console.log(err)
                alert('Ocurrió un error');
            }
        );
    }

    goToDetails(appointmentId) {
        this.router.navigateByUrl(`/appointment-details/${appointmentId}`);
    }
}
