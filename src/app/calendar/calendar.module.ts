import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { CalendarDetailComponent } from './calendar-detail/calendar-detail.component';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';
import { SharedModule } from '../shared/shared.module';
import { CalendarService } from './calendar.service';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { NativeScriptFormsModule } from "nativescript-angular/forms";

@NgModule({
    imports: [
        CommonModule,
        NativeScriptCommonModule,
        TNSFontIconModule,
        SharedModule,
        NativeScriptHttpClientModule,
        NativeScriptFormsModule
    ],
    declarations: [CalendarComponent, CalendarDetailComponent],
    providers: [CalendarService],
    schemas: [NO_ERRORS_SCHEMA]
})
export class CalendarModule {}
