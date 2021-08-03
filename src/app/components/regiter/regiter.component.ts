import { UserService } from './../../services/user.service';
import { user } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-regiter',
  templateUrl: './regiter.component.html',
  styleUrls: ['./regiter.component.css']
})
export class RegiterComponent implements OnInit {
  constructor(public service: UserService) { }
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  ngOnInit(): void {
  }
  onSubmit(form: NgForm) {
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
  // onSubmit(form: NgForm) {
  //   this.service.regiter().subscribe(
  //     (res: any) => {
  //       if (res.succeeded) {
  //         this.resetForm(form);
  //         this.errorMessage = 'New user created!', 'Registration successful.';
  //       } else {
  //         res.errors.forEach(element => {
  //           switch (element.code) {
  //             case 'DuplicateUserName':
  //               this.errorMessage = 'Username is already taken','Registration failed.';
  //               break;
  //             default:
  //               this.errorMessage = element.description,'Registration failed.';
  //               break;
  //           }
  //         });
  //       }
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   );
  // }
}
