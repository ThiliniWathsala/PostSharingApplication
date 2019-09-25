
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'
import { Posts } from './post.model';
import { HttpClient } from '@angular/common/http';
import{ map } from 'rxjs/Operators';


Injectable({providedIn:"root"})  // we inject it providers in app module.ts

export class PostService{
            
    constructor(private http:HttpClient){}

    private posts:Posts[]=[];
    private postUpdated=new Subject<Posts[]>();



    //pipe used to do mutlipel operations.here we ude to convert backend _id to front end id

    getPost(){
       // return [...this.posts];  // this is a copy of old post:Post[].copy old array to new array and past it 
        this.http
        .get<{message:string,posts:Posts[]}>('http://localhost:3000/api/posts')  //mesage and post back end eke dena variable ekama denna oni
        /*.pipe(map((postedData)=>{
            return postedData.posts.map(post=>{ 
                return{
                    title:post.title,
                    content:post.content,
                    id:post._id
                };
            });
        }))*/
        .subscribe((transformedPosts)=>{
            this.posts=transformedPosts.posts;   // post data has messages and post[] 
            this.postUpdated.next([...this.posts]);  // get the copy of updated posts array
          //  console.log(transformedData.message);
        })
        

     }
        getPostUpdatelistener(){
        return this.postUpdated.asObservable();    // this is used to return updated post list
    } 

     addPost(title:string,content:string){
        const post:Posts={_id:null,title:title,content:content};
        this.http.post<{message:string}>('http://localhost:3000/api/posts',post)
        .subscribe((responseData)=>{
            console.log(responseData.message);
            this.posts.push(post);              //after recieve the success msg from backend add post to local array
            this.postUpdated.next([...this.posts]);
        })
       
     }

     deletepost(postId:string){
        this.http.delete("http://localhost:3000/api/posts/"+postId)
        .subscribe(()=>{
            const updatedPost=this.posts.filter(updatepost=>updatepost._id!==postId); // filetr used to filter the deleted post n this method update post without reloading
            this.posts=updatedPost;
            this.postUpdated.next([...this.posts]);
        })
     }

}