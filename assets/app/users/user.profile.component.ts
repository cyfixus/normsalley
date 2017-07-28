import { Component, Input, OnInit } from "@angular/core";
import { User } from "./user.model";
import { Blog } from "../blogs/blog.model";
import { UserService } from "./user.service";
import { BlogService } from "../blogs/blog.service";
import { BlogListComponent } from "../blogs/blog-list.component";
import { BlogComponent } from "../blogs/blog.component";


@Component({
    selector: 'app-user-profile',
    templateUrl: './user.profile.component.html'
})
export class UserProfileComponent  implements OnInit {
    blogs: Blog[];
    users: User[];
    user: User;
    email;

    constructor(private userService: UserService, private blogService: BlogService) {}

    getUser(){
        if(this.users){
            for(var i = 0; i < this.users.length; i++){
                if(this.users[i].email == this.email){
                    this.user = this.users[i];
                    break;
                }
            }
        }
    }
    belongsToUser(email: string){
        return sessionStorage.getItem('email') == email;
    }
    getUserAvatar(){
        return 'http://normsalley.com/ico.png';
    }

    isLoggedIn(){
        return this.userService.isLoggedIn();
    }

    ngOnInit() {
        this.userService.getUsers()
            .subscribe(
                (users: User[]) => {
                    this.users = users;
                       this.email = sessionStorage.getItem('email');
                       this.getUser();
                }
            );
        this.blogService.getBlogs()
            .subscribe(
                (blogs: Blog[]) => {
                    this.blogs = blogs;
                }
            );
    }
}
