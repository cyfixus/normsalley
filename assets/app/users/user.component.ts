import { Component, Input } from "@angular/core";
import { User } from "./user.model";
import { UserService } from "./user.service";



@Component({
    selector: 'app-user',
    templateUrl: './user.component.html'
})
export class UserComponent {
    @Input() user: User;

    constructor(private userService: UserService) {}

    belongsToUser(email: string){
        console.log(email);
        console.log(sessionStorage.getItem('email'));
        return sessionStorage.getItem('email') == email;
    }
    getUserAvatar(){
        return 'http://normsalley.com/ico.png';
    }

    isLoggedIn(){
        return this.userService.isLoggedIn();
    }

}
