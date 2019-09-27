
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'
import { Posts } from './post.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
//import{ map } from 'rxjs/Operators';


Injectable({providedIn:"root"})  // we inject it providers in app module.ts

export class PostService{
            
    constructor(private http:HttpClient,private router:Router ){}

    private posts:Posts[]=[];
    private postUpdated=new Subject<Posts[]>();



    //pipe used to do mutlipel operations.here we ude to convert backend _id to front end id

    getPost(){
       // return [...this.posts];  // this is a copy of old post:Post[].copy old array to new array and past it 
        this.http
        .get<{message:string,posts:Posts[]}>("http://localhost:3000/api/posts")  //mesage and post back end eke dena variable ekama denna oni
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
        });
    }

    getPosts(id:string ){
        return{...this.posts.find(p=>p._id===id)};           //...(spead operator) used to get the all the property of object in old array and add it to new object
    }

 
    upDatePost(id:string,title:string,content:string){
        const post:Posts={_id:id,title:title,content:content};
        this.http.put("http://localhost:3000/api/posts/"+id,post)
        .subscribe(respose=>{console.log(respose);
        this.router.navigate(["/"]);

        
    });
    } 

       

/*
    updatePost(id:string,title:string,content:string){
        const post:Posts = {
                _id:id,  
                title:title,
                content:content 
             };
              this.http.put('http://localhost:3000/api/posts'+ id,post)
             .subscribe((result)=>{
              console.log(result);
        }) 
    }
*/

        getPostUpdatelistener(){
        return this.postUpdated.asObservable();    // this is used to return updated post list
        } 


     addPost(title:string,content:string,image:File){
        const postdata = new FormData();    //convert data to form data(json object ekak widihata files ywnna be)
        postdata.append("title", title);
        postdata.append("content",content);
        postdata.append("image" , image, title);



        this.http.post<{message:string, postId:string}>('http://localhost:3000/api/posts',postdata)
        .subscribe((responseData)=>{
          const post:Posts={_id:responseData.postId,title:title,content:content};

          //const id=responseData. postId;
        //  post._id=id;                            //override the id value in the above array
            this.posts.push(post);              //after recieve the success msg from backend add post to local array
            this.postUpdated.next([...this.posts]);
            this.router.navigate(["/"]);
        });
       
     }

     deletepost(postId:string){
        this.http.delete("http://localhost:3000/api/posts/"+postId)
        .subscribe(()=>{
            const updatedPost=this.posts.filter(updatepost=>updatepost._id!==postId); // filetr used to filter the deleted post n this method update post without reloading
            this.posts=updatedPost;
            this.postUpdated.next([...this.posts]);
        });
     }

}