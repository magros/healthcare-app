import {Component, OnInit, ViewChild} from '@angular/core';
import {Page} from 'tns-core-modules/ui/page/page';
import {RouterExtensions} from "nativescript-angular";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
    selector: 'register-component',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css']
})

export class RegisterComponent implements OnInit {

    //form = {name: '', email: '', password: '', password_confirmation: '', checked: false};
    form: FormGroup;
    constructor(
        protected page: Page,
        protected router: RouterExtensions,
        private authService: AuthService) {
        this.page.actionBarHidden = true;
    }

    ngOnInit() {
        this.form = new FormGroup({
            name: new FormControl(null ,{
                updateOn: 'blur',
                validators: [Validators.required]
            }),
            email: new FormControl(null ,{
                updateOn: 'blur',
                validators: [Validators.required, Validators.email]
            }),
            password: new FormControl(null ,{
                updateOn: 'blur',
                validators: [Validators.required, Validators.minLength(6)]
            }),
            passwordConfirm: new FormControl(null ,{
                validators: [Validators.required]
            }),
        }, this.passwordMatchValidator);
    }

    // async register() {
    //     let res = await this.sendForm(`${this.baseUrl}/auth/register`);
    //     FormComponent.loginUser(res.user);
    //     this.router.navigate(['/search'], {clearHistory: true});
    // }

    register() {
        if(!this.form.valid) return;
        console.log(this.form.value)
        this.authService.registerUser(this.form.value)
            .subscribe((res: any) => {
                console.log(res)
                alert({title: "HEALTH MANAGER",
                message: 'Usuario registrado correctamente',
                okButtonText: "OK"})
                this.router.navigate(['/'], {clearHistory: true})
            }, err => {
                console.log(err)
                alert({title: "HEALTH MANAGER",
                message: 'Error al registrar usuario',
                okButtonText: "OK"
            })
        });
    }

    goBack() {
        this.router.navigate(['/'], {clearHistory: true})
    }

    passwordMatchValidator(g: FormGroup) {
        return g.get('password').value === g.get('passwordConfirm').value
           ? null : {'mismatch': true};
     }
}
