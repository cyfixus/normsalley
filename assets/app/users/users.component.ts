import { Component, OnInit } from "@angular/core";
import { UserService } from "./user.service";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
	constructor(private userService: UserService) {}

	ngOnInit() {

    }
}