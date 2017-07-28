import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MdCardModule, MdButtonModule, MdInputModule } from "@angular/material";

import { MessagesComponent } from "./messages.component";
import { MessageListComponent } from "./message-list.component";
import { MessageComponent } from "./message.component";
import { MessageInputComponent } from "./message-input.component";

@NgModule({
	declarations: [
		MessagesComponent,
		MessageListComponent,
		MessageComponent,
		MessageInputComponent

	],
	imports: [
		CommonModule,
		FormsModule,
		MdCardModule,
		MdButtonModule,
		MdInputModule
	]


})


export class MessageModule{

}