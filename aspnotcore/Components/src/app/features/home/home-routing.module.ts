import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent }    from './home.component';
 
const homeRoutes: Routes = [
    {
        path: 'home', component: HomeComponent,
        // *** SEO Magic ***
        // We're using "data" in our Routes to pass in our <title> <meta> <link> tag information
        // Note: This is only happening for ROOT level Routes, you'd have to add some additional logic if you wanted this for Child level routing
        // When you change Routes it will automatically append these to your document for you on the Server-side
        //  - check out app.component.ts to see how it's doing this
        data: {
            title: 'Homepage',
            meta: [
                { name: 'description', content: 'This is an example Description Meta tag for home!' },
                { name: 'description1', content: 'This is an additional example Description Meta tag for home!' }
            ],
            links: [
                { rel: 'canonical', href: 'http://blogs.betclic.com/blah/nice' },
                { rel: 'alternate', hreflang: 'es', href: 'http://es.betclic.com/' }
            ]
        }
    }
];
 
@NgModule({
  imports: [
    RouterModule.forChild(homeRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule { }