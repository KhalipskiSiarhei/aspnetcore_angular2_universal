import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { CalendarRoutingModule } from './calendar-routing.module';

@NgModule({
    imports: [
        CommonModule,
        CalendarRoutingModule
    ],
    exports: [CalendarComponent],
    declarations: [
        CalendarComponent
    ],
    providers: []
})
export class CalendarModule { }