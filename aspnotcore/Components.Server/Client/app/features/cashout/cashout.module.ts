import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CashoutComponent } from './cashout.component';
import { CashoutRoutingModule } from './cashout-routing.module';

@NgModule({
    imports: [
        CommonModule,
        CashoutRoutingModule
    ],
    exports: [CashoutComponent],
    declarations: [
        CashoutComponent
    ],
    providers: []
})
export class CashoutModule { }