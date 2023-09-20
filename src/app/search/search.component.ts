import {
    Component,
    OnInit,
    AfterViewInit,
    ViewChild,
    ElementRef
} from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { getRootView } from 'tns-core-modules/application/application';
import { Router } from '@angular/router';
import {
    ValueList,
    SelectedIndexChangedEventData
} from 'nativescript-drop-down';
import { SearchService } from './search.service';
import { getCurrentLocation, isEnabled } from 'nativescript-geolocation';
import { Accuracy } from 'tns-core-modules/ui/enums/enums';
import { Page } from 'tns-core-modules/ui/page/page';

@Component({
    selector: 'ns-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, AfterViewInit {
    @ViewChild('loc', { static: false }) locDropDown: ElementRef;
    public drawer: RadSideDrawer;
    private specialities: ValueList<string>;
    private assuranceComp: ValueList<string>;
    private location: ValueList<string>;
    private hospitals: ValueList<string>;
    private searchType = new ValueList<string>([
        { value: '1', display: 'Mapa' },
        { value: '2', display: 'Lista' }
    ]);

    private showFilters: boolean = false;
    filterBtnText: string = '+ Filtros';
    locSelectedIndex: number = null;
    hospSelectedIndex: number = null;
    insuranceSelectedIndex: number = null;
    specSelectedIndex: number = null;
    searchSelectedIndex: number = 0;

    constructor(
        private router: Router,
        private searchService: SearchService,
        private page: Page
    ) {
        //this.page.actionBarHidden = true
    }

    ngOnInit() {
        this.searchService.getSpecialities().subscribe(transformedData => {
            this.specialities = new ValueList<string>(transformedData);
        });

        this.searchService
            .getAssuranceCompanies()
            .subscribe(transformedData => {
                this.assuranceComp = new ValueList<string>(transformedData);
            });

        this.searchService.getHospitals().subscribe(transformedData => {
            this.hospitals = new ValueList<string>(transformedData);
        });

        this.searchService.getLocations().subscribe(transformedData => {
            this.location = new ValueList<string>(transformedData);
            this.requestLocation(transformedData);
        });
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.drawer = <RadSideDrawer>getRootView();
            this.drawer.gesturesEnabled = true;
        }, 100);
    }

    public navigateToResults() {
        let searchUrl = this.buildSearchUrl();
        //console.log(searchUrl);
        if (this.searchSelectedIndex === 0)
            this.router.navigate([`/map-search/${searchUrl}`]);
        else this.router.navigate([`/results/${searchUrl}`]);
    }

    get specs() {
        return this.specialities;
    }

    get assuranceCompanies() {
        return this.assuranceComp;
    }

    get locations() {
        return this.location;
    }

    get hospitalList() {
        return this.hospitals;
    }

    get searchOptions() {
        return this.searchType;
    }

    get activeFilters() {
        return this.showFilters;
    }

    toggleFilters() {
        this.showFilters = !this.showFilters;
        this.filterBtnText = this.showFilters ? '- Filtros' : '+ Filtros';
    }

    requestLocation(data) {
        isEnabled()
            .then(isLocationEnabled => {})
            .catch(err => {});

        getCurrentLocation({
            desiredAccuracy: Accuracy.high,
            timeout: 15000
        })
            .then(location => {
                this.searchService
                    .getCurrentLocation(location.longitude, location.latitude)
                    .subscribe(
                        (results: any) => {
                            let state = data.filter(s => s.display === results);
                            this.locSelectedIndex = state[0].value - 1;
                        },
                        error => {
                            console.log('ERROR: ', error);
                        }
                    );
            })
            .catch(error => {
                console.log('Location error received: ' + error);
                alert('Location error received: ' + error);
            });
    }

    public onLocChange(args: SelectedIndexChangedEventData) {
        console.log(
            `Drop Down selected index changed from ${args.oldIndex} to ${
                args.newIndex
            }. New value is "${this.location.getValue(args.newIndex)}"`
        );
    }

    public onHospitalChange(args: SelectedIndexChangedEventData) {
        console.log(
            `Drop Down selected index changed from ${args.oldIndex} to ${
                args.newIndex
            }. New value is "${this.location.getValue(args.newIndex)}"`
        );
    }

    public onInsuranceChange(args: SelectedIndexChangedEventData) {
        console.log(
            `Drop Down selected index changed from ${args.oldIndex} to ${
                args.newIndex
            }. New value is "${this.location.getValue(args.newIndex)}"`
        );
    }

    public onSpecialityChange(args: SelectedIndexChangedEventData) {
        console.log(
            `Drop Down selected index changed from ${args.oldIndex} to ${
                args.newIndex
            }. New value is "${this.location.getValue(args.newIndex)}"`
        );
    }

    public onSearchTypeChange(args: SelectedIndexChangedEventData) {
        console.log(
            `Drop Down selected index changed from ${args.oldIndex} to ${
                args.newIndex
            }. New value is "${this.location.getValue(args.newIndex)}"`
        );
    }

    buildSearchUrl() {
        // /api/doctors?stateId=1&specialityId=1&insurerId=1&hospitalId=1
        return `${
            this.location.getValue(this.locSelectedIndex)
                ? this.location.getValue(this.locSelectedIndex)
                : 0
        }/${
            this.specs.getValue(this.specSelectedIndex)
                ? this.specs.getValue(this.specSelectedIndex)
                : 0
        }/${
            this.assuranceCompanies.getValue(this.insuranceSelectedIndex)
                ? this.assuranceCompanies.getValue(this.insuranceSelectedIndex)
                : 0
        }/${
            this.hospitalList.getValue(this.hospSelectedIndex)
                ? this.hospitalList.getValue(this.hospSelectedIndex)
                : 0
        }`;
    }
}
