import { inject, Injectable } from '@angular/core';
import { GetCategory } from "../dtos";
import { environment } from "../../../enviroments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly _apiUrl: string = `${environment.apiUrl}/categories`
  private readonly _http: HttpClient = inject(HttpClient);

  public getCategories(): Observable<GetCategory[]>{
    return this._http.get<GetCategory[]>(`${this._apiUrl}/get-all`);
  }
}
