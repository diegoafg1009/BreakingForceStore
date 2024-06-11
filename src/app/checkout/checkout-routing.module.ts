import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutLayoutComponent } from "./layouts/checkout-layout/checkout-layout.component";
import { CartPageComponent } from "./pages/cart-page/cart-page.component";
import { PaymentPageComponent } from "./pages/payment-page/payment-page.component";
import { isAuthenticatedGuard } from "../auth/guards/is-authenticated.guard";

const routes: Routes = [
  {
    path: '',
    component: CheckoutLayoutComponent,
    children: [
      { path: '', redirectTo: 'cart', pathMatch: 'full' },
      { path: 'cart', component: CartPageComponent },
      { path: 'payment' , component: PaymentPageComponent },
      { path: '**', component: CartPageComponent },
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class CheckoutRoutingModule {
}
