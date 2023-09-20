import {
    Component,
    OnInit,
    AfterViewInit,
    ViewChild,
    ElementRef
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Page, View } from 'tns-core-modules/ui/page';
import { TextField } from 'tns-core-modules/ui/text-field';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { getRootView } from 'tns-core-modules/application';
import { RouterExtensions } from 'nativescript-angular/router';
import { AuthService } from '../auth.service';
import { ITnsOAuthTokenResult } from 'nativescript-oauth2';
import { OAuthService } from '../oauth.service';
import { NotificationService } from '../notification.service';

@Component({
    selector: 'login-page',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
    public drawer: RadSideDrawer;
    form: FormGroup;
    emailControlIsValid = true;
    passwordControlIsValid = true;
    isLoading = false;
    @ViewChild('passwordEl', { static: false }) passwordEl: ElementRef<
        TextField
    >;
    @ViewChild('emailEl', { static: false }) emailEl: ElementRef<TextField>;

    constructor(
        private page: Page,
        private router: RouterExtensions,
        private authService: AuthService,
        private oauthService: OAuthService,
        private notificationService: NotificationService
    ) {
        this.page.actionBarHidden = true;
    }

    ngOnInit() {
        this.form = new FormGroup({
            email: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required, Validators.email]
            }),
            password: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required]
            })
        });

        this.form.get('email').statusChanges.subscribe(status => {
            this.emailControlIsValid = status === 'VALID';
        });
        this.form.get('password').statusChanges.subscribe(status => {
            this.passwordControlIsValid = status === 'VALID';
        });
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.drawer = <RadSideDrawer>getRootView();
            this.drawer.gesturesEnabled = false;
        }, 100);
    }

    public navigateToRegister() {
        this.router.navigate(['/sign-in']);
    }

    doLogin() {
        this.emailEl.nativeElement.focus();
        this.passwordEl.nativeElement.focus();
        this.passwordEl.nativeElement.dismissSoftInput();
        const email = this.form.get('email').value;
        const pass = this.form.get('password').value;
        this.isLoading = true;
        this.authService.doLogin(email, pass).subscribe(
            (res: any) => {
                this.isLoading = false;
                this.authService.storeUserData(res.data);
                this.notificationService.initNotificationSubscription();
                this.router.navigate(['/search'], { clearHistory: true });
            },
            err => {
                this.isLoading = false;
                //console.log(err)
                alert({
                    title: 'HEALTH MANAGER',
                    message: 'Credenciales inválidas',
                    okButtonText: 'OK'
                });
            }
        );
    }

    onDone() {
        this.emailEl.nativeElement.focus();
        this.passwordEl.nativeElement.focus();
        this.passwordEl.nativeElement.dismissSoftInput();
    }

    facebookLogin() {
        this.oauthService
            .tnsOauthLogin('facebook')
            .then((result: ITnsOAuthTokenResult) => {
                //console.log("back to login component with token " + result.accessToken)
                this.authService
                    .loginWithFacebook(result.accessToken)
                    .subscribe((res: any) => {
                        this.authService.storeUserData(res.data);
                        this.router.navigate(['/search'], {
                            clearHistory: true
                        });
                    });
            })
            .catch(error => console.log('Error: ' + error));
    }

    googleLogin() {
        this.oauthService
            .tnsOauthLogin('google')
            .then((result: ITnsOAuthTokenResult) => {
                //console.log("back to login component with token " + result.accessToken)
                this.authService
                    .loginWithGoogle(result.accessToken)
                    .subscribe((res: any) => {
                        //console.log(res)
                        this.authService.storeUserData(res.data);
                        this.router.navigate(['/search'], {
                            clearHistory: true
                        });
                    });
            })
            .catch(error => console.log('Error: ' + error));
    }
}
