import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { SportsComponent }    from './sports.component';
 
const sportsRoutes: Routes = [
    {
        path: '', component: SportsComponent,
        data: {
            title: 'Sports',
            meta: [
                { name: 'description', content: 'This is a Sports page Description!' },
                { name: 'description1', content: 'This is an additional Sports page Description!' }
            ],
            links: [
                { rel: 'canonical', href: 'http://blogs.betclic.com/sports/something' },
                { rel: 'alternate', hreflang: 'es', href: 'http://es.betclic.com/sports' }
            ]
        }
    }
];
 
@NgModule({
  imports: [
      RouterModule.forChild(sportsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class SportsRoutingModule { }