import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SharedModule } from "./shared/shared.module";
import { AppRoutingModule } from "./app-routing.module";
import { HomeModule } from "./home/home.module";
import { ProductsModule } from "./products/products.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { PascalCaseInterceptorService } from "./interceptors/pascal-case-interceptor.service";
import { NgOptimizedImage } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HomeModule,
    ProductsModule,
    NgOptimizedImage
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: PascalCaseInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
