import { Component, computed, inject, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from "../../../auth/services/auth.service";
import { ShoppingCartService } from "../../../shared/services";
import { ShoppingCartItem } from "../../../shared/interfaces/shopping-cart-item.interface";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.css'
})
export class PaymentPageComponent implements OnInit, OnDestroy {
  items: ShoppingCartItem[] = [];
  total: number = 0;
  private readonly _shoppingCartService: ShoppingCartService = inject(ShoppingCartService);
  private _itemsSubscription: Subscription = null!;

  ngOnInit(): void {
    this._itemsSubscription = this._shoppingCartService.items$
      .subscribe({
        next: (items) => {
          this.items = items;
          this.total = this._shoppingCartService.calculateTotal();
        }
      });
  }

  ngOnDestroy(): void {
    if (this._itemsSubscription) {
      this._itemsSubscription.unsubscribe();
    }
  }
}
