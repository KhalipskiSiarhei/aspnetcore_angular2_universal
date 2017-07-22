import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

// i18n support
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        TranslateModule.forChild(),
    ],
    exports: [HomeComponent],
    declarations: [
        HomeComponent
    ],
    providers: []
})
export class HomeModule { }