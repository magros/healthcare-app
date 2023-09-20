import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapSearchComponent } from './map-search.component';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';
import { SharedModule } from '../shared/shared.module';
import { MapSearchService } from './map-search.service';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';

@NgModule({
  imports: [
    CommonModule,
    NativeScriptCommonModule,
    TNSFontIconModule,
    SharedModule,
    NativeScriptHttpClientModule
  ],
  declarations: [MapSearchComponent],
  providers: [MapSearchService],
  schemas: [NO_ERRORS_SCHEMA]
})
export class MapSearchModule { }
