import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GetVariation } from "../../../shared/dtos";
import {
  LocalStorageShoppingCartItem,
  ShoppingCartItem
} from "../../../shared/interfaces/shopping-cart-item.interface";
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'checkout-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrl: './cart-table.component.css'
})
export class CartTableComponent {
  @Output()
  public onRemoveItem: EventEmitter<string> = new EventEmitter();
  @Output()
  public onAddOne: EventEmitter<ShoppingCartItem> = new EventEmitter();
  @Output()
  public onRemoveOne: EventEmitter<ShoppingCartItem> = new EventEmitter();
  @Input({ required: true })
  public items!: ShoppingCartItem[];
  public imageBasePath: string = environment.imagesUrl;

  public addOne(item: ShoppingCartItem): void {
    this.onAddOne.emit(item);
  }

  public removeOne(item: ShoppingCartItem): void {
    this.onRemoveOne.emit(item);
  }

  public removeItem(itemId: string): void {
    this.onRemoveItem.emit(itemId);
  }

}
