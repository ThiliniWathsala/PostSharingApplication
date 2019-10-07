import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AuthData } from '../auth-data.model';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
  })



export class SignupComponent{
    constructor(private authService:AuthService){}

    isLoading=false;

    onSignup(form : NgForm){
        if(form.invalid){
            return;
        }

      const authdata:AuthData={email:form.value.email , password : form.value.password};
        this.authService.createUser(authdata.email , authdata.password);
        
        console.log(form.value);
    }

}