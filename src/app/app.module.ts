import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular/side-drawer-directives';
import { SearchModule } from './search/search.module';
import { SharedModule } from './shared/shared.module';
import { ResultsModule } from './results/results.module';
import { DoctorModule } from './doctor/doctor.module';
import { MapSearchModule } from './map-search/map-search.module';
import { CalendarModule } from './calendar/calendar.module';
import { PaymentModule } from './payment/payment.module';
import { DropDownModule } from 'nativescript-drop-down/angular';
import { MedicalAppointmentModule } from './medical-appointment/medical-appointment.module';
// Uncomment and add to NgModule imports if you need to use two-way binding
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { LoginGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { UserProfileModule } from './user-profile/user-profile.module';
import { PaymentSelectionModalComponent } from './payment/payment-selection-modal/payment-selection-modal.component';
import { FavoritesModule } from './favorites/favorites.module';
import { PaymentSelectionModalComponent as SelectionModal } from './medical-appointment/appointment-confirmation/payment-selection/payment-selection-modal.component';

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        TNSFontIconModule.forRoot({
            fa: './fonts/font-awesome.css'
        }),
        AuthModule,
        NativeScriptUISideDrawerModule,
        SearchModule,
        ResultsModule,
        DoctorModule,
        PaymentModule,
        MapSearchModule,
        CalendarModule,
        DropDownModule,
        SharedModule,
        MedicalAppointmentModule,
        NativeScriptFormsModule,
        UserProfileModule,
        FavoritesModule
    ],
    declarations: [AppComponent],
    providers: [LoginGuard, AuthService],
    schemas: [NO_ERRORS_SCHEMA],
    entryComponents: [PaymentSelectionModalComponent, SelectionModal]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule {}
