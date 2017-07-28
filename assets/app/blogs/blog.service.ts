import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { MdSnackBar } from '@angular/material';
import { Blog } from "./blog.model";
import { ErrorService } from "../errors/error.service";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class BlogService { 
    private blogs: Blog[] = [];
    blogIsEdit = new EventEmitter<Blog>();
    edit = false;
    blogEditing = new EventEmitter<boolean>();
    filterChosen = new EventEmitter<string>();
    
    constructor(private http: Http, private errorService: ErrorService, 
                private snackBar: MdSnackBar,
                private authService: AuthService) {}

    addBlog(blog: Blog) {
        const body = JSON.stringify(blog);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = sessionStorage.getItem('token')
                      ? '?token=' + sessionStorage.getItem('token')
                      : '';
        return this.http.post('http://normsalley.com/blog' + token, body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const blog = new Blog(
                    result.obj.title,
                    result.obj.content, 
                    result.obj.tag,
                    result.obj.user.firstName,
                    result.obj._id,
                    result.obj.user._id);
                this.blogs.push(blog);
                console.log(result.obj.user._id);
                this.openSnackBar(blog.title, 'created');
                return blog;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    getBlogs() {
        return this.http.get('http://normsalley.com/blog')
            .map((response: Response) => {
                const blogs = response.json().obj;
                let transformedBlogs: Blog[] = [];
                for (let blog of blogs) {
                    transformedBlogs.push(new Blog(
                        blog.title,
                        blog.content, 
                        blog.tag,
                        blog.user.firstName, 
                        blog._id, 
                        blog.user._id)
                    );
                }
                this.blogs = transformedBlogs;
                return transformedBlogs;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
    editing(){
        this.blogEditing.emit(this.edit);
    }

    editBlog(blog: Blog) {
        this.editing();
        this.openSnackBar(blog.title, 'open for editing');
 
        this.blogIsEdit.emit(blog);

    }

    editFalse(){
        this.edit = false;
        this.editing();

    }
     editTrue(){
        this.edit = true;
        this.editing();

    }

    updateBlog(blog: Blog) {
        const body = JSON.stringify(blog);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = sessionStorage.getItem('token')
                      ? '?token=' + sessionStorage.getItem('token')
                      : '';
                      this.openSnackBar(blog.title, 'updated');
        return this.http.patch('http://normsalley.com/blog/' + blog.blogId + token, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    deleteBlog(blog: Blog) {
        this.blogs.splice(this.blogs.indexOf(blog), 1);
        const token = sessionStorage.getItem('token')
                      ? '?token=' + sessionStorage.getItem('token')
                      : '';
                      this.openSnackBar(blog.title, 'deleted');
        return this.http.delete('http://normsalley.com/blog/' + blog.blogId + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }



    isLoggedIn(){
        return this.authService.isLoggedIn();
    }
    openSnackBar(message : string, action: string) {
        this.snackBar.open(message, action, {
          duration: 1300,
        });
    }
}