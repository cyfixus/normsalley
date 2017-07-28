import { Component, OnInit } from "@angular/core";

import { Blog } from "./blog.model";
import { BlogService } from "./blog.service";

@Component({
    selector: 'app-blog-list',
    templateUrl: './blog-list.component.html'
})
export class BlogListComponent implements OnInit {
    filterBy = 'all';
    blogs: Blog[];

    constructor(private blogService: BlogService) {}

    ngOnInit() {
        this.blogService.getBlogs()
            .subscribe(
                (blogs: Blog[]) => {
                    this.blogs = blogs;
             });
        this.blogService.filterChosen
            .subscribe(
                (filterBy: string) => {
                    this.filterBy = filterBy;
            });
    }
}