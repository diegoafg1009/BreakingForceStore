import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { RouterModule } from "@angular/router";
import { NavbarDropdownComponent } from './components/navbar/navbar-dropdown/navbar-dropdown.component';
import { HttpClientModule } from "@angular/common/http";
import { RadioGroupComponent } from './components/radio-group/radio-group.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ShoppingCartItemComponent } from './components/shopping-cart/shopping-cart-item/shopping-cart-item.component';



@NgModule({
  declarations: [
    NavbarComponent,
    SearchBarComponent,
    NavbarDropdownComponent,
    RadioGroupComponent,
    ShoppingCartComponent,
    ShoppingCartItemComponent
  ],
  imports: [
    CommonModule,
    NgOptimizedImage,
    RouterModule,
    HttpClientModule
  ],
  exports: [
    NavbarComponent,
    RadioGroupComponent,
    ShoppingCartComponent,
  ]
})
export class SharedModule { }
