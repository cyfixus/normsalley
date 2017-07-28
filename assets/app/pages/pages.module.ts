

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { MdCardModule, MdButtonModule, MdInputModule, MdGridListModule, MdIconModule } from "@angular/material";

import { LandingComponent } from "./landing.component";

import { IdeasComponent } from "./ideas.component";
import { ProjectsComponent } from "./projects.component"; 
import { ArtComponent } from "./art.component";
import { DevComponent } from "./dev.component";
import { ListsComponent } from "./lists.component";

import { pagesRouting } from "./pages.routing";


@NgModule({
	declarations: [
		LandingComponent,
		IdeasComponent,
		ProjectsComponent,
		ArtComponent,
		DevComponent,
		ListsComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		pagesRouting,
		MdButtonModule,
		MdCardModule,
		MdInputModule,
		MdGridListModule,
		MdIconModule
	]


})


export class PagesModule{

}