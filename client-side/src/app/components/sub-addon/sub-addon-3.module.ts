import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { TranslateLoader, TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';

import { PepHttpService, PepAddonService, PepFileService, PepCustomizationService, PepNgxLibModule } from '@pepperi-addons/ngx-lib';
import { PepDialogService } from '@pepperi-addons/ngx-lib/dialog';
import { PepSelectModule } from '@pepperi-addons/ngx-lib/select';
import { PepImagesFilmstripModule } from '@pepperi-addons/ngx-lib/images-filmstrip';
import { PepRichHtmlTextareaModule } from '@pepperi-addons/ngx-lib/rich-html-textarea';

import { PepPageLayoutModule } from '@pepperi-addons/ngx-lib/page-layout';
import { PepListModule } from '@pepperi-addons/ngx-lib/list';
import { PepTopBarModule } from '@pepperi-addons/ngx-lib/top-bar';
import { PepButtonModule } from '@pepperi-addons/ngx-lib/button';

import { SubAddon3Component } from './sub-addon-3.component';

import {config } from './addon.config';

@NgModule({
    declarations: [SubAddon3Component],
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
        // PepNgxLibModule,
        PepButtonModule,
        // PepSelectModule,
        // PepTopBarModule,
        // PepListModule,
        // PepPageLayoutModule,
        // PepImagesFilmstripModule,
        // PepRichHtmlTextareaModule
    ],
    exports: [SubAddon3Component],
    providers: [
        // HttpClient,
        TranslateStore,
        // PepHttpService,
        // PepAddonService,
        // PepFileService,
        // PepCustomizationService,
        // PepDialogService
    ]
})
export class SubAddon3Module {
    constructor(
        translate: TranslateService,
        private pepAddonService: PepAddonService
    ) {
        this.pepAddonService.setDefaultTranslateLang(translate);
    }
}