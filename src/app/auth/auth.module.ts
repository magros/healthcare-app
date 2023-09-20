import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { TNSCheckBoxModule } from 'nativescript-checkbox/angular';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { HttpClient } from '@angular/common/http';
import { OAuthService } from './oauth.service';
import { NotificationService } from './notification.service';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TNSCheckBoxModule,
        TNSFontIconModule,
        NativeScriptFormsModule,
        NativeScriptCommonModule,
        NativeScriptHttpClientModule
    ],
    exports: [],
    declarations: [LoginComponent, RegisterComponent],
    providers: [AuthService, HttpClient, OAuthService, NotificationService],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AuthModule {}
