import { inject, Injectable } from '@angular/core';
import { GetBrand } from "../dtos";
import { environment } from "../../../enviroments/environment";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private readonly _apiUrl: string = `${environment.apiUrl}/brands`
  private readonly _http: HttpClient = inject(HttpClient);
  public getBrands(): Observable<GetBrand[]>{
    return this._http.get<GetBrand[]>(`${this._apiUrl}/get-all`);
  }
}
