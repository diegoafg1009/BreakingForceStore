import { ChangeDetectorRef, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { GetVariation } from "../../../dtos";
import { environment } from "../../../../../enviroments/environment";
import { ShoppingCartItem } from "../../../interfaces/shopping-cart-item.interface";
import { ShoppingCartService } from "../../../services";

@Component({
  selector: 'shopping-cart-item',
  templateUrl: './shopping-cart-item.component.html',
  styleUrl: './shopping-cart-item.component.css'
})
export class ShoppingCartItemComponent implements OnInit {
  @Output()
  public onRemove: EventEmitter<string> = new EventEmitter();
  @Output()
  public onAddOne: EventEmitter<ShoppingCartItem> = new EventEmitter();
  @Output()
  public onRemoveOne: EventEmitter<ShoppingCartItem> = new EventEmitter();
  @Output()
  public onChangeQuantity: EventEmitter<ShoppingCartItem> = new EventEmitter();
  @Input({ required: true })
  public item!: ShoppingCartItem;
  public variationImage: string = '';

  ngOnInit(): void {
    this.variationImage = `${ environment.imagesUrl }/${ this.item.variation.image }`;
  }

  public addOne(): void {
    this.onAddOne.emit(this.item);
  }

  public removeOne(): void {
    this.onRemoveOne.emit(this.item);
  }

  public removeItem(): void {
    this.onRemove.emit(this.item.variation.id);
  }

  public changeQuantity(input: Event): void {
    this.item.quantity = parseInt((input.target as HTMLInputElement).value);
    this.onChangeQuantity.emit(this.item);
  }
}
