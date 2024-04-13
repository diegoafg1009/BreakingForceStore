import { Injectable } from '@angular/core';
import { ShoppingCartItem } from "../interfaces/shopping-cart-item.interface";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private readonly _items: ShoppingCartItem[] = [];

  constructor() {
    const items = localStorage.getItem('shoppingCartItems');
    if(items){
      this._items = JSON.parse(items);
    }
  }

  public get items(): ShoppingCartItem[] {
    return this._items;
  }

  public addItem(item: ShoppingCartItem): void {
    const existingItemIndex = this._items.findIndex((i) => i.variationId === item.variationId);
    if(existingItemIndex !== -1) {
      this._items[existingItemIndex] = item;
    }else{
      this._items.push(item);
    }
    this.saveItems();
  }

  public removeItem(variationId: string): void {
    const itemIndex = this._items.findIndex((i) => i.variationId === variationId);
    if(itemIndex !== -1) {
      this._items.splice(itemIndex, 1);
      this.saveItems();
    }
  }

  public modifyItemQuantity(variationId: string, quantity: number): void {
    const itemIndex = this._items.findIndex((i) => i.variationId === variationId);
    if(itemIndex !== -1) {
      this._items[itemIndex].quantity = quantity;
      this.saveItems();
    }
  }

  private saveItems(): void {
    const items = JSON.stringify(this._items);
    localStorage.setItem('shoppingCartItems', items);
  }


}
