import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ShoppingCartService } from "../../services";
import { LocalStorageShoppingCartItem, ShoppingCartItem } from "../../interfaces/shopping-cart-item.interface";
import { VariationService } from "../../services";
import { GetVariation } from "../../dtos";
import { scan, Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: 'shared-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  items: ShoppingCartItem[] = [];
  total: number = 0;
  isLoading: boolean = false;
  private readonly _shoppingCartService: ShoppingCartService = inject(ShoppingCartService);
  private readonly _router = inject(Router);
  private _itemsSubscription: Subscription = null!;

  ngOnInit(): void {
    this._itemsSubscription = this._shoppingCartService.items$
      .subscribe({
        next: (items) => {
          this.items = this._shoppingCartService.items;
          this.total = this._shoppingCartService.calculateTotal();
        }
      });

  }

  ngOnDestroy(): void {
    if (this._itemsSubscription) {
      this._itemsSubscription.unsubscribe();
    }
  }

  addOne(item: ShoppingCartItem): void {
    this._shoppingCartService.modifyItemQuantity(item.variation.id, item.quantity + 1);
  }

  removeOne(item: ShoppingCartItem): void {
    if (item.quantity > 1) {
      this._shoppingCartService.modifyItemQuantity(item.variation.id, item.quantity - 1);
    }
  }

  removeItem(variationId: string): void {
    this._shoppingCartService.removeItem(variationId);

  }

  changeQuantity(item: ShoppingCartItem): void {
    if (item.quantity < 1){
      this._shoppingCartService.modifyItemQuantity(item.variation.id, 1);
    } else {
      this._shoppingCartService.modifyItemQuantity(item.variation.id, item.quantity);
    }
  }

  private calculateTotal(): number {
    return this.items.reduce((acc, item) => acc + item.variation.unitPrice * item.quantity, 0);
  }

  goToCheckout(): void {
    this._router.navigateByUrl('/checkout');
  }

}
