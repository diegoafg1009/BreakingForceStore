import { inject, Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { GetVariation } from "../dtos";

@Injectable({
  providedIn: 'root'
})
export class VariationService {
  private readonly _apiUrl: string = `${environment.apiUrl}/variations`;
  private readonly _http: HttpClient = inject(HttpClient);

  public getVariation(id: string): Observable<GetVariation> {
    return this._http.get<GetVariation>(`${this._apiUrl}/${id}`);
  }

  public getVariations(ids: string[]): Observable<GetVariation[]> {
    return this._http.post<GetVariation[]>(`${this._apiUrl}/by-ids`, ids);
  }

}
