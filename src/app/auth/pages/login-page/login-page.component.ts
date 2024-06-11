import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BaseForm } from "../../../shared/utils/base-form";
import { ValidationErrors } from "../../../shared/enums/validation-errors.enum";
import { AuthService } from "../../services/auth.service";
import { LoginCustomer } from "../../interfaces";
import { Router } from "@angular/router";

@Component({
  selector: 'auth-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent extends BaseForm implements OnInit {
  private readonly _formBuilder: FormBuilder = inject(FormBuilder);
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _router: Router = inject(Router);
  public loginFormGroup: FormGroup = {} as FormGroup;
  protected readonly validationErrors = ValidationErrors;

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginFormGroup = this._formBuilder.group({
      email: [ '', [ Validators.required, Validators.email ] ],
      password: [ '', [ Validators.required ] ]
    });
  }

  login() {
    const loginCustomer: LoginCustomer = this.loginFormGroup.value;
    this._authService.login(loginCustomer).subscribe({
      next: (success) => {
        if (success) {
          this._router.navigateByUrl('/checkout/payment');
        }
      },
      error: (error) => {
        switch (error.status) {
          case 401:
            this.loginFormGroup.setErrors({ invalidCredentials: true });
            break;
          case 403:
            this.loginFormGroup.setErrors({ lockedAccount: true });
            break;
        }
      }
    });
  }

  onSubmit() {
    if (this.loginFormGroup.invalid) {
      this.loginFormGroup.markAllAsTouched();
      return;
    }
    this.login();
  }
}
