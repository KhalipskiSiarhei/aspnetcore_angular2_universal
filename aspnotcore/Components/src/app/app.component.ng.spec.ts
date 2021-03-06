﻿import { TestBed, async } from '@angular/core/testing';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { HttpModule, Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './features/home/home.module';
import { TransferHttpModule } from './modules/transfer-http/transfer-http.module';
import { TransferHttp } from './modules/transfer-http/transfer-http';
import { REQUEST } from './shared/constants/request';
import { ORIGIN_URL } from './shared/constants/baseurl.constants';
import { AppComponent } from './app.component';
import { LinkService } from './shared/link.service';
import { AppModule } from './app.module';
import { BrowserTransferStateModule } from './modules/transfer-state/browser-transfer-state.module';

// i18n support
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { CustomTranslateHttpLoader } from './modules/custom-translate-http-loader';

export function createTranslateLoader(http: TransferHttp) {
    // i18n files are in `wwwroot/assets/`
    return new CustomTranslateHttpLoader(http, '/translations/', '');
}

export function getOriginUrl() {
    return window.location.origin;
}

export function getRequest() {
    // the Request object only lives on the server
    return { cookie: document.cookie };
}

describe('AppComponent Angular UT', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
            AppRoutingModule,
            BrowserTransferStateModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
          LinkService,
          {
              // We need this for our Http calls since they'll be using an ORIGIN_URL provided in main.server
              // (Also remember the Server requires Absolute URLs)
              provide: ORIGIN_URL,
              useFactory: (getOriginUrl)
          }, {
              // The server provides these in main.server
              provide: REQUEST,
              useFactory: (getRequest)
          },
          { provide: APP_BASE_HREF, useValue: '/' },
          TranslateModule
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
