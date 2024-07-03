import { inject, Injectable } from '@angular/core';
import { GetProduct, GetProductSimple } from "../interfaces";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpUtils } from "../../shared/utils/http-utils";
import { Option } from "../../shared/interfaces/option.interface";

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

  public getOrderByOptions(): Option[] {
    return [
      { value: 'LowerPrice-true', label: 'Precio (menor a mayor)' },
      { value: 'LowerPrice-false', label: 'Precio (mayor a menor)' },
      { value: 'Name-true', label: 'Nombre (A-Z)' },
      { value: 'Name-false', label: 'Nombre (Z-A)' },
    ];
  }
}
