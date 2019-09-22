import { Component, OnInit} from '@angular/core';
import { Posts } from '../post.model';
import { PostService } from '../post.service';

@Component({
    selector:'./app-post-list',
    templateUrl:'./post-list.component.html',
    styleUrls:['./post-list.component.css']
})

export class PostListComponent implements OnInit{
// posts =[
//     {title:'1st post',content:'This is the first\'s post content'},
//     {title:'2nd post',content:'This is the second\'s post content'},
//     {title:'3rd post',content:'This is the third\'s post content'},
//     {title:'4th post',content:'This is the fourth\'s post content'},
// ]

 posts:Posts[]=[];

constructor(public postservice:PostService){
    
}

ngOnInit(){
    this.posts=this.postservice.getPost();
}


 

 
}