import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { CashoutComponent }    from './cashout.component';
 
const cashoutRoutes: Routes = [
  { path: '',  component: CashoutComponent }
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