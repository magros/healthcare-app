import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { registerElement } from 'nativescript-angular/element-registry';
import { RouterExtensions, PageRoute } from 'nativescript-angular/router';
import {
    Location,
    getCurrentLocation,
    isEnabled,
    distance,
    enableLocationRequest
} from 'nativescript-geolocation';
import { Accuracy } from 'tns-core-modules/ui/enums';
import { MapView, Marker, Position } from 'nativescript-google-maps-sdk';
import { MapSearchService } from './map-search.service';
import { PlatformLocation } from '@angular/common';

registerElement('MapView', () => MapView);

@Component({
    selector: 'ns-map-search',
    templateUrl: './map-search.component.html',
    styleUrls: ['./map-search.component.css']
})
export class MapSearchComponent implements OnInit {
    latitude: number = 0;
    longitude: number = 0;
    zoom: number = 14.8;
    minZoom: number = 0;
    maxZoom: number = 22;
    mapView: MapView & { infoWindowTemplates: string };
    searchUrl: string;
    urlWithParams: string;
    offices = [];
    isBusy: boolean = false;
    params: any = {
        stateId: '',
        specialityId: '',
        insurerId: '',
        hospitalId: ''
    };

    constructor(
        private router: RouterExtensions,
        private pageRoute: PageRoute,
        private mapSearchService: MapSearchService,
        private location: PlatformLocation
    ) {}

    ngOnInit() {
        this.isBusy = true;
        this.pageRoute.activatedRoute.subscribe(activatedRoute => {
            activatedRoute.paramMap.subscribe(param => {
                this.params = param;
                console.log(this.params);
                this.searchUrl = this.buildSearchUrlWithParameters(
                    param.get('stateId'),
                    param.get('specialityId'),
                    param.get('insurerId'),
                    param.get('hospitalId')
                );
                this.urlWithParams = this.buildSearchUrl(
                    param.get('stateId'),
                    param.get('specialityId'),
                    param.get('insurerId'),
                    param.get('hospitalId')
                );

                this.mapSearchService
                    .findOffices(this.searchUrl)
                    .subscribe((res: any) => {
                        this.offices = res.data;
                        this.isBusy = false;
                    });
            });
            // this.location. .onPopState(() => {
            //     setTimeout(() => {
            //         this.mapSearchService
            //             .findOffices(this.searchUrl)
            //             .subscribe((res: any) => {
            //                 this.offices = res.data;
            //                 for (let office of this.offices) {
            //                     console.log(office);
            //                     this.addMarker(office);
            //                 }
            //             });
            //     }, 2000);
            // });
        });
    }

    onMapReady = event => {
        console.log('Map Ready');

        this.mapView = event.object;
        const template = `
        <template key="dropTemplate">
            <StackLayout orientation="horizontal"
                verticalAlignment="center"
                margin="0 0 0 0"
                width="310" height="140" >
                    <Image src="{{userData.doctorAvatar}}" width="150" height="150" class="img-rounded p-l-15 p-r-15 p-t-15"></Image>
                    <StackLayout verticalAlignment="center" width="180" height="120">
                        <Label text="{{userData.doctorName}}" textAlignment="center" textWrap="true" style="font-size: 15; color:#00C3B0; font-weigth:bold">
                        </Label>
                        <Label text="{{userData.speciality}}" textAlignment="center" textWrap="true" style="font-size: 12; color:#222B54">
                        </Label>
                        <Label text="{{userData.address + ', ' + userData.suburb}}" textAlignment="center" textWrap="true">
                        </Label>
                    </StackLayout>
            </StackLayout>
        </template>`;
        this.mapView.infoWindowTemplates = template;
        isEnabled()
            .then(isLocationEnabled => {
                // if (!isLocationEnabled) {
                //     alert(
                //         'Los servicios de ubicación no están disponibles. Por favor, actívelos.'
                //     );
                // }
            })
            .catch(err => {
                console.log('location error: ' + (err.message || err));
            });

        getCurrentLocation({
            desiredAccuracy: Accuracy.high,
            timeout: 5000
        })
            .then(location => {
                //console.log("Location received: " + location);
                this.latitude = location.latitude;
                this.longitude = location.longitude;
            })
            .catch(error => {
                console.log('Location error received: ' + error);
                alert('Location error received: ' + error);
            });
        //console.log(this.offices);

        if (!this.offices.length) {
            this.mapSearchService
                .findOffices(this.searchUrl)
                .subscribe((res: any) => {
                    this.offices = res.data;
                    this.isBusy = false;
                    for (let office of this.offices) {
                        //console.log(office);
                        this.addMarker(office);
                        //this.addMarker(20.6163179, -100.4048062);
                    }
                });
            return;
        }
        for (let office of this.offices) {
            //console.log(office);
            this.addMarker(office);
            //this.addMarker(20.6163179, -100.4048062);
        }
    };

    navigateToResultList() {
        console.log(this.searchUrl);
        this.router.navigate([`/results/${this.urlWithParams}`]);
    }

    navigateToFilters() {
        this.router.navigate(['/search']);
    }

    addMarker(office): void {
        //console.log('Setting a marker...');
        var marker = new Marker();
        marker.position = Position.positionFromLatLng(
            office.latitude,
            office.longitude
        ); //)20.614365,-100.3895987);
        marker.userData = {
            doctorId: office.doctor.id,
            doctorName: office.doctor.name,
            doctorAvatar: office.doctor.avatar_url,
            address: office.address,
            suburb: office.suburb,
            city: office.city,
            postalCode: office.doctor.postal_code,
            speciality: office.doctor.specialities[0].description
        };
        marker.infoWindowTemplate = 'dropTemplate';
        this.mapView.addMarker(marker);
    }

    onMarkerEvent(args) {
        //console.log(args);
        args.marker.showInfoWindow();
    }

    navigateToDoctor(args) {
        this.router.navigate([
            `/doctor-detail/${args.marker.userData.doctorId}`
        ]);
    }

    buildSearchUrlWithParameters(loc, spec, insurance, hosp) {
        // /api/doctors?stateId=1&specialityId=1&insurerId=1&hospitalId=1
        let url = '?';
        if (loc != 0 && loc != null) url += `stateId=${loc}&`;

        if (spec != 0 && spec != null) url += `specialityId=${spec}&`;

        if (insurance != 0 && insurance !== null)
            url += `insurerId=${insurance}&`;

        if (hosp != 0 && hosp != null) url += `hospitalId=${hosp}&`;
        this.searchUrl = url.slice(0, url.length - 1);
        return url.slice(0, url.length - 1);
    }

    buildSearchUrl(location, specs, insurer, hospital) {
        // /api/doctors?stateId=1&specialityId=1&insurerId=1&hospitalId=1
        return `${location ? location : 0}/${specs ? specs : 0}/${
            insurer ? insurer : 0
        }/${hospital ? hospital : 0}`;
    }

    getBack() {
        this.router.backToPreviousPage();
    }
}
