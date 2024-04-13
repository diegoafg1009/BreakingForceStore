import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Option } from "../../interfaces/option.interface";

@Component({
  selector: 'shared-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrl: './radio-group.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupComponent),
      multi: true
    }
  ]
})

export class RadioGroupComponent implements ControlValueAccessor {
  @Input({ required: true })
  text!: string;
  @Input({ required: true })
  options: Option[] = [];
  private _value: any;

  get value(): string | null {
    return this._value;
  }

  set value(value: string | null) {
    this._value = value;
    this.onChange(value);
    this.onTouched();
  }

  onChange = (value: any) => {
  };
  onTouched = () => {
  };

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInputChange(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
  }
}
