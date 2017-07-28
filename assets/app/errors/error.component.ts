import { Component, OnInit } from '@angular/core';
import { Error } from "./error.model";
import { ErrorService } from "./error.service";
import { MdSnackBar } from "@angular/material";

@Component({
	selector: 'app-error',
	templateUrl: './error.component.html',
	styles: [`
		.backdrop{
			background-color: rgba(0, 0, 0, 0.6);
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}
	`]
})

export class ErrorComponent implements OnInit{
	error: Error;
	display = 'none';
	errorMessage = "error";
	constructor(private errorService: ErrorService, private snackBar: MdSnackBar){}

	onErrorHandled(){
		this.display = 'none';
	}

	ngOnInit(){
		
		this.errorService.errorOccurred
			.subscribe(
				(error: Error) => {
					this.error = error;
					switch (error.message) {
						case "Blog validation failed: content: Path `content` is required.":
							this.errorMessage = "Content is required to post!"
							break;
						case "Blog validation failed: content: title: Path `title` is required.":
							this.errorMessage = "A Title is required to post!"
							break;
						case "Blog validation failed: content: Path `content` is required., title: Path `title` is required.":
							this.errorMessage = "A Title and Content are required to post!"
							break;
						case "Message validation failed: content: Path `content` is required.":
							this.errorMessage = "Content is required to post!"
							break;
						case "Message validation failed: content: title: Path `title` is required.":
							this.errorMessage = "A Title is required to post!"
							break;
						case "Message validation failed: content: Path `content` is required., title: Path `title` is required.":
							this.errorMessage = "A Title and Content are required to post!"
							break;
						case "jwt expired":
							this.errorMessage = "You don't have permission to do that."
							break;
						
						default:
							// code...
							break;
					}
					this.openSnackBar(this.errorMessage, 'x');
				}
			);
	}

	openSnackBar(message : string, title: string) {
        this.snackBar.open(message, title, {
          duration: 1300,
        });
    }

}