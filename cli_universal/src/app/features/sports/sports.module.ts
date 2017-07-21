import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SportsComponent } from './sports.component';
import { SportsRoutingModule } from './sports-routing.module';

@NgModule({
    imports: [
        CommonModule,
        SportsRoutingModule
    ],
    declarations: [
        SportsComponent
    ],
    providers: []
})
export class SportsModule { }