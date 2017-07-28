import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "./auth.service";
import { User } from "../users/user.model";
import { Router, ActivatedRoute } from "@angular/router";
import { MdSnackBar } from '@angular/material';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
    signupForm: FormGroup;

    constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute,  private snackBar: MdSnackBar){}

    onSubmit() {
        const user = new User(
                                this.signupForm.value.email, 
                                this.signupForm.value.password,
                                this.signupForm.value._id,
                                this.signupForm.value.firstName,
                                this.signupForm.value.lastName
        );
        
        this.authService.signup(user)
                        .subscribe(
                            data => {
                                console.log(data);
                                
                            },
                            error => console.error(error)
                        );
        this.authService.signin(user)
            .subscribe(
                data => {
                    sessionStorage.setItem('token', data.token);
                    sessionStorage.setItem('userId', data.userId);
                    console.log("dataId: " + data.userId);
                    user.userId = data.userId;
                    console.log("userId: " + user.userId);
                    sessionStorage.setItem('email', user.email);
                    sessionStorage.setItem('firstName', data.firstName);
                    this.openSnackBar(data.firstName);
                    this.router.navigateByUrl('/');
                },
                error => console.error(error)
            );
        this.authService.updateUser(user);
        this.signupForm.reset();
        this.openSnackBar(user.firstName);
        this.router.navigateByUrl('/');
    }

    ngOnInit() {
        this.signupForm = new FormGroup({
            firstName: new FormControl(null, Validators.required),
            lastName: new FormControl(null, Validators.required),
            email: new FormControl(null, [
                Validators.required,
                Validators.email
            ]),
            password: new FormControl(null, Validators.required)
        });
    }
    openSnackBar(firstName : string) {
        this.snackBar.open('welcome!', firstName, {
          duration: 1300,
        });
    }
}