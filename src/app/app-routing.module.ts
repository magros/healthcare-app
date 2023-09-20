import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { SearchComponent } from './search/search.component';
import { ResultsComponent } from './results/results.component';
import { MapSearchComponent } from './map-search/map-search.component';
import { DoctorComponent } from './doctor/doctor.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarDetailComponent } from './calendar/calendar-detail/calendar-detail.component';
import { AppointmentConfirmationComponent } from './medical-appointment/appointment-confirmation/appointment-confirmation.component';
import { LoginGuard } from './auth/auth.guard';
import { MedicalAppointmentComponent } from './medical-appointment/medical-appointment.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PaymentComponent } from './payment/payment.component';
import { NoticePrivacyComponent } from './user-profile/notice-privacy/notice-privacy.component';
import { AddPaymentComponent } from './payment/add-payment/add-payment.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { AppointmentDetailComponent } from './medical-appointment/appointment-detail/appointment-detail.component';
import { CommentComponent } from './doctor/comment/comment.component';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        pathMatch: 'full',
        canActivate: [LoginGuard]
    },
    { path: 'sign-in', component: RegisterComponent },
    { path: 'search', component: SearchComponent },
    //?stateId=1&specialityId=1&insurerId=1&hospitalId=1
    {
        path: 'results/:stateId/:specialityId/:insurerId/:hospitalId',
        component: ResultsComponent
    },
    {
        path: 'map-search/:stateId/:specialityId/:insurerId/:hospitalId',
        component: MapSearchComponent
    },
    { path: 'doctor-detail/:doctorId', component: DoctorComponent },
    { path: 'calendar/:doctorId', component: CalendarComponent },
    {
        path:
            'calendar-detail/:doctorId/:date/:doctorMedicalServiceId/:officeId',
        component: CalendarDetailComponent
    },
    {
        path:
            'appointment-confirmation/:doctorId/:day/:month/:year/:doctorMedicalServiceId/:officeId/:hour',
        component: AppointmentConfirmationComponent
    },
    { path: 'appointments', component: MedicalAppointmentComponent },
    { path: 'profile', component: UserProfileComponent },
    // { path: 'payments', component: PaymentComponent },
    { path: 'privacy', component: NoticePrivacyComponent },
    { path: 'payments', component: PaymentComponent },
    { path: 'add-payment', component: AddPaymentComponent },
    { path: 'favorites', component: FavoritesComponent },
    {
        path: 'appointment-details/:appointmentId',
        component: AppointmentDetailComponent
    },
    { path: 'comments/:doctorId', component: CommentComponent }
];

@NgModule({
    imports: [
        NativeScriptRouterModule.forRoot(routes, {
            onSameUrlNavigation: 'reload'
        })
    ],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {}
