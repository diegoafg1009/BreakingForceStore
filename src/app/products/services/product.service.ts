import { inject, Injectable } from '@angular/core';
import { GetProduct, GetProductSimple } from "../dtos";
import { environment } from "../../../enviroments/environment";
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpUtils } from "../../shared/utils/http-utils";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly _apiUrl: string = `${ environment.apiUrl }/products`;
  private readonly _http: HttpClient = inject(HttpClient);

  public getProduct(id: string): Observable<GetProduct> {
    return this._http.get<GetProduct>(`${ this._apiUrl }/${ id }`);
  }

  public getProducts(filterParams: HttpParams): Observable<HttpResponse<GetProductSimple[]>> {
    return this._http.get<GetProductSimple[]>(`${ this._apiUrl }/filter`, { params: filterParams, observe: 'response'});
  }
}
