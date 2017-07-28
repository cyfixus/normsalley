import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MdCardModule, MdButtonModule, MdInputModule, MdIconModule, MdSidenavModule } from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";
import { BlogsComponent } from "./blogs.component";
import { BlogListComponent } from "./blog-list.component";
import { BlogComponent } from "./blog.component";
import { BlogInputComponent } from "./blog-input.component";
import { CKEditorModule } from "ng2-ckeditor";
import { ReversePipe } from "../reverse.pipe";
import { blogRouting } from "./blog.routing";
import { FilterPipe } from "../filter.pipe";
@NgModule({
	declarations: [
		BlogsComponent,
		BlogListComponent,
		BlogComponent,
		BlogInputComponent,
		ReversePipe,
		FilterPipe

	],
	imports: [
		CommonModule,
		FormsModule,
		MdCardModule,
		MdButtonModule,
		MdInputModule,
		blogRouting,
		ReactiveFormsModule,
		CKEditorModule,
		MdIconModule,
		MdSidenavModule
	]

})


export class BlogModule{

}