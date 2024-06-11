import { FormArray, FormGroup } from "@angular/forms";

export class BaseForm {
  isValidField( formGroup: FormGroup ,field: string ): boolean | null {
    return !(formGroup.controls[field].errors
      && formGroup.controls[field].touched);
  }

  hasFieldError( formGroup: FormGroup, error: string, field: string): string | null {
    const control = formGroup.controls[field];
    if (control?.errors && Object.keys(control.errors).includes(error)) {
      return error;
    }
    return null;
  }

  isValidFieldInArray(formArray: FormArray, index: number, field?: string): boolean | null {
    const control = field ? formArray.controls[index].get(field) : formArray.controls[index];
    return !(control?.errors && control.touched);
  }

  hasFieldErrorInArray( formArray: FormArray, index: number, error: string, field?: string ) {
    const control = field ? formArray.controls[index].get(field) : formArray.controls[index];
    if (control?.errors && Object.keys(control.errors).includes(error)) {
      return error;
    }
    return null;
  }
}
