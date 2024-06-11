import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  LocalStorageShoppingCartItem,
  ShoppingCartItem
} from "../../../shared/interfaces/shopping-cart-item.interface";
import { GetVariation } from "../../../shared/dtos";
import { ShoppingCartService, VariationService } from "../../../shared/services";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: 'checkout-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent implements OnInit, OnDestroy{
  items: ShoppingCartItem[] = [];
  total: number = 0;
  private readonly _shoppingCartService: ShoppingCartService = inject(ShoppingCartService);
  private readonly _router = inject(Router);
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

  addOne(item: ShoppingCartItem): void {
    this._shoppingCartService.modifyItemQuantity(item.variation.id, item.quantity + 1);
  }

  removeOne(item: ShoppingCartItem): void {
    if (item.quantity > 1) {
      this._shoppingCartService.modifyItemQuantity(item.variation.id, item.quantity - 1);
    }
    console.log(item.quantity);
  }

  removeItem(variationId: string): void {
    this._shoppingCartService.removeItem(variationId);

  }

  goToHome(): void {
    this._router.navigate([ '/' ]);
  }

}
