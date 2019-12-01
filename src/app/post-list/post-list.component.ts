import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';    
import { Posts } from '../post.model';
import { PostService } from '../post.service';
import { AuthService } from '../auth/auth.service';


@Component({
    selector:'./app-post-list',
    templateUrl:'./post-list.component.html',
    styleUrls:['./post-list.component.css']
})

export class PostListComponent implements OnInit,OnDestroy{
// posts =[
//     {title:'1st post',content:'This is the first\'s post content'},
//     {title:'2nd post',content:'This is the second\'s post content'},
//     {title:'3rd post',content:'This is the third\'s post content'},
//     {title:'4th post',content:'This is the fourth\'s post content'},
// ]

 posts:Posts[]=[];
 postSub:Subscription;
 authListenersub = new Subscription;
 userIsAuthenticated=false;
constructor(public postservice:PostService,private authService:AuthService){
    
}

ngOnInit(){  //meka image eka show krna method eka
  this.postservice.getPost();
  this.postSub = this.postservice.getPostUpdatelistener()  //get the resuls to postSub 
    .subscribe((posts:Posts[])=>{
        this.posts=posts;    // assigns post array witch comes from post.serve.ts
    });

    this.userIsAuthenticated = this.authService.isAuthenticatedSub();

    this.authListenersub=this.authService.getAuthstatusListener().subscribe(isAuthenticated=>{
         this.userIsAuthenticated=isAuthenticated;
    })
}

ngOnDestroy(){
    this.postSub.unsubscribe();  // this is remove the subscrioption and prevent memory leaks
    this.authListenersub.unsubscribe();
}

onDelete(postId:string){
    this.postservice.deletepost(postId);
}

 
}