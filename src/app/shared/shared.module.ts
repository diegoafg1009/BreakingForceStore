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
import { FormsModule } from "@angular/forms";
import { CurrencyComponent } from './components/currency/currency.component';
import { FooterComponent } from './components/footer/footer.component';
import { MobileMenuComponent } from './components/navbar/mobile-menu/mobile-menu.component';
import { AccordionComponent } from './components/accordion/accordion.component';



@NgModule({
  declarations: [
    NavbarComponent,
    SearchBarComponent,
    NavbarDropdownComponent,
    RadioGroupComponent,
    ShoppingCartComponent,
    ShoppingCartItemComponent,
    CurrencyComponent,
    FooterComponent,
    MobileMenuComponent,
    AccordionComponent,
  ],
  imports: [
    CommonModule,
    NgOptimizedImage,
    RouterModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    NavbarComponent,
    RadioGroupComponent,
    ShoppingCartItemComponent,
    ShoppingCartComponent,
    CurrencyComponent,
    FooterComponent,
    AccordionComponent
  ]
})
export class SharedModule { }
