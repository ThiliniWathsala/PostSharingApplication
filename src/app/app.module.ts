import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { MatInputModule,MatCardModule,MatButtonModule,MatToolbarModule, MatExpansionModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostCreateComponent } from './post-create/post-create.component';
import {   HeaderComponent   } from './Header/header.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostService } from './post.service';




@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule  

    
  ],
  providers: [
    PostService
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
