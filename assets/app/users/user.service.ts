import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { MdSnackBar } from '@angular/material';
import { User } from "./user.model";
import { ErrorService } from "../errors/error.service";
import { AuthService } from "../auth/auth.service";
import { BlogService } from "../blogs/blog.service";

@Injectable()
export class UserService { 
    private users: User[] = [];
    
    constructor(private http: Http, private errorService: ErrorService, 
                private snackBar: MdSnackBar, private sanitizer: DomSanitizer,
                private authService: AuthService, private blogService: BlogService) {}

    getUsers() {
        return this.http.get('http://normsalley.com/user')
            .map((response: Response) => {
                const users = response.json().obj;
                let transformedUsers: User[] = [];
                for (let user of users) {
                    transformedUsers.push(new User(
                        user.email,
                        user.password, 
                        user.userId,
                        user.firstName, 
                        user.lastName)
                    );
                }
                this.users = transformedUsers;
                return transformedUsers;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    updateUser(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        const userId = sessionStorage.getItem('userId')
                      ? '?token=' + sessionStorage.getItem('userId')
                      : '';
        const token = sessionStorage.getItem('token')
                      ? '?token=' + sessionStorage.getItem('token')
                      : '';
                      this.openSnackBar(user.firstName, 'updated');
        return this.http.patch('http://normsalley.com/user/' + userId + token, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    deleteUser(user: User) {
        this.users.splice(this.users.indexOf(user), 1);
        const userId = sessionStorage.getItem('userId')
                      ? '?token=' + sessionStorage.getItem('userId')
                      : '';
        const token = sessionStorage.getItem('token')
                      ? '?token=' + sessionStorage.getItem('token')
                      : '';
                      this.openSnackBar(user.firstName, 'deleted');
        return this.http.delete('http://normsalley.com/user/' + userId + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    getBlogs(){
        
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