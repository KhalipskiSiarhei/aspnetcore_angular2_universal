import { NgModule, Inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { HttpModule, Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './features/home/home.module';

import { AppComponent } from './app.component';
import { TransferHttpModule } from './modules/transfer-http/transfer-http.module';
import { TransferHttp } from './modules/transfer-http/transfer-http';
import { LinkService } from './shared/link.service';
import { DataService } from './shared/data.service';
import { ORIGIN_URL } from './shared/constants/baseurl.constants';

// i18n support
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { CustomTranslateHttpLoader } from './modules/custom-translate-http-loader';

export function createTranslateLoader(http: TransferHttp) {
    // i18n files are in `wwwroot/assets/`
    return new CustomTranslateHttpLoader(http, '/translations/', '');
}

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        TransferHttpModule, // Our Http TransferData method
        HomeModule,
        // i18n support
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [TransferHttp]
            }
        }),
        AppRoutingModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        LinkService,
        DataService,
        TranslateModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
