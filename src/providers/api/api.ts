import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
let apiUrl = 'http://localhost:3000/api/users';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ApiProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ApiProvider Provider');
  }
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
  register(data): Observable<any> {
    return this.http.post(apiUrl+'user', JSON.stringify(data), httpOptions);
  }
  getUser(id): Observable<any> {
    return this.http.get(apiUrl+'user/'+id, httpOptions).pipe(
      map(this.extractData));
  }
}
/*
  register(data): Observable<any>{
    return this.http.post<User>(this.url, user, httpOptions);
  }
  getUser(id:string): Observable<any>{
      return this.http.get<User>(`${this.url}/${id}`);
  }
}
*/
