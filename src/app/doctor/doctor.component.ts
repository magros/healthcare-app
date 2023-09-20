import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RouterExtensions, PageRoute } from 'nativescript-angular/router';
import { DoctorService } from './doctor.service';
import * as SocialShare from 'nativescript-social-share';
import { AuthService } from '../auth/auth.service';
import { Page } from 'tns-core-modules/ui/page/page';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'ns-doctor',
    templateUrl: './doctor.component.html',
    styleUrls: ['./doctor.component.css'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class DoctorComponent implements OnInit {
    doctorDetails = {
        name: '',
        specialities: [{ description: '' }],
        professional_license: '',
        experience_summary: '',
        id: '',
        avatar_url: '',
        medical_services: [],
        opinions: [
            {
                commentaries: '',
                commenter_name: '',
                rate: 0,
                date: '',
                commenter_id: 0
            }
        ],
        rate: 0,
        offices: []
    };

    backgroundImage: string = '';

    constructor(
        private router: RouterExtensions,
        private doctorService: DoctorService,
        private pageRoute: PageRoute,
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.pageRoute.activatedRoute.subscribe(activatedRoute => {
            activatedRoute.paramMap.subscribe(param => {
                this.doctorService
                    .findDoctor(param.get('doctorId'))
                    .subscribe((res: any) => {
                        //console.log(res.data);
                        this.doctorDetails = res.data;
                        this.backgroundImage = this.doctorDetails.avatar_url;
                    });
            });
        });
    }

    navigateToCalendar(doctorId) {
        if (this.doctorDetails.offices.length == 0) {
            alert('Este médico no tiene consultorios registrados.');
            return;
        }
        this.router.navigate([`/calendar/${doctorId}`]);
    }

    navigateToComment(doctorId) {
        this.router.navigate([`/comments/${doctorId}`]);
    }

    goBack() {
        this.router.backToPreviousPage();
    }

    setDoctorAsFavorite(doctorId) {
        this.doctorService.setAsFavorite(doctorId).subscribe((res: any) => {
            //console.log(res);
            if (res.data.length > 0) alert('Añadido com favorito');
            else alert('Eliminado de favoritos');
        });
    }

    get backgroundImageUrl() {
        if (this.backgroundImage) {
            return `url("${this.backgroundImage}")`;
        }

        return null;
    }

    shareDoctorProfileLink() {
        SocialShare.shareUrl(
            `http://healthmanager.com.mx/doctores/${this.doctorDetails.professional_license}`,
            `Perfil del doctor ${this.doctorDetails.name}`,
            'Recomendar médico'
        );
    }

    canComment() {
        let patientId = this.authService.getCurrentPatientId();
        let patient = this.doctorDetails.opinions.find(comm => {
            return comm.commenter_id == patientId;
        });
        return this.doctorDetails.opinions.length > 0 && !patient;
    }
}
