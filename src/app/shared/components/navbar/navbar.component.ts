import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ShoppingCartService, SubcategoryService } from "../../services";
import { RouteItem } from "../../interfaces/route-item.interface";
import { BrandService } from "../../services";
import { ObjectiveService } from "../../services";
import { Subscription } from "rxjs";

@Component({
  selector: 'shared-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  categories: RouteItem[] = [];
  brands: RouteItem[] = [];
  objectives: RouteItem[] = [];
  shoppingCartItems: number = 0;
  private subscription: Subscription = null!;
  private readonly _subcategoryService: SubcategoryService = inject(SubcategoryService);
  private readonly _brandService: BrandService = inject(BrandService);
  private readonly _objectiveService: ObjectiveService = inject(ObjectiveService);
  private readonly _shoppingCartService: ShoppingCartService = inject(ShoppingCartService);

  ngOnInit(): void {
    this.loadSubcategoryOptions();
    this.loadBrandOptions();
    this.loadObjectiveOptions();
    this.subscription = this._shoppingCartService.items$.subscribe((items) => {
      this.shoppingCartItems = items.length;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadSubcategoryOptions() {
    this._subcategoryService.getSubcategories()
      .subscribe(subcategories => this.categories = subcategories.map(subcategory => ({
        path: "./products",
        label: subcategory.name,
        queryParams: { subcategoryId: subcategory.id }
      })));
  }

  loadBrandOptions() {
    this._brandService.getBrands()
      .subscribe(brands => this.brands = brands.map(brand => ({
        path: "./products",
        label: brand.name,
        queryParams: { brandId: brand.id }
      })));
  }

  loadObjectiveOptions() {
    this._objectiveService.getObjectives()
      .subscribe(objectives => this.objectives = objectives.map(objective => ({
        path: "./products",
        label: objective.name,
        queryParams: { objectiveId: objective.id }
      })));
  }
}
