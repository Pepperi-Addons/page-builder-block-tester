import { TranslateLoader, TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProducerBlockEditorComponent } from './producer-block-editor.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PepHttpService, PepAddonService, PepFileService, PepCustomizationService, PepNgxLibModule } from '@pepperi-addons/ngx-lib';
import { PepDialogModule, PepDialogService } from '@pepperi-addons/ngx-lib/dialog';
import { PepSelectModule } from '@pepperi-addons/ngx-lib/select';
import { PepImagesFilmstripModule } from '@pepperi-addons/ngx-lib/images-filmstrip';
import { PepRichHtmlTextareaModule } from '@pepperi-addons/ngx-lib/rich-html-textarea';
import {config } from './addon.config';
import { PepButtonModule } from '@pepperi-addons/ngx-lib/button';
import { FilterTargetModule } from '../../base-components/filter-target/filter-target.module';
import { ContextResourceModule } from '../../base-components/context-resource/context-resource.module';
import { GenericListModule } from '../../base-components/generic-list/generic-list.module';
import { PepTopBarModule } from '@pepperi-addons/ngx-lib/top-bar';

@NgModule({
    declarations: [ProducerBlockEditorComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: (http: HttpClient, fileService: PepFileService, addonService: PepAddonService) => 
                    PepAddonService.createDefaultMultiTranslateLoader(http, fileService, addonService, config.AddonUUID),
                deps: [HttpClient, PepFileService, PepAddonService],
          }, isolate: false
      }),
      PepNgxLibModule,
      PepSelectModule,
      PepImagesFilmstripModule,
      PepRichHtmlTextareaModule,
      PepButtonModule,
      FilterTargetModule,
      ContextResourceModule,
      PepDialogModule,
      GenericListModule,
      PepTopBarModule,
      PepDialogModule
    ],
    exports: [ProducerBlockEditorComponent],
    providers: [
        HttpClient,
        TranslateStore,
        PepHttpService,
        PepAddonService,
        PepFileService,
        PepCustomizationService,
        PepDialogService
        
    ]
})
export class ProducerBlockEditorModule {
    constructor(
        translate: TranslateService,
        private pepAddonService: PepAddonService
    ) {
        this.pepAddonService.setDefaultTranslateLang(translate);
    }
}