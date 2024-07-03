import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { ProductInfoComponent } from './pages/product-info/product-info.component';
import { FilterComponent } from './components/filter/filter.component';
import { GridComponent } from './components/grid/grid.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { SharedModule } from "../shared/shared.module";
import { CardComponent } from './components/card/card.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ProductsLayoutComponent } from './layouts/products-layout/products-layout.component';
import { OrderByInputComponent } from './components/order-by-input/order-by-input.component';


@NgModule({
  declarations: [
    ProductsPageComponent,
    ProductInfoComponent,
    FilterComponent,
    GridComponent,
    CardComponent,
    CarouselComponent,
    ProductsLayoutComponent,
    OrderByInputComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    HttpClientModule,
    SharedModule,
    NgOptimizedImage
  ]
})
export class ProductsModule { }
