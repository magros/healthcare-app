import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './topbar/topbar.component';
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';
import {NativeScriptCommonModule} from 'nativescript-angular/common'
import { MedicDetailsNavComponent } from './medic-details-nav/medic-details-nav.component';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';

@NgModule({
  imports: [
    CommonModule,
    NativeScriptCommonModule,
    TNSFontIconModule,
    NativeScriptHttpClientModule
  ],
  declarations: [TopbarComponent, MedicDetailsNavComponent],
  exports: [TopbarComponent, MedicDetailsNavComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule { }
