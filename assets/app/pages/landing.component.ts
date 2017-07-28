import { Component } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { MdGridList, MdCard, MdButton } from "@angular/material";

@Component({
    selector: 'app-authentication',
    templateUrl: './landing.component.html'
})
export class LandingComponent {
    constructor(private authService: AuthService){}

    isLoggedIn(){
        return this.authService.isLoggedIn();
    }

    getUserName(){
        return this.authService.getUserName();
    }

}