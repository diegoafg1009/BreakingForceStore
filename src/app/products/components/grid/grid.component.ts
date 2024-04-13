import { Component, Input } from '@angular/core';
import { GetProductSimple } from "../../dtos";

@Component({
  selector: 'products-grid',
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent {
  @Input({ required: true })
  products: GetProductSimple[] = [];
}
