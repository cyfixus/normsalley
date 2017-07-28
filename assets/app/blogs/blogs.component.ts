import { Component, OnInit } from "@angular/core";
import { BlogService } from "./blog.service";
import { MdSidenav, MdSidenavContainer } from "@angular/material";

@Component({
    selector: 'app-blogs',
    templateUrl: './blogs.component.html'
})
export class BlogsComponent implements OnInit {
	edit = false;
	constructor(private blogService: BlogService) {}

	ngOnInit() {

    	this.blogService.blogEditing.subscribe(
            (edit: boolean) => this.edit = edit
        );
    }
}