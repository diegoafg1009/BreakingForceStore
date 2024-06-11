import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { map, Observable, tap } from "rxjs";
import { CustomerToken, LoginCustomer } from "../interfaces";
import { AuthStatus } from "../enums/auth-status.enum";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _apiUrl: string = `${ environment.apiUrl }/customers`;
  private readonly _http: HttpClient = inject(HttpClient);
  private _accessToken = signal<CustomerToken | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public get accessToken() {
    return computed(() => this._accessToken());
  }

  public get authStatus() {
    return computed(() => this._authStatus());
  }

  login(requestBody: LoginCustomer): Observable<boolean> {
    return this._http.post<CustomerToken>(`${ this._apiUrl }/login`, requestBody)
      .pipe(
        tap( (accessToken ) => {
          this._accessToken.set(accessToken);
          console.log(accessToken);
          this._authStatus.set(AuthStatus.authenticated);
        }),
        map(() => true)
      );
  }


}
