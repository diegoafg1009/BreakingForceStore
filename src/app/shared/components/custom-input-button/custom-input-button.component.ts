import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: 'shared-custom-input-button',
  templateUrl: './custom-input-button.component.html',
  styleUrl: './custom-input-button.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputButtonComponent),
      multi: true
    }
  ]
})
export class CustomInputButtonComponent implements ControlValueAccessor {
  @Input({ required: true })
  public text!: string;
  @Input({ required: true })
  public value: any;
  @Input()
  isDisabled: boolean = false;
  @Input()
  public classList: string[] = [];
  @Input()
  public disabledClass: string = 'disabled';
  private _value: any = null;
  onChange: any = () => {
  };
  onTouched: any = () => {
  };

  writeValue(value: any): void {
    if (value !== undefined) {
      this._value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onClick() {
    this._value = this.value;
    this.onChange(this._value);
    this.onTouched();
  }
}
