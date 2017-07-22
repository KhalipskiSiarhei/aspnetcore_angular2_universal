import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { CashoutComponent }    from './cashout.component';
 
const cashoutRoutes: Routes = [
    {
        path: '', component: CashoutComponent,
        data: {
            title: 'Cashout',
            meta: [
                { name: 'description', content: 'This is a Cashout page Description!' },
                { name: 'description1', content: 'This is an additional cashout page Description!' }
            ],
            links: [
                { rel: 'canonical', href: 'http://blogs.betclic.com/cashout/something' },
                { rel: 'alternate', hreflang: 'es', href: 'http://es.betclic.com/cashout' }
            ]
        }
    }
];
 
@NgModule({
  imports: [
    RouterModule.forChild(cashoutRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CashoutRoutingModule { }