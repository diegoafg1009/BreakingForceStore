import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsPageComponent } from "./pages/products-page/products-page.component";
import { ProductInfoComponent } from "./pages/product-info/product-info.component";
import { ProductsLayoutComponent } from "./layouts/products-layout/products-layout.component";

const routes: Routes = [ {
  path: '',
  component: ProductsLayoutComponent,
  children: [
    { path: '', component: ProductsPageComponent },
    { path: ':id', component: ProductInfoComponent },
    { path: '**', redirectTo: '' },
  ]
} ];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class ProductsRoutingModule {
}
