import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { user } from 'src/app/models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  isLoggedIn = true;
  dangnhap = true;
  isSuccessful = false;
  isSignUpFailed = false;
  isSignUpFailed1 = false;
  errorMessage = '';
  errorMessage1 = '';
  formModel = {
    UserName: '',
    Password: ''
  }
  constructor(public service: UserService,private toastr: ToastrService, private router:Router ) { }

  ngOnInit() {
   if (localStorage.getItem('token') != null){
    this.router.navigateByUrl('/');
    this.isLoggedIn = true;
    this.dangnhap = false;
   }

  }

  onSubmit(form: NgForm) {
    this.service.login(form.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/');
      },
      err => {
        console.log(err)
        this.errorMessage1 = 'Tên đăng nhạp hoặc mật khẩu không đúng !!!!';
        this.isSignUpFailed1=true;
        if (err.status == 400){
          this.toastr.error('Incorrect username or password.', 'Authentication failed.');
        }

        else
          console.log(err);
      }
    );
  }
  onSubmit1(form: NgForm) {
    this.insertRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.regiter().subscribe(

      res => {
        this.resetForm(form);
        this.isSignUpFailed = false;
        this.isSuccessful = true;
      },
      err => { console.log(err);
       this.errorMessage = err;
       this.isSignUpFailed = true;
       this.isSuccessful = false;
       }
    )
  }
  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new user();
  }

}
