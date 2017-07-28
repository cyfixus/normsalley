import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MessageService } from "./message.service";
import { Message } from "./message.model";
import { MdSnackBar } from "@angular/material";

@Component({
    selector: 'app-message-input',
    templateUrl: './message-input.component.html'
})
export class MessageInputComponent implements OnInit {
    message: Message;

    constructor(private messageService: MessageService, private snackBar: MdSnackBar) {}

    onSubmit(form: NgForm) {
        if (this.message) {
            // Edit
            this.message.title = form.value.title;
            this.message.content = form.value.content;
            this.messageService.updateMessage(this.message)
                .subscribe(
                    result => console.log(result)
                );
            this.message = null;
        } else {
            // Create
            const message = new Message(form.value.title, form.value.content, form.value.userName);
            
            this.messageService.addMessage(message)
                .subscribe(
                    data => console.log(data),
                    error => console.error(error)
                );

        }
        form.resetForm();
    }

    onClear(form: NgForm) {
        this.openSnackBar('form cleared', 'x');
        this.message = null;
        form.resetForm();
    }

    ngOnInit() {
        this.messageService.messageIsEdit.subscribe(
            (message: Message) => this.message = message
        );
    }

    openSnackBar(message : string, action: string) {
        this.snackBar.open(message, action, {
          duration: 1300,
        });
    }
}