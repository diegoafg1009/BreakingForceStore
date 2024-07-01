import { inject, Injectable } from '@angular/core';
import { GetObjective } from "../dtos";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObjectiveService {
  private readonly _apiUrl : string = `${environment.apiUrl}/objectives`;
  private readonly _http: HttpClient = inject(HttpClient);
  public getObjectives(): Observable<GetObjective[]>{
    return this._http.get<GetObjective[]>(`${this._apiUrl}/get-all-active`);
  }
}
