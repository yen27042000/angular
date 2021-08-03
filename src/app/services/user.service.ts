import { user } from './../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  formData: user= new user();
  readonly baseURL = 'http://localhost:10241/api/';
  //////Lưu ý
  list : user[] | undefined;

  constructor(private http: HttpClient) { }

  regiter() {
    return this.http.post(this.baseURL+'ApplicationUser/Register', this.formData);
  }
  login(abc : FormData) {
    return this.http.post(this.baseURL + 'ApplicationUser/Login', abc);
  }

  getUserProfile() {
    return this.http.get(this.baseURL + 'UserProfile');
  }

}
