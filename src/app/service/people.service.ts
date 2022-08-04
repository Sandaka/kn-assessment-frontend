import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  private readonly apiEndpoint: string = 'http://localhost:8090/api';

  constructor(private http: HttpClient) { }

  getContacts(name: string = '', page: number = 0, size: number = 50): Observable<any> {
    return this.http.get(`${this.apiEndpoint}/people?name=${name}&page=${page}&size=${size}`);
  }
}
