import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsComponent } from './results.component';
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { SharedModule } from '../shared/shared.module';
import { ResultsService } from './results.service';

@NgModule({
  imports: [
    CommonModule,
    TNSFontIconModule,
    NativeScriptCommonModule,
    SharedModule
  ],
  declarations: [ResultsComponent],
  providers: [ResultsService],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ResultsModule { }
