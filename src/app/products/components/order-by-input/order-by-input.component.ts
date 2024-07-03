import { Component, inject, Input, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { Option } from "../../../shared/interfaces/option.interface";
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'products-order-by-input',
  templateUrl: './order-by-input.component.html',
  styleUrl: './order-by-input.component.css'
})
export class OrderByInputComponent implements OnInit{
  @Input({ required: true })
  filterProductParams: FormGroup = null!;
  options: Option[] = [];
  private readonly _productService: ProductService = inject(ProductService);

  ngOnInit(): void {
    this.loadOptions();
  }

  loadOptions() {
    this.options = this._productService.getOrderByOptions()
  }

  onChange(event: Event){
    const value = (event.target as HTMLSelectElement).value;
    const [sortBy, isSortAscending] = value.split('-');
    this.filterProductParams.patchValue({ sortBy, isSortAscending: isSortAscending === 'true' });
  }
}
