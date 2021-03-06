import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({providedIn:"root"})  //we provide it in app.module.ts(root component)

export class AuthService{
    private token:string;
    private authStatusListener=new Subject<boolean>();     //used to push aithenticate information
    private isAuthenticated=false;
    private tokenTimer:any;
    constructor(private http : HttpClient,private router:Router){}
   

    getToken(){
        return this.token;
    }

    isAuthenticatedSub(){
        return this.isAuthenticated;
    }

    getAuthstatusListener(){
        return this.authStatusListener.asObservable();  //so we cnt emmit ne values from other component
    }


        createUser(email : string , password : string){
            const authdata:AuthData={email : email , password : password};
            this.http.post("http://localhost:3000/api/user/signup ",authdata)
              .subscribe(response=>{
                console.log(response); 
            
            });
        }

        login(email:string , password:string ){
            const authdata:AuthData={email : email , password : password};
            this.http.post<{token:string, expiresIn: number}>("http://localhost:3000/api/user/login",authdata)
            .subscribe(response=>{
                const expiresInDuration=response.expiresIn;
                this.tokenTimer= setTimeout(() => {
                    this.logOut();
                },expiresInDuration*1000);

                const token=response.token //get the token fron response
                this.token = token;
                if(token){
                    this.isAuthenticated=true;
                    this.authStatusListener.next(true);
                }
                
                this.router.navigate(['/']);
               
            })
        }

        logOut(){
            this.token=null;
            this.isAuthenticated=false;
            this.authStatusListener.next(false);
            this.router.navigate(['/']);
            clearTimeout(this.tokenTimer);

        }


}