import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent }    from './calendar.component';
 
const calendarRoutes: Routes = [
    {
        path: '', component: CalendarComponent,
        data: {
            title: 'Calendar',
            meta: [
                { name: 'description', content: 'This is a Calendar page Description!' },
                { name: 'description1', content: 'This is an additional Calendar page Description!' }
            ],
            links: [
                { rel: 'canonical', href: 'http://blogs.betclic.com/calendar/something' },
                { rel: 'alternate', hreflang: 'es', href: 'http://es.betclic.com/calendar' }
            ]
        }
    }
];
 
@NgModule({
  imports: [
    RouterModule.forChild(calendarRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CalendarRoutingModule { }