import { Component, Input, OnInit } from '@angular/core';
import { GetProductSimple } from "../../dtos";
import { environment } from "../../../../enviroments/environment";
import transformJavaScript from "@angular-devkit/build-angular/src/tools/esbuild/javascript-transformer-worker";

@Component({
  selector: 'products-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
  @Input({ required: true })
  product!:GetProductSimple;
  productImage: string = '';
  productPriceRange : string = '';

  private readonly _imagesUrl: string = environment.imagesUrl

  ngOnInit(): void {
    this.productImage = `${this._imagesUrl}/${this.product.image}`;
    this.productPriceRange = this.getPriceRange();
  }

  private getPriceRange(): string{
    if(this.product.higherPrice === this.product.lowerPrice){
      return `S/.${this.product.higherPrice}`;
    }
    return `S/.${this.product.lowerPrice} - S/.${this.product.higherPrice}`;
  }

}
