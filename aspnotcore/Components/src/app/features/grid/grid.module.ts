import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid.component';
import { GridRoutingModule } from './grid-routing.module';

@NgModule({
    imports: [
        CommonModule,
        GridRoutingModule
    ],
    exports: [GridComponent],
    declarations: [
        GridComponent
    ],
    providers: []
})
export class GridModule { }