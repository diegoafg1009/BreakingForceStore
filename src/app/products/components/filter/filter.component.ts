import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Option } from "../../../shared/interfaces/option.interface";
import { CategoryService } from "../../../shared/services/category.service";
import { SubcategoryService } from "../../../shared/services/subcategory.service";
import { FormGroup } from "@angular/forms";
import { BrandService } from "../../../shared/services/brand.service";
import { ObjectiveService } from "../../../shared/services/objective.service";

@Component({
  selector: 'products-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent implements OnInit {
  @Input({ required: true })
  filterProductParams: FormGroup = null!;
  subcategories: Option[] = [];
  brands: Option[] = [];
  objectives: Option[] = [];
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
      .subscribe({
        next: categories => this.subcategories = categories.map(category => ({
          label: category.name,
          value: category.id
        })),
        error: () => this.subcategories = [],
        complete: () => this.subcategories.unshift({label: 'Todas', value: null})
      });
  }

  loadBrandOptions() {
    this._brandService.getBrands()
      .subscribe(
        {
          next: brands => this.brands = brands.map(brand => ({
            label: brand.name,
            value: brand.id
          })),
          error: () => this.brands = [],
          complete: () => this.brands.unshift({ label: 'Todas', value: null })
        });
  }

  loadObjectiveOptions() {
    this._objectiveService.getObjectives()
      .subscribe({
        next: objectives => this.objectives = objectives.map(objective => ({
          label: objective.name,
          value: objective.id
        })),
        error: () => this.objectives = [],
        complete: () => this.objectives.unshift({label: 'Todos', value: null})
      });
  }

  get searchValue(): string | null {
    return this.filterProductParams.get('search')?.value;
  }
  resetSearchValue() {
    this.filterProductParams.get('search')?.setValue(null);
  }

}
