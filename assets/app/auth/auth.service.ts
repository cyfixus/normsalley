import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";

//how user is defined
import { User } from "../users/user.model";
import { ErrorService } from "../errors/error.service";


//allows injecting into service
@Injectable()
//when injected need to add to app.module
export class AuthService{
	private users = [];
	
	//store angular http service in http property
	constructor(private http: Http, private errorService: ErrorService) {}
	signup(user: User){
		//angular http service returns an Observable
		const body = JSON.stringify(user);

		const headers = new Headers({'Content-Type': 'application/json'});
		return this.http.post('http://normsalley.com/user', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
            
	}
	signin(user: User){
		const body = JSON.stringify(user);
		const headers = new Headers({'Content-Type': 'application/json'});
		return this.http.post('http://normsalley.com/user/signin', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
	}

	updateUser(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = sessionStorage.getItem('token')
                      ? '?token=' + sessionStorage.getItem('token')
                      : '';
        return this.http.patch('http://normsalley.com/user/' + user.userId + token, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

	logout(){
		sessionStorage.clear();
	}

	isLoggedIn(){
		return sessionStorage.getItem('token') !== null;
	}

	getUserName(){
		return sessionStorage.getItem('firstName');

	}
}