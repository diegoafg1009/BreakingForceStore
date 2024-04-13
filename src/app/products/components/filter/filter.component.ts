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

  @Output()
  public onSubmit: EventEmitter<FormGroup> = new EventEmitter();

  ngOnInit(): void {
    this.loadSubcategoryOptions();
    this.loadBrandOptions();
    this.loadObjectiveOptions();
    this.filterProductParams.valueChanges.subscribe(() => {
      this.emit(this.filterProductParams);
    });
  }

  loadSubcategoryOptions() {
    this._subcategoryService.getSubcategories()
      .subscribe(categories => this.subcategories = categories.map(category => ({
        label: category.name,
        value: category.id
      })));
  }

  loadBrandOptions() {
    this._brandService.getBrands()
      .subscribe(brands => this.brands = brands.map(brand => ({
        label: brand.name,
        value: brand.id
      })));
  }
    loadObjectiveOptions() {
    this._objectiveService.getObjectives()
      .subscribe(objectives => this.objectives = objectives.map(objective => ({
        label: objective.name,
        value: objective.id
      })));
  }

  public emit(filterProductParams: FormGroup) {
    this.onSubmit.emit(this.filterProductParams);
  }

}
