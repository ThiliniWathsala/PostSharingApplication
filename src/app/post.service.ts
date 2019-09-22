
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'
import { Posts } from './post.model';


Injectable({providedIn:"root"})  // we inject it providers in app module.ts
export class PostService{
    private posts:Posts[]=[];
    private postUpdated=new Subject<Posts[]>();

    getPost(){
        return [...this.posts];  // this is a copy of old post:Post[].copy old array to new array and past it 
     }

    getPostUpdatelistener(){
        return this.postUpdated.asObservable();    // check later why we use it???  
    } 

     addPost(title:string,content:string){
        const post:Posts={title:title,content:content}
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
     }

}