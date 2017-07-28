import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from "@angular/forms";



import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from "@angular/http";
import { MdCardModule, MdButtonModule, MdToolbarModule, MdMenuModule,
 MdIconModule, MdSnackBarModule, MdProgressSpinnerModule, MdButtonToggleModule,
 MdDialogModule, MdGridListModule, MdSidenavModule, MdInputModule } from '@angular/material';
import { AppComponent } from "./app.component";
import { AuthenticationComponent } from "./auth/authentication.component";
import { AuthService } from "./auth/auth.service";
import { HeaderComponent } from "./header.component";
import { routing } from "./app.routing";
import { ErrorComponent } from "./errors/error.component";
import { ErrorService } from "./errors/error.service";
import { BlogService } from "./blogs/blog.service";
import { MessageService } from "./messages/message.service";
import { MessageModule } from "./messages/message.module";
import { BlogModule } from "./blogs/blog.module";
import { PagesModule } from "./pages/pages.module";

import { TaToolbarService } from "./taToolbar.service";
import { CKEditorModule } from 'ng2-ckeditor';
import { ConfirmDeleteDialog } from "./confirmdelete.dialog";
import { UserModule } from "./users/user.module";
import { UserService } from "./users/user.service";

@NgModule({
    declarations: [
        AppComponent,
        AuthenticationComponent,
        HeaderComponent,
        ErrorComponent,
        ConfirmDeleteDialog
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        routing,
        HttpModule,
        MessageModule,
        BlogModule,
        PagesModule,
        MdCardModule,
        MdButtonModule,
        MdToolbarModule,
        MdMenuModule,
        MdIconModule,
        MdSnackBarModule,
        MdProgressSpinnerModule,
        MdButtonToggleModule,
        CKEditorModule,
        MdDialogModule,
        UserModule,
        MdGridListModule,
        MdSidenavModule,
        ReactiveFormsModule,
        MdInputModule
    ],

    entryComponents: [ConfirmDeleteDialog],
    providers: [AuthService, ErrorService, BlogService, MessageService, TaToolbarService, UserService],
    bootstrap: [AppComponent]
})
export class AppModule {

}