import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Observable } from 'rxjs';
import { pascalCase } from "change-case";

@Injectable({
  providedIn: 'root'
})
export class PascalCaseInterceptorService implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method === 'GET' && req.params.keys().length > 0) {
      const pascalCaseParams = this.paramsToPascalCase(req.params);
      const modifiedRequest = req.clone({ params: pascalCaseParams });
      return next.handle(modifiedRequest);
    }
    // Si no es una solicitud POST, PUT o GET, continua sin modificar
    return next.handle(req);
    }

    private paramsToPascalCase(params: HttpParams): any {
      let pascalCaseParams: HttpParams = new HttpParams();
      for (const key of params.keys()) {
          pascalCaseParams = pascalCaseParams.append(pascalCase(key), params.get(key)!);
      }
      return pascalCaseParams;
    }
}
