import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorComponent } from './doctor.component';
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { SharedModule } from '../shared/shared.module';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptHttpModule } from 'nativescript-angular';
import { DoctorService } from './doctor.service';
import { CommentComponent } from './comment/comment.component';
import { CommentService } from './comment/comment.service';

@NgModule({
    imports: [
        CommonModule,
        TNSFontIconModule,
        NativeScriptCommonModule,
        SharedModule,
        NativeScriptFormsModule,
        NativeScriptHttpModule
    ],
    declarations: [DoctorComponent, CommentComponent],
    providers: [DoctorService, CommentService],
    schemas: [NO_ERRORS_SCHEMA]
})
export class DoctorModule {}
