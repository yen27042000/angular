import { AuthInterceptor } from './auth/auth.interceptor';
import { UserService } from './services/user.service';
import { Router, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { GuessComponent } from './components/guess/guess.component';
import { EvolveComponent } from './components/evolve/evolve.component';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserComponent } from './components/user/user.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContactComponent,
    GuessComponent,
    EvolveComponent,
    UserComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      progressBar: true
    }),
    FormsModule,
    HttpClientModule,
  ],
  providers: [UserService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
