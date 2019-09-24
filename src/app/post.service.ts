
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'
import { Posts } from './post.model';
import { HttpClient } from '@angular/common/http';


Injectable({providedIn:"root"})  // we inject it providers in app module.ts

export class PostService{
            
    constructor(private http:HttpClient){}

    private posts:Posts[]=[];
    private postUpdated=new Subject<Posts[]>();


    getPost(){
       // return [...this.posts];  // this is a copy of old post:Post[].copy old array to new array and past it 
        this.http.get<{message:string,posts:Posts[]}>('http://localhost:3000/api/posts')
        .subscribe((postData)=>{
            this.posts=postData.posts;   // post data has messages and post[] 
            this.postUpdated.next([...this.posts]);  // get the copy of updated posts array
            console.log(postData.message);
        })
        

     }

    getPostUpdatelistener(){
        return this.postUpdated.asObservable();    // this is used to return updated post list
    } 

     addPost(title:string,content:string){
        const post:Posts={id:null,title:title,content:content};
        this.http.post<{message:string}>('http://localhost:3000/api/posts',post)
        .subscribe((responseData)=>{
            console.log(responseData.message);
            this.posts.push(post);              //after recieve the success msg from backend add post to local array
            this.postUpdated.next([...this.posts]);
        })
       
     }

}