import { Component, inject, Input, OnInit } from '@angular/core';
import { GetVariation } from "../../../dtos";
import { VariationService } from "../../../services/variation.service";
import { environment } from "../../../../../enviroments/environment";
import { ShoppingCartItem } from "../../../interfaces/shopping-cart-item.interface";
import { ShoppingCartService } from "../../../services/shopping-cart.service";

@Component({
  selector: 'shopping-cart-item',
  templateUrl: './shopping-cart-item.component.html',
  styleUrl: './shopping-cart-item.component.css'
})
export class ShoppingCartItemComponent implements OnInit{
  @Input({required: true})
  public item!: ShoppingCartItem;
  public variation!:GetVariation;
  public variationImage: string = '';
  private readonly _variationService: VariationService = inject(VariationService);
  private readonly _shoppingCartService: ShoppingCartService = inject(ShoppingCartService);
  ngOnInit(): void {
    this.getVariation();
  }

  private getVariation(): void {
    this._variationService.getVariation(this.item.variationId).subscribe((response) => {
      this.variation = response;
      this.variationImage = `${environment.imagesUrl}/${this.variation.image}`;
    });
  }

  public modifyItemQuantity(quantity: number): void {
    this._shoppingCartService.modifyItemQuantity(this.item.variationId, quantity);
  }

  public removeItem(): void {
    this._shoppingCartService.removeItem(this.item.variationId);
  }
}
