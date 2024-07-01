import { Component, inject, OnInit } from '@angular/core';
import { LocalStorageShoppingCartItem } from "../../../shared/interfaces/shopping-cart-item.interface";
import { GetVariation } from "../../../shared/dtos";
import { ShoppingCartService, VariationService } from "../../../shared/services";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  templateUrl: './checkout-layout.component.html',
  styleUrl: './checkout-layout.component.css'
})
export class CheckoutLayoutComponent{
}
