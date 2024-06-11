import { Component, inject, OnInit } from '@angular/core';
import { GetProductSimple } from "../../interfaces";
import { ProductService } from "../../services/product.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpUtils } from "../../../shared/utils/http-utils";
import { first } from "rxjs";

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css'
})
export class ProductsPageComponent implements OnInit{
  products: GetProductSimple[] = [];
  totalRecords: number = 0;
  totalPages: number = 0;
  filterProductParams: FormGroup = {} as FormGroup;
  private readonly _formBuilder: FormBuilder = inject(FormBuilder);
  private readonly _router: Router = inject(Router);
  private readonly _route: ActivatedRoute = inject(ActivatedRoute);
  private readonly _productService: ProductService = inject(ProductService);
  ngOnInit(): void {
    this.filterProductParams = this.initFilterForm();
    this._route.queryParams.pipe(first()).subscribe(params => {
      this.filterProductParams.patchValue(params);
    });
    this.loadProducts(this.filterProductParams);
  }

  initFilterForm(): FormGroup {
    return this._formBuilder.group({
      page: [ 1 ],
      pageSize: [ 10 ],
      isSortAscending: [ true ],
      search: [ null ],
      brandId: [ null ],
      subcategoryId: [ null ],
      objectiveId: [ null ],
      sortBy: [ null ],
    });
  }

  loadProducts(filterProductParams: FormGroup): void {
    const queryParams = HttpUtils.ToQueryParams(filterProductParams.value);
    this._productService.getProducts(queryParams).subscribe((response) => {
      this.products = response.body ?? [];
      this.totalRecords = Number(response.headers.get('totalRecords')!);
      this.totalPages = Number(response.headers.get('totalPages')!);
    });
  }

  onSubmit(filterProductParams: FormGroup) {
    this.loadProducts(filterProductParams);
    console.log(filterProductParams.value);
    this._route.queryParams.subscribe(params => {
      this._router.navigate([], {
        queryParams: filterProductParams.value,
        queryParamsHandling: 'merge'
      });
    });
  }

}
