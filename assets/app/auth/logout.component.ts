import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { MdSnackBar } from '@angular/material';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html'
})
export class LogoutComponent {
	constructor(private authService: AuthService, private router: Router, private snackBar: MdSnackBar){

	}
    onLogout() {
    	this.openSnackBar();
    	this.authService.logout();
    	this.router.navigateByUrl('/');

    }
    openSnackBar() {
    this.snackBar.open('logged out!', this.authService.getUserName(), {
      duration: 1300,
    });
  }
}
