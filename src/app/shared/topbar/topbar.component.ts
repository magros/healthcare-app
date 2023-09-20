import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page';
import { isAndroid } from 'tns-core-modules/platform';
import { RouterExtensions } from 'nativescript-angular/router';
import { SharedService } from '../shared.service';

declare var android: any;
@Component({
    selector: 'ns-action-bar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
    @Input() title: string;

    constructor(
        private page: Page,
        private router: RouterExtensions,
        private sharedService: SharedService
    ) {}

    ngOnInit() {}

    get canGoBack() {
        return this.router.canGoBack();
    }

    onGoBack() {
        this.router.backToPreviousPage();
    }

    onLoadedActionBar() {
        if (isAndroid) {
            const androidToolbar = this.page.actionBar.nativeView;
            const backButton = androidToolbar.getNavigationIcon();
            if (backButton) {
                backButton.setColorFilter(
                    android.graphics.Color.parseColor('#171717'),
                    (<any>android.graphics).PorterDuff.Mode.SRC_ATOP
                );
            }
        }
    }

    onToggleMenu() {
        this.sharedService.toggleDrawer();
    }

    navigateToSearch() {
        this.router.navigate(['/search']);
    }

    navigateToFavs() {
        this.router.navigate(['/favorites']);
    }

    navigateToAppointments() {
        this.router.navigate(['/appointments']);
    }
}
