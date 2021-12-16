import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { TranslateLoader, TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';

import { PepAddonService, PepFileService, PepCustomizationService } from '@pepperi-addons/ngx-lib';
import { PepDialogService } from '@pepperi-addons/ngx-lib/dialog';
import { PepImagesFilmstripModule } from '@pepperi-addons/ngx-lib/images-filmstrip';


import { ConsumerBlockComponent } from './consumer-block.component';

import { config } from './addon.config';
import { ConsumerDisplayModule } from '../consumer-display/consumer-display.module';
@NgModule({
    declarations: [ConsumerBlockComponent],
    imports: [
        CommonModule,
        // HttpClientModule,
        // When not using module as sub-addon please remark this for not loading twice resources
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: (http: HttpClient, fileService: PepFileService, addonService: PepAddonService) => 
                    PepAddonService.createDefaultMultiTranslateLoader(http, fileService, addonService, config.AddonUUID),
                deps: [HttpClient, PepFileService, PepAddonService],
            }, isolate: false
        }),
        PepImagesFilmstripModule,
        ConsumerDisplayModule
    ],
    exports: [ConsumerBlockComponent],
    providers: [
        // HttpClient,
        TranslateStore,
        // PepHttpService,
        // PepAddonService,
        // PepFileService,
        PepCustomizationService,
        PepDialogService
    ]
})
export class ConsumerBlockModule {
    constructor(
        translate: TranslateService,
        private pepAddonService: PepAddonService
    ) {
        this.pepAddonService.setDefaultTranslateLang(translate);
    }
}