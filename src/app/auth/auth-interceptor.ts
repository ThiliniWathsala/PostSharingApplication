import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()    //use to inject auth servise 
export class AuthInterceptor implements HttpInterceptor{  //here next is used to allow the interceptor or request that interceptor to handle the journy
  constructor(private authService:AuthService){}

    intercept(req:HttpRequest<any>,next:HttpHandler){           //call this methos for request leaving app    next is used as subscriber
        const authToken= this.authService.getToken();
        
        const auhtRequest=req.clone({
            headers:req.headers.set("Autherization","Bearer "+authToken)  //override the headers with autherization
        });   // get the copy of rquest
        return next.handle(auhtRequest)      //to retern something we need to user next.handle method provided on next
        
    }    
}