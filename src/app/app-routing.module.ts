import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from "./home/pages/home-page/home-page.component";

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full',
    component: HomePageComponent,
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'checkout',
    loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule {
}
