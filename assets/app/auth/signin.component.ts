import { Component} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User } from "../users/user.model";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { MdSnackBar } from '@angular/material';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html'
})
export class SigninComponent{
    loginForm: FormGroup;

    constructor(private authService: AuthService, private router: Router, private snackBar: MdSnackBar){}

    onSubmit() {
        const user = new User(this.loginForm.value.email, this.loginForm.value.password);
        this.authService.signin(user)
            .subscribe(
                data => {
                    sessionStorage.setItem('token', data.token);
                    sessionStorage.setItem('userId', data.userId);
                    user.userId = data.userId;
                    sessionStorage.setItem('email', user.email);
                    sessionStorage.setItem('firstName', data.firstName);
                    this.openSnackBar(data.firstName);
                    this.router.navigateByUrl('/');
                },
                error => console.error(error)
            );
        this.authService.updateUser(user);
            
        this.loginForm.reset();
    }

    ngOnInit() {
        this.loginForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.email
            ]),
            password: new FormControl(null, Validators.required)
        });
    }
    openSnackBar(firstName : string) {
    this.snackBar.open('logged in!', firstName, {
      duration: 1300,
    });
 }
}