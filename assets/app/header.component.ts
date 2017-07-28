import { Component } from "@angular/core";
import { AuthService } from "./auth/auth.service";
import { BlogService } from "./blogs/blog.service";
import { FormGroup, FormControl } from "@angular/forms";
import { MdSnackBar } from "@angular/material";


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent{
    searchForm: FormGroup;
    logo: string  = 'https://storage.googleapis.com/normsalley/logo.png';

    constructor(private authService: AuthService, private blogService: BlogService){}

    editFalse(){
        this.blogService.editFalse();
    }

    isLoggedIn(){
        return this.authService.isLoggedIn();
    }

    getUserName(){
        return this.authService.getUserName();
    }

    ngOnInit() {
        this.searchForm = new FormGroup({
            search: new FormControl(null)
        });
    }

    chooseFilter(filter: string){
        this.blogService.filterChosen.emit(filter);
        this.blogService.openSnackBar("searching for: ", filter);
    }
}