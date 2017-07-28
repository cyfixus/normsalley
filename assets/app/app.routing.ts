import { Routes, RouterModule } from "@angular/router";

import { MessagesComponent } from "./messages/messages.component";
import { BlogsComponent } from "./blogs/blogs.component";
import { AuthenticationComponent } from "./auth/authentication.component";
import { UsersComponent } from "./users/users.component";
import { BlogInputComponent } from "./blogs/blog-input.component";

import { UserProfileComponent } from "./users/user.profile.component";



const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/pages', pathMatch: 'full' },
    { path: 'messages', component: MessagesComponent },
    { path: 'users', component: UsersComponent },
    { path: 'profile', component: UserProfileComponent },
    { path: 'auth', component: AuthenticationComponent, loadChildren: './auth/auth.module#AuthModule' },
    { path: 'blogs', component: BlogsComponent },
    { path: 'blogs/new', component: BlogInputComponent }

];

export const routing = RouterModule.forRoot(APP_ROUTES);