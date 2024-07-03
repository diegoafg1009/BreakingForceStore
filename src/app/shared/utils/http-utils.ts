import { HttpParams } from "@angular/common/http";

export class HttpUtils {
  public static ToQueryParams(params: any): HttpParams {
    let queryParams: HttpParams = new HttpParams();
    console.log(params);
    for (const key in params) {
      if (params.hasOwnProperty(key) && (params[key] != null) && (params[key] != 'null') && (params[key] != '')) {
        queryParams = queryParams.append(key, params[key]);
      }
    }
    return queryParams;
  }
}
