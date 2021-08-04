import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from 'src/app/models/user.model';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userDetails : any;
  isLoggedIn = true;
  dangnhap = true;
constructor(private router:Router,private  service: UserService) {
}

  ngOnInit(): void {
    if (localStorage.getItem('token') != null){
      this.router.navigateByUrl('/');
      this.dangnhap=false;
      this.isLoggedIn=true;
    }
    this.service.getUserProfile().subscribe(
      res => {
        this.userDetails = res;
        //console.log('sfhj',this.userDetails)
      },
      err => {
        console.log(err);
      },
    );


  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
    this.dangnhap=true;
    this.isLoggedIn=false;
  }
}
