import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Posts } from '../post.model';
import { PostService } from '../post.service';


@Component({
    selector:'app-postcreate',
    templateUrl:'./post-create.component.html',
    styleUrls:['./post-create.component.css']
})

export class PostCreateComponent{
    constructor(public postservice:PostService){
    
    }

    enteredTitle:"";
    enteredContent:"";
  

save(form:NgForm){
    if(form.invalid){
        return;
    }
  

    this.postservice.addPost(form.value.title,form.value.content);

}

}