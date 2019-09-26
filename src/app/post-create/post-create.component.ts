import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
    form:FormGroup;
    imagePreview:string;
    private mode='postcreate';
    private postId:string;

 


    constructor(public postservice:PostService, public route:ActivatedRoute){  // used to identify the correct rout path
    
    }

   ngOnInit(){

    this.form= new FormGroup({
        title: new FormControl(null,{
            validators:[Validators.required,Validators.minLength(3)]
        }),

        content: new FormControl(null,{validators:[Validators.required]}),
        image:new FormControl(null,{validators:[Validators.required]})
    });

     //this is used to identify whether we hv id parameter or not(use same angular component but different postId s)
        
     this.route.paramMap.subscribe((paramMap:ParamMap)=>{         //paramMap is userd to extract parameters from URL
        if(paramMap.has('postId')){
            this.mode ='edit';
            this.postId = paramMap.get('postId');    //if has postid go to edit url
           
            this.post = this.postservice.getPosts(this.postId);
            this.form.setValue({
                title:this.post.title,
                content:this.post.content
            });
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

    onImagePicked(event:Event){
        const file=(event.target as HTMLInputElement).files[0];      //HTMLINPUTElement is used to identify te incominf file is html file input  and .files come as array so we give 0 eleent ususally   
        this.form.patchValue({image:file});        // patchValue allows to target single control     
        this.form.get('image').updateValueAndValidity();
        const reader= new FileReader();
        reader.onload=()=>{
        this.imagePreview=reader.result as string;
        };
        reader.readAsDataURL(file);
                                               
    }


    save(){
    if(this.form.invalid){
        return;
    }
    if(this.mode==='postcreate'){
        this.postservice.addPost(this.form.value.title,this.form.value.content);
        
    }
    else{
        this.postservice.upDatePost(this.postId,this.form.value.title,this.form.value.content)
    }
    
      this.form.reset();  // to reset the form 
  }

}