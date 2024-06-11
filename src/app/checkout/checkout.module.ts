import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { PaymentPageComponent } from './pages/payment-page/payment-page.component';
import { CheckoutLayoutComponent } from './layouts/checkout-layout/checkout-layout.component';
import { CartTableComponent } from './components/cart-table/cart-table.component';
import { SharedModule } from "../shared/shared.module";
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';
import { PaymentSummaryComponent } from './components/payment-summary/payment-summary.component';


@NgModule({
  declarations: [
    CartPageComponent,
    PaymentPageComponent,
    CheckoutLayoutComponent,
    CartTableComponent,
    CartSummaryComponent,
    PaymentFormComponent,
    PaymentSummaryComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    SharedModule
  ]
})
export class CheckoutModule { }
