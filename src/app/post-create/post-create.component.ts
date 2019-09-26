import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { PostService } from '../post.service';
import { Posts } from '../post.model';


@Component({
    selector:'app-postcreate',
    templateUrl:'./post-create.component.html',
    styleUrls:['./post-create.component.css']
})

export class PostCreateComponent implements OnInit{

   
   
    enteredTitle="";
    enteredContent="";
    post:Posts;
    
    private mode='postcreate';
    private postId:string;
 


    constructor(public postservice:PostService, public route:ActivatedRoute){  // used to identify the correct rout path
    
    }

   ngOnInit(){
     //this is used to identify whether we hv id parameter or not(use same angular component but different postId s)
        
     this.route.paramMap.subscribe((paramMap:ParamMap)=>{         //paramMap is userd to extract parameters from URL
        if(paramMap.has('postId')){
            this.mode ='edit';
            this.postId = paramMap.get('postId');    //if has postid go to edit url
            this.post = this.postservice.getPosts(this.postId);
        }
        else{
            this.mode='postcreate';       // else stay in postcreate url
            this.postId=null;
        }
     })





 /* ngOnInit(){
        //this is used to identify whether we hv id parameter or not(use same angular component but different postId s)

        this.route.paramMap.subscribe((paramMap:ParamMap)=>{     //paramMap is userd to extract parameters from URL
            if(paramMap.has('postId')){
                this.mode='edit';   
                this.postId=paramMap.get('postId');  // if has postid go to edit url
                this.post=this.postservice.getPosts(this.postId);
            }
            else{
                this.mode='postcreate';   // else stay in postcreate url
                this.postId=null;
            }
        });                    

    }*/

}


    save(form:NgForm){
    if(form.invalid){
        return;
    }
    if(this.mode==='postcreate'){
        this.postservice.addPost(form.value.title,form.value.content);
        
    }
    else{
        this.postservice.upDatePost(this.postId,form.value.title,form.value.content)
    }
    
       form.resetForm();  // to reset the form 
  }

}