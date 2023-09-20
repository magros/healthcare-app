import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { SharedModule } from '../shared/shared.module';
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';
import { ResultsModule } from '../results/results.module';
import { DropDownModule } from 'nativescript-drop-down/angular';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { SearchService } from './search.service';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TNSFontIconModule,
    ResultsModule,
    DropDownModule,
    NativeScriptCommonModule,
    NativeScriptHttpClientModule
  ],
  declarations: [SearchComponent],
  providers: [SearchService],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SearchModule { }
