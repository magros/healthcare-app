import { Injectable, NgZone } from '@angular/core';
import { LocalNotifications } from 'nativescript-local-notifications';
import { MedicalAppointmentService } from '../medical-appointment/medical-appointment.service';
import { RouterExtensions } from 'nativescript-angular';

@Injectable()
export class NotificationService {
    constructor(
        private appointmentService: MedicalAppointmentService,
        private router: RouterExtensions,
        private ngZone: NgZone
    ) {}

    initNotificationSubscription() {
        this.appointmentService.fetchAppointments().subscribe((res: any) => {
            //console.log(res);
            let count = 1;
            for (let appoint of res) {
                LocalNotifications.schedule([
                    {
                        id: appoint.id,
                        title: 'Recordatorio de cita médica',
                        body: `${appoint.date} - ${appoint.hour} | ${
                            appoint.name
                        } - ${appoint.service}`,
                        forceShowWhenInForeground: true,
                        at: new Date(new Date().getTime() + count * 15 * 1000),
                        actions: [
                            {
                                id: 'go-to-appoint',
                                type: 'button',
                                title: 'Ver detalles',
                                launch: true,
                                editable: true
                                // choices: ["Red", "Yellow", "Green"] // TODO Android only, but yet to see it in actio
                            }
                        ]
                    }
                ])
                    .then(() => {})
                    .catch(error =>
                        console.log('doScheduleId5WithInput error: ' + error)
                    );
                count++;
            }
        });
    }

    fetchAllPatientsAppointments() {}

    scheduleNotification(appoint: any) {
        LocalNotifications.schedule([
            {
                id: appoint.id,
                title: 'Recordatorio de cita médica',
                body: `${appoint.date} - ${appoint.hour} | ${appoint.name} - ${
                    appoint.service
                }`,
                forceShowWhenInForeground: true,
                at: new Date(new Date().getTime() * 25 * 1000),
                actions: [
                    {
                        id: 'go-to-appoint',
                        type: 'button',
                        title: 'Ver detalles',
                        launch: true,
                        editable: true
                        // choices: ["Red", "Yellow", "Green"] // TODO Android only, but yet to see it in actio
                    }
                ]
            }
        ])
            .then(() => {})
            .catch(error =>
                console.log('doScheduleId5WithInput error: ' + error)
            );
    }
}
