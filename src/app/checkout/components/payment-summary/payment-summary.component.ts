import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCartItem } from "../../../shared/interfaces/shopping-cart-item.interface";
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'checkout-payment-summary',
  templateUrl: './payment-summary.component.html',
  styleUrl: './payment-summary.component.css'
})
export class PaymentSummaryComponent implements OnInit{
  @Input({ required: true })
  public items!: ShoppingCartItem[];
  public imageBasePath: string = environment.imagesUrl;
  public total: number = 0;

  ngOnInit(): void {
    this.total = this.items.reduce((acc, item) => acc + item.variation.unitPrice * item.quantity, 0);
  }

}
