import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MdCardModule, MdButtonModule, MdInputModule, MdIconModule } from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";
import { UsersComponent } from "./users.component";
import { UserComponent } from "./user.component";
import { UserListComponent } from "./user-list.component";
import { UserProfileComponent } from "./user.profile.component";
import { CKEditorModule } from "ng2-ckeditor";
import { BlogModule } from "../blogs/blog.module";

@NgModule({
	declarations: [
		UsersComponent,
		UserComponent,
		UserListComponent,
		UserProfileComponent
		

	],
	imports: [
		CommonModule,
		FormsModule,
		MdCardModule,
		MdButtonModule,
		MdInputModule,
		ReactiveFormsModule,
		CKEditorModule,
		MdIconModule,
		BlogModule
	]

})


export class UserModule{

}