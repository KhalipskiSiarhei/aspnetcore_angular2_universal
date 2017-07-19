import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { SportsComponent }    from './sports.component';
 
const sportsRoutes: Routes = [
  { path: '',  component: SportsComponent }
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