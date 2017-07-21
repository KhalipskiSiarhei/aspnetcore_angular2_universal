import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'sports', loadChildren: './features/sports/sports.module#SportsModule' },
    { path: 'calendar', loadChildren: './features/calendar/calendar.module#CalendarModule' },
    { path: 'cashout', loadChildren: './features/cashout/cashout.module#CashoutModule' },
    { path: 'grid', loadChildren: './features/grid/grid.module#GridModule' },
    { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {
                // <-- debugging purposes only
                enableTracing: true,
                preloadingStrategy: PreloadAllModules,
                initialNavigation: 'enabled'
            }
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }