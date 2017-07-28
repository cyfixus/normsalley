import { Component, Input } from "@angular/core";
import { Blog } from "./blog.model";
import { BlogService } from "./blog.service";
import { MdDialog, MdDialogRef } from "@angular/material";
import { ConfirmDeleteDialog } from "../confirmdelete.dialog";


@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html'
})
export class BlogComponent {
    @Input() blog: Blog;
    selectedOption: string;

    constructor(private blogService: BlogService, public dialog: MdDialog) {}

    onEdit() {
        console.log(this.blog);
        this.blogService.editTrue();
        this.blogService.editBlog(this.blog);
    }

    confirmDelete(){
        let dialogRef = this.dialog.open(ConfirmDeleteDialog);
        dialogRef.afterClosed().subscribe(result => {
            this.selectedOption = result;
            this.onDelete(this.selectedOption);
        });
    }

    onDelete(selectedOption: string) {
        console.log(selectedOption);
        if(selectedOption == 'yes'){
            this.blogService.deleteBlog(this.blog)
                .subscribe(
                    result => console.log(result)
                );
            }
    }

    belongsToUser(){
        return sessionStorage.getItem('userId') == this.blog.userId;
    }
    getUserAvatar(){
        return 'http://normsalley.com/ico.png';
    }

    isLoggedIn(){
        return this.blogService.isLoggedIn();
    }

}
