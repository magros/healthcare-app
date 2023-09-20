import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { FavoritesComponent } from './favorites.component';
import { SharedModule } from '../shared/shared.module';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { FavoritesService } from './favorites.service';
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';

@NgModule({
    imports: [SharedModule, NativeScriptCommonModule, TNSFontIconModule],
    exports: [],
    declarations: [FavoritesComponent],
    providers: [FavoritesService],
    schemas: [NO_ERRORS_SCHEMA]
})
export class FavoritesModule {}
