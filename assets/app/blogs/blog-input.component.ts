import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { BlogService } from "./blog.service";
import { Blog } from "./blog.model";
import { MdSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { TaToolbarService } from "../taToolbar.service";


@Component({
    selector: 'app-blog-input',
    templateUrl: './blog-input.component.html'
})
export class BlogInputComponent implements OnInit {
    blog: Blog;
    lastFocused = document.activeElement;

    constructor(private blogService: BlogService, private snackBar: MdSnackBar, 
                private router: Router, private tatoolbarService: TaToolbarService) {}

    onSubmit(form: NgForm) {
        if(this.blog){
            this.blog.title = form.value.title;
            this.blog.content = form.value.content;
            this.blog.tag = form.value.tag;
            this.blogService.updateBlog(this.blog)
                .subscribe(
                        result => console.log(result)
                    );
            this.blog = null;
        }  else{
            const blog = new Blog(
                                    form.value.title,
                                    form.value.content,
                                    form.value.tag,
                                    sessionStorage.getItem('firstName')
                                 );
            this.blogService.addBlog(blog)
                .subscribe(
                    data => {this.router.navigateByUrl('/');},
                    error => console.log(error)
                );

        }
        this.blogService.editFalse();
        form.resetForm();
    }

    onClear(form: NgForm) {
        this.openSnackBar('form cleared', 'x');
        this.blog = null;
        this.blogService.editFalse();
        form.resetForm();
    }

    ngOnInit() {

        this.blogService.blogIsEdit.subscribe(
            (blog: Blog) => this.blog = blog
        );
    }

    openSnackBar(message : string, action: string) {
        this.snackBar.open(message, action, {
          duration: 1300,
        });
    }

    addTag(form: NgForm, tag: string){
        var tagOutput = form.value.content += this.tatoolbarService.addTag(tag);
        var input = this.lastFocused;

    }



}