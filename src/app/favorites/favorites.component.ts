import { Component, OnInit } from '@angular/core';
import { FavoritesService } from './favorites.service';
import { RouterExtensions } from 'nativescript-angular';
import { PlatformLocation } from '@angular/common';
import { DoctorService } from '../doctor/doctor.service';

@Component({
    selector: 'ns-favorites',
    templateUrl: './favorites.component.html',
    styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
    favs = [];
    isBusy: boolean = false;

    constructor(
        private favService: FavoritesService,
        private router: RouterExtensions,
        private location: PlatformLocation,
        private doctorService: DoctorService
    ) {}

    ngOnInit() {
        this.isBusy = true;
        this.fetchFavorites();
        this.location.onPopState(() => {
            this.fetchFavorites()
        })



    }

    getBack() {
        this.router.backToPreviousPage();
    }

    fetchFavorites() {
        this.favService.fetchFavoriteDoctors().subscribe((res: any) => {
            this.favs = res.data;
            console.log(this.favs)
            this.isBusy = false;
        });
    }

    navigateToDetails(args) {
        console.log(args)
        let docId = this.favs[args.index].id
        this.router.navigate([`/doctor-detail/${docId}`]);
    }

    navigateToDocDetail(id) {
        this.router.navigate([`/doctor-detail/${id}`]);
    }

    toggleDoctor(docId) {
        this.doctorService.setAsFavorite(docId)
            .subscribe((res: any) => {
                alert('Quitado de favoritos')
                this.fetchFavorites()
            })
    }
}
