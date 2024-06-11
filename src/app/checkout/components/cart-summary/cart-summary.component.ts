import { Component, inject, Input } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'checkout-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrl: './cart-summary.component.css'
})
export class CartSummaryComponent {
  @Input({required: true})
  subtotal!: number;
  @Input({required: true})
  total!: number;
  @Input()
  shipping?: number;
  private readonly _router = inject(Router);

  goToPayment(): void {
    this._router.navigateByUrl('/checkout/payment');
  }

}
