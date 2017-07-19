import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { GridComponent }    from './grid.component';
 
const gridRoutes: Routes = [
  { path: '',  component: GridComponent }
];
 
@NgModule({
  imports: [
    RouterModule.forChild(gridRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class GridRoutingModule { }