import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from "../../services/product.service";
import { GetProduct, LocalStorageShoppingCartItem } from "../../interfaces";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../../environments/environment";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ShoppingCartService } from "../../../shared/services";
import { Option } from "../../../shared/interfaces/option.interface";
import { BaseForm } from "../../../shared/utils/base-form";
import { ValidationErrors } from "../../../shared/enums/validation-errors.enum";

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.css'
})
export class ProductInfoComponent extends BaseForm implements OnInit{
  shoppingCartForm: FormGroup = {} as FormGroup;
  product: GetProduct = {} as GetProduct;
  productImages: string[] = [];
  productPriceRange: string = '';
  flavors: string[] = [];
  private _id!: string;
  private readonly _productService: ProductService = inject(ProductService);
  private readonly _route: ActivatedRoute = inject(ActivatedRoute);
  private readonly _imagesUrl: string = environment.imagesUrl;
  private readonly _formBuilder: FormBuilder = inject(FormBuilder);
  private readonly _shoppingCartService: ShoppingCartService = inject(ShoppingCartService);
  private readonly _router: Router = inject(Router);

  ngOnInit(): void {

    this._route.params.subscribe((params) => {
      this._id = params['id'];
      this.loadProduct(this._id);
      this.shoppingCartForm = this.initShoppingCartItemForm();
    })

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
      this.flavors = Array.from(new Set(this.product.variations.map((variation) => variation.flavorName)));
    });
  }

  initShoppingCartItemForm(): FormGroup {
    return this._formBuilder.group({
      variationId: [ null ],
      flavor: [ null, [ this.hasFlavors() ? Validators.required : Validators.nullValidator ] ],
      weight: [ null, [Validators.required] ],
      quantity: [ 1, [Validators.min(1), this.integerValidator]]
    });
  }

  protected integerValidator(control: AbstractControl):{[key: string]: any} | null{
    const value = control.value;
    if(Number.isInteger(value)){
      return null;
    }
    return { integer: true };
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

    const shoppingCartItem : LocalStorageShoppingCartItem = {
      variationId: this.shoppingCartForm.value.variationId,
      quantity: this.shoppingCartForm.value.quantity
    };
    this._shoppingCartService.addItem(shoppingCartItem);
  }

  protected readonly validationErrors = ValidationErrors;
}
