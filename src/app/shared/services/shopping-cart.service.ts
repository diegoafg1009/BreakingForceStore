import { inject, Injectable } from '@angular/core';
import { LocalStorageShoppingCartItem, ShoppingCartItem } from "../interfaces/shopping-cart-item.interface";
import { BehaviorSubject, forkJoin, map, Observable } from 'rxjs';
import { VariationService } from "./variation.service";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private _items: BehaviorSubject<ShoppingCartItem[]> = new BehaviorSubject<ShoppingCartItem[]>([]);
  items$: Observable<ShoppingCartItem[]> = this._items.asObservable();
  private readonly _variationService: VariationService = inject(VariationService);
  private isInitialized: boolean = false;

  constructor() {
    this.loadItems();
  }

  private loadItems(): void {
    const localStorageItems = localStorage.getItem('shoppingCartItems');
    if (localStorageItems == null || localStorageItems === "[]") {
      this._items.next([]);
      this.isInitialized = true;
    }
    else{
      const requests = [];
      for (let item of JSON.parse(localStorageItems)) {
        requests.push(
          this._variationService.getVariation(item.variationId).pipe(
            map(variation => ({
              quantity: item.quantity,
              variation: variation
            }))
          )
        );
      }
      forkJoin(requests).subscribe({
        next: items => {
          this._items.next(items);
          this.isInitialized = true;
        }
      });
    }
  }

  public get items(): ShoppingCartItem[] {
    return this._items.value;
  }

  public getById(variationId: string): ShoppingCartItem {
    return this.items.find((i) => i.variation.id === variationId)!;
  }

  public addItem(item: LocalStorageShoppingCartItem): void {
    const existingItem = this.items.find((i) => i.variation.id === item.variationId);
    if (existingItem) {
      existingItem.quantity += item.quantity;
      this.saveItems(this.items);
    } else {
      this._variationService.getVariation(item.variationId).subscribe({
        next: (variation) => {
          this._items.value.push({
            quantity: item.quantity,
            variation: variation
          });
          this.saveItems(this.items);
        }
      });
    }
  }

  public removeItem(variationId: string): void {
    const itemIndex = this.items.findIndex((i) => i.variation.id === variationId);
    if (itemIndex !== -1) {
      this._items.value.splice(itemIndex, 1);
      //items.splice(itemIndex, 1);
      this.saveItems(this.items);
    }
  }

  public modifyItemQuantity(variationId: string, quantity: number): void {
    const itemIndex = this.items.findIndex((i) => i.variation.id === variationId);
    if (itemIndex !== -1) {
      this._items.value[itemIndex].quantity = quantity;
      this.saveItems(this.items);
    }
  }

  public clear(): void {
    this.saveItems([]);
  }

  public calculateTotal(): number {
    return this._items.value.reduce((acc: number, item) => {
      return acc + item.quantity * item.variation.unitPrice;
    }, 0);
  }

  private saveItems(items: ShoppingCartItem[]): void {
    if (!this.isInitialized) {
      return;
    }
    const localStorageItems: LocalStorageShoppingCartItem[] = items.map(item => ({
      variationId: item.variation.id,
      quantity: item.quantity
    }));
    const stringifyItems = JSON.stringify(localStorageItems);
    localStorage.setItem('shoppingCartItems', stringifyItems);
    this._items.next(items);
  }

}
