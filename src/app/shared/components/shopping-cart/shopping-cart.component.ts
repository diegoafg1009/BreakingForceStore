import { Component, inject, OnInit } from '@angular/core';
import { ShoppingCartService } from "../../services/shopping-cart.service";
import { ShoppingCartItem } from "../../interfaces/shopping-cart-item.interface";

@Component({
  selector: 'shared-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit {
  items: ShoppingCartItem[] = [];
  private readonly _shoppingCartService: ShoppingCartService = inject(ShoppingCartService);

  ngOnInit(): void {
    this.items = this._shoppingCartService.items;
  }

  removeItem(variationId: string): void {
    this._shoppingCartService.removeItem(variationId);
    this.items = this._shoppingCartService.items;
  }

}
