import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { GetSubcategory } from "../dtos/get-subcategory.interface";

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {
  private readonly _apiUrl: string = `${environment.apiUrl}/subcategories`;
  private readonly _http: HttpClient = inject(HttpClient);

  public getSubcategories(): Observable<GetSubcategory[]>{
    return this._http.get<GetSubcategory[]>(`${this._apiUrl}/get-all`);
  }

}
