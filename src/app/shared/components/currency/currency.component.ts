import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-currency',
  templateUrl: './currency.component.html',
  styles: ``
})
export class CurrencyComponent {
  @Input({ required: true })
  value!: number;

}
