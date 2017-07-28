import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { MdSnackBar } from '@angular/material';
import { Message } from "./message.model";
import { ErrorService } from "../errors/error.service";

@Injectable()
export class MessageService {
    private messages: Message[] = [];
    messageIsEdit = new EventEmitter<Message>();

    constructor(private http: Http, private errorService: ErrorService, private snackBar: MdSnackBar) {}

    addMessage(message: Message) {
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = sessionStorage.getItem('token')
                      ? '?token=' + sessionStorage.getItem('token')
                      : '';
        return this.http.post('http://normsalley.com/message' + token, body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const message = new Message(
                    result.obj.title,
                    result.obj.content, 
                    result.obj.user.firstName,
                    result.obj._id,
                    result.obj.user._id);
                this.messages.push(message);
                this.openSnackBar(message.title, 'created');
                return message;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    getMessages() {
        return this.http.get('http://normsalley.com/message')
            .map((response: Response) => {
                const messages = response.json().obj;
                let transformedMessages: Message[] = [];
                for (let message of messages) {
                    transformedMessages.push(new Message(
                        message.title,
                        message.content, 
                        message.user.firstName, 
                        message._id, 
                        message.user._id)
                    );
                }
                this.messages = transformedMessages;
                return transformedMessages;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    editMessage(message: Message) {
        this.openSnackBar(message.title, 'open for editing');
        this.messageIsEdit.emit(message);
    }

    updateMessage(message: Message) {
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = sessionStorage.getItem('token')
                      ? '?token=' + sessionStorage.getItem('token')
                      : '';
                      this.openSnackBar(message.title, 'updated');
        return this.http.patch('http://normsalley.com/message/' + message.messageId + token, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    deleteMessage(message: Message) {
        this.messages.splice(this.messages.indexOf(message), 1);
        const token = sessionStorage.getItem('token')
                      ? '?token=' + sessionStorage.getItem('token')
                      : '';
                      this.openSnackBar(message.title, 'deleted');
        return this.http.delete('http://normsalley.com/message/' + message.messageId + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    openSnackBar(message : string, action: string) {
        this.snackBar.open(message, action, {
          duration: 1300,
        });
    }
}