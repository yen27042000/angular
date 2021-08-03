import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { covid } from '../models/covid.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CodvidService {
  httpOptions={
    headers:new HttpHeaders({'Content-Type':'Application/json'})
  };
  apiURL='https://api.covid19api.com/countries';
  constructor(private http: HttpClient) { }
   getAll(): Observable<covid[]>{
        return this.http.get<covid[]>(this.apiURL).pipe();
   }
}
