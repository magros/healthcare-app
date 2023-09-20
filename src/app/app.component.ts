import {
    Component,
    OnInit,
    ChangeDetectorRef,
    ViewChild,
    AfterViewInit,
    OnDestroy,
    NgZone
} from '@angular/core';
import { SharedService } from './shared/shared.service';
import { Subscription } from 'rxjs';
import { RadSideDrawerComponent } from 'nativescript-ui-sidedrawer/angular/side-drawer-directives';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { RouterExtensions } from 'nativescript-angular';
import { AuthService } from './auth/auth.service';
import * as appVersion from 'nativescript-appversion';
import { NotificationService } from './auth/notification.service';
import { LocalNotifications } from 'nativescript-local-notifications';

@Component({
    selector: 'ns-app',
    moduleId: module.id,
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
    private drawerSub: Subscription;
    private userSub: Subscription;
    @ViewChild(RadSideDrawerComponent, { static: false })
    drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;
    userData = { name: '', avatar_url: '', created_at: '' };
    version: string = '';

    constructor(
        private sharedService: SharedService,
        private changeDetectorRef: ChangeDetectorRef,
        protected router: RouterExtensions,
        private authService: AuthService,
        private notificationService: NotificationService,
        private ngZone: NgZone
    ) {}

    ngOnInit() {
        LocalNotifications.addOnMessageReceivedCallback(notificationData =>
            this.ngZone.run(() => {
                //console.log('Notificacion recibida: ', notificationData);
                this.router.navigate([
                    `/appointment-details/${notificationData.id}`
                ]);
            })
        );

        appVersion.getVersionName().then((v: string) => {
            this.version = v;
        });

        if (this.authService.isLoggedIn())
            this.notificationService.initNotificationSubscription();

        this.userSub = this.authService.userState.subscribe((user: any) => {
            if (user) {
                //console.log(user);
                this.userData = user;
            }
        });

        this.drawerSub = this.sharedService.drawerState.subscribe(() => {
            if (this.drawer) this.drawer.toggleDrawerState();
        });
    }

    logout() {
        this.authService.logout();
        this.drawer.closeDrawer();
        setTimeout(() => {
            this.authService.updateUser({});
        }, 1000);
        this.router.navigate(['/'], { clearHistory: true });
    }

    ngOnDestroy() {
        if (this.drawerSub) this.drawerSub.unsubscribe();
        if (this.userSub) this.userSub.unsubscribe();
    }

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this.changeDetectorRef.detectChanges();
    }

    goToProfile() {
        this.drawer.closeDrawer();
        this.router.navigate(['/profile']);
    }

    goToPayments() {
        this.drawer.closeDrawer();
        this.router.navigate(['/payments']);
    }

    goToAppointments() {
        this.drawer.closeDrawer();
        this.router.navigate(['/appointments']);
    }

    goNoticeOfPrivacy() {
        this.drawer.closeDrawer();
        this.router.navigate(['/privacy']);
    }
}
