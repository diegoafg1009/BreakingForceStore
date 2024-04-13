import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from "../../services/product.service";
import { GetProduct, ShoppingCartItem } from "../../dtos";
import { ActivatedRoute } from "@angular/router";
import { environment } from "../../../../enviroments/environment";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ShoppingCartService } from "../../../shared/services/shopping-cart.service";

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.css'
})
export class ProductInfoComponent implements OnInit{
  shoppingCartForm: FormGroup = {} as FormGroup;
  product: GetProduct = {} as GetProduct;
  productImages: string[] = [];
  productPriceRange: string = '';
  private readonly _productService: ProductService = inject(ProductService);
  private readonly _route: ActivatedRoute = inject(ActivatedRoute);
  private readonly _imagesUrl: string = environment.imagesUrl;
  private readonly _formBuilder: FormBuilder = inject(FormBuilder);
  private readonly _shoppingCartService: ShoppingCartService = inject(ShoppingCartService);

  ngOnInit(): void {

    const id = this._route.snapshot.paramMap.get('id')!;

    this.shoppingCartForm = this.initShoppingCartItemForm();
    this.loadProduct(id);
    this.productFlavor?.valueChanges.subscribe((value) => {
      this.shoppingCartForm.patchValue({ weight: null });
    });
    this.shoppingCartForm.valueChanges.subscribe((value) => {
      if(value.flavor && value.weight){
        this.product.variations.forEach((variation) => {
          if(variation.flavorName == value.flavor && variation.weight == value.weight){
            this.shoppingCartForm.patchValue({ unitPrice: variation.unitPrice }, { emitEvent: false });
            return;
          }
        });
      }else if(value.weight){
        this.product.variations.forEach((variation) => {
          if(variation.weight == value.weight){
            this.shoppingCartForm.patchValue({ unitPrice: variation.unitPrice }, { emitEvent: false });
            return;
          }
        });
      }
    })
  }


  loadProduct(id: string): void {
    this._productService.getProduct(id).subscribe((response) => {
      this.product = response;
      this.productImages = this.product.images.map((image) => {
        return `${this._imagesUrl}/${image}`;
      });
      this.productPriceRange = this.getPriceRange();
      this.shoppingCartForm.patchValue(this.product);
    });
  }

  initShoppingCartItemForm(): FormGroup {
    return this._formBuilder.group({
      name: [ null ],
      variationId: [ null ],
      flavor: [ null ],
      weight: [ null ],
      unitPrice: [ null ],
      quantity: [ 1 ]
    });
  }

  get productFlavor(){
    return this.shoppingCartForm.get('flavor');
  }

  get productWeight(){
    return this.shoppingCartForm.get('weight');
  }

  public hasFlavors(): boolean {
    return this.product.variations?.some((variation) => variation.flavorName);
  }

  get productUnitPrice(){
    return this.shoppingCartForm.get('unitPrice');
  }

  private getPriceRange(): string{
    if(this.product.higherPrice === this.product.lowerPrice){
      return `S/${(+this.product.higherPrice).toFixed(2)}`;
    }
    return `S/${(+this.product.lowerPrice).toFixed(2)} - S/${(+this.product.higherPrice).toFixed(2)}`;
  }

  public onSubmit(): void {
    if(this.shoppingCartForm.invalid){
      this.shoppingCartForm.markAllAsTouched();
      return;
    }
    const variationId = this.product.variations.find((variation) => {
      return variation.flavorName == this.productFlavor?.value && variation.weight == this.productWeight?.value;
    });
    this.shoppingCartForm.patchValue({ variationId: variationId!.id });

    const shoppingCartItem : ShoppingCartItem = {
      variationId: this.shoppingCartForm.value.variationId,
      quantity: this.shoppingCartForm.value.quantity
    };
    this._shoppingCartService.addItem(shoppingCartItem);
  }

}
