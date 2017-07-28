export class User {
	email: string;
	password: string;
    userId?: string;
    firstName?: string;
    lastName?: string;

    constructor(email: string, password: string, userId?: string,  firstName?: string, lastName?: string) {
    	this.email = email;
    	this.password = password;
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}