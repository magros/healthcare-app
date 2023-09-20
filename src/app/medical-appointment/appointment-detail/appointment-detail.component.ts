import { Component, OnInit } from '@angular/core';
import { registerElement } from 'nativescript-angular/element-registry';
import { Accuracy } from 'tns-core-modules/ui/enums';
import { MapView, Marker, Position } from 'nativescript-google-maps-sdk';
import { MedicalAppointmentService } from '../medical-appointment.service';
import { PageRoute } from 'nativescript-angular/router';

registerElement('MapView', () => MapView);

@Component({
    selector: 'ns-appointment-detail',
    templateUrl: './appointment-detail.component.html',
    styleUrls: ['./appointment-detail.component.css']
})
export class AppointmentDetailComponent implements OnInit {
    zoom: number = 14.8;
    latitude: number = 0;
    longitude: number = 0;
    minZoom: number = 0;
    maxZoom: number = 22;
    mapView: MapView;

    appointDetail = {
        date: '',
        hour: '',
        id: '',
        name: '',
        cost: '',
        service: '',
        address: '',
        lat: '',
        long: ''
    };

    constructor(
        private appointmentService: MedicalAppointmentService,
        private pageRoute: PageRoute
    ) {}

    ngOnInit() {
        this.pageRoute.activatedRoute.subscribe(activatedRoute => {
            activatedRoute.paramMap.subscribe(param => {
                console.log(param);
                this.appointmentService.fetchAppointments().subscribe(
                    (res: Array<any>) => {
                        let app = res.find(
                            ap => ap.id == param.get('appointmentId')
                        );
                        this.appointDetail = app;
                        setTimeout(() => {
                            this.addMarker(
                                this.appointDetail.lat,
                                this.appointDetail.long
                            );
                            this.latitude = parseFloat(this.appointDetail.lat);
                            this.longitude = parseFloat(
                                this.appointDetail.long
                            );
                        }, 1000);
                    },
                    err => {
                        console.log(err);
                        alert('Ocurrió un error');
                    }
                );
            });
        });
    }

    onMapReady = event => {
        console.log('Map Ready');
        this.mapView = event.object;
        console.log(this.mapView);
    };

    addMarker(lat, long) {
        let marker = new Marker();
        marker.position = Position.positionFromLatLng(lat, long);
        this.latitude = lat;
        this.longitude = long;
        this.mapView.addMarker(marker);
    }
}
