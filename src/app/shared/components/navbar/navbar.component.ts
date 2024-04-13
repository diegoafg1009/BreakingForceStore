import { Component, inject, OnInit } from '@angular/core';
import { SubcategoryService } from "../../services/subcategory.service";
import { RouteItem } from "../../interfaces/route-item.interface";
import { BrandService } from "../../services/brand.service";
import { ObjectiveService } from "../../services/objective.service";

@Component({
  selector: 'shared-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  categories: RouteItem[] = [];
  brands: RouteItem[] = [];
  objectives: RouteItem[] = [];
  private readonly _subcategoryService: SubcategoryService = inject(SubcategoryService);
  private readonly _brandService: BrandService = inject(BrandService);
  private readonly _objectiveService: ObjectiveService = inject(ObjectiveService);

  ngOnInit(): void {
    this.loadSubcategoryOptions();
    this.loadBrandOptions();
    this.loadObjectiveOptions();
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
