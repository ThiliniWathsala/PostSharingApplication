import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatInputModule,
         MatCardModule,
         MatButtonModule,
         MatToolbarModule,
         MatExpansionModule,
         MatProgressSpinnerModule
         } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostCreateComponent } from './post-create/post-create.component';
import {   HeaderComponent   } from './Header/header.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostService } from './post.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';  //HTTP_INTERCEPTORS  tocken identifier 
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthService } from './auth/auth.service';
import { AuthInterceptor } from './auth/auth-interceptor';




@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    LoginComponent,
    SignupComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, 
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule ,
    MatProgressSpinnerModule,
    HttpClientModule,

    
  ],
  providers: [
   
    PostService,
    AuthService,
    {provide:HTTP_INTERCEPTORS,useClass : AuthInterceptor, multi:true},
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
