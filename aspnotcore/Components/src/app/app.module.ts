import { NgModule, Inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { HttpModule, Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './features/home/home.module';

import { AppComponent } from './app.component';
import { TransferHttpModule } from './modules/transfer-http/transfer-http.module';
import { LinkService } from './shared/link.service';
import { DataService } from './shared/data.service';
import { ORIGIN_URL } from './shared/constants/baseurl.constants';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        TransferHttpModule, // Our Http TransferData method
        HomeModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        LinkService,
        DataService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
