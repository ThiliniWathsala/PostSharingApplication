import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PostService } from '../post.service';


@Component({
    selector:'app-postcreate',
    templateUrl:'./post-create.component.html',
    styleUrls:['./post-create.component.css']
})

export class PostCreateComponent{

    
    enteredTitle:"";
    enteredContent:"";
  
    constructor(public postservice:PostService){
    
    }


    save(form:NgForm){
    if(form.invalid){
        return;
    }
   this.postservice.addPost(form.value.title,form.value.content);
    form.resetForm();  // to reset the form 
  }

}