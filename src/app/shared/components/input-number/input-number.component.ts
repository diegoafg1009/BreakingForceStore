import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: 'shared-input-number',
  templateUrl: './input-number.component.html',
  styleUrl: './input-number.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputNumberComponent),
      multi: true
    }
  ]
})
export class InputNumberComponent implements ControlValueAccessor {
  public min: number = 1;
  public max: number = 100;
  public step: number = 1;
  private _value: number = 0;
  @Output()
  public onChange: EventEmitter<number> = new EventEmitter();

  get value(): number {
    return this._value;
  }

  set value(value: number) {
    this._value = value;
    this._onChange(value);
    this._onTouched();
  }

  _onChange: any = (value: number) => {
    this.onChange.emit(value);
  };

  _onTouched: any = () => {
  };

  writeValue(value: number): void {
    if (value !== undefined) {
      this.value = value;
    }
  }

  registerOnChange(fn: (_: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  public increment(): void {
    if (this.value < this.max) {
      this.value += this.step;
    }
  }

  public decrement(): void {
    if (this.value > this.min) {
      this.value -= this.step;
    }
  }
}
