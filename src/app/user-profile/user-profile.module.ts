import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import {UserProfileComponent} from './user-profile.component';
import {NativeScriptCommonModule} from 'nativescript-angular/common';
import {SharedModule} from '../shared/shared.module';
import {PaymentComponent} from './payments/payment.component';
import {NoticePrivacyComponent} from './notice-privacy/notice-privacy.component';
import {UserProfileService} from "~/app/user-profile/user-profile.service";
import {NativeScriptFormsModule} from "nativescript-angular";

@NgModule({
    imports: [NativeScriptCommonModule, SharedModule, NativeScriptFormsModule],
    exports: [],
    declarations: [
        UserProfileComponent,
        PaymentComponent,
        NoticePrivacyComponent
    ],
    providers: [UserProfileService],
    schemas: [NO_ERRORS_SCHEMA]
})
export class UserProfileModule {
}
