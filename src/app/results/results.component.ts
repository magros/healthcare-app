import { Component, OnInit } from '@angular/core';
import { RouterExtensions, PageRoute } from 'nativescript-angular/router';
import { SearchService } from '../search/search.service';
import { ResultsService } from './results.service';

@Component({
    selector: 'ns-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
    constructor(
        private router: RouterExtensions,
        private pageRoute: PageRoute,
        private resultsService: ResultsService
    ) {}

    doctors = [];
    searchUrl = '';
    urlWithParams: string;
    isBusy = false;

    ngOnInit() {
        this.isBusy = true;
        this.pageRoute.activatedRoute.subscribe(activatedRoute => {
            activatedRoute.paramMap.subscribe(param => {
                this.urlWithParams = this.buildSearchUrl(
                    param.get('stateId'),
                    param.get('specialityId'),
                    param.get('insurerId'),
                    param.get('hospitalId')
                );

                this.resultsService
                    .search(
                        this.buildSearchUrlWithParameters(
                            param.get('stateId'),
                            param.get('specialityId'),
                            param.get('insurerId'),
                            param.get('hospitalId')
                        )
                    )
                    .subscribe((results: any) => {
                        //console.log(results);
                        this.doctors = results.data;
                        this.isBusy = false;
                    });
            });
        });
    }

    public navigateToMap() {
        this.router.navigate([`/map-search/${this.urlWithParams}`]);
    }

    navigateToDetails(args) {
        //console.log(args)
        let docId = this.doctors[args.index].id;
        this.router.navigate([`/doctor-detail/${docId}`]);
    }

    navigateToFilters() {
        this.router.navigate(['/search']);
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

    getBack() {
        this.router.backToPreviousPage();
    }

    buildSearchUrl(location, specs, insurer, hospital) {
        // /api/doctors?stateId=1&specialityId=1&insurerId=1&hospitalId=1
        return `${location ? location : 0}/${specs ? specs : 0}/${
            insurer ? insurer : 0
        }/${hospital ? hospital : 0}`;
    }

    navigateToDocDetail(id) {
        this.router.navigate([`/doctor-detail/${id}`]);
    }
}
