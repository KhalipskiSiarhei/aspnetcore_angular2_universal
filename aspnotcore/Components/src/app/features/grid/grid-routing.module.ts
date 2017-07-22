import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { GridComponent }    from './grid.component';
 
const gridRoutes: Routes = [
    {
        path: '', component: GridComponent,
        data: {
            title: 'Grids',
            meta: [
                { name: 'description', content: 'This is a Grids page Description!' },
                { name: 'description1', content: 'This is an additional grids page Description!' }
            ],
            links: [
                { rel: 'canonical', href: 'http://blogs.betclic.com/grids/something' },
                { rel: 'alternate', hreflang: 'es', href: 'http://es.betclic.com/grids' }
            ]
        }
    }
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