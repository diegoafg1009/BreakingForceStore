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
  isLoaded: boolean = false;
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
    this._route.queryParams.subscribe((params) => {
      this.filterProductParams.patchValue(params);
      this.setupQueryParamsListeners(params);
      this.loadProducts(this.filterProductParams);
    });
    this.filterProductParams.valueChanges.subscribe(params => {
      this._router.navigate([], {
        queryParams: params,
        queryParamsHandling: 'merge'
      });
    });
  }

  initFilterForm(): FormGroup {
    return this._formBuilder.group({
      page: [ 1 ],
      pageSize: [ 12 ],
      isSortAscending: [ true ],
      search: [ null ],
      brandId: [ null ],
      subcategoryId: [ null ],
      objectiveId: [ null ],
      sortBy: [ null ],
    });
  }

  setupQueryParamsListeners(params: any) {
    Object.keys(params).forEach(key => {
      if (key !== 'page' && key !== 'pageSize') {
        const subscription = this._route.queryParams.subscribe(newParams => {
          if (params[key] !== newParams[key]) {
            this.filterProductParams.get('page')?.setValue(1);
            subscription.unsubscribe();
          }
        });
      }
    });
  }

  get searchValue() : string | null {
    return this.filterProductParams.get('search')?.value;
  }

  resetSearchValue() {
    this.filterProductParams.get('search')?.setValue(null);
  }

  loadProducts(filterProductParams: FormGroup): void {
    const queryParams = HttpUtils.ToQueryParams(filterProductParams.value);
    this._productService.getProducts(queryParams).subscribe((response) => {
      this.products = response.body ?? [];
      this.totalRecords = Number(response.headers.get('totalRecords')!);
      this.totalPages = Number(response.headers.get('totalPages')!);
      this.isLoaded = true;
    });
  }
}
