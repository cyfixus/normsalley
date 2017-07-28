import { Routes, RouterModule } from "@angular/router";

import { BlogInputComponent } from "./blog-input.component";
import { BlogsComponent } from "./blogs.component"

export const BLOG_ROUTES: Routes = [
    { path: '', redirectTo: 'blogs', pathMatch: 'full' },
    { path: 'blogs', component: BlogsComponent },
    { path: 'new', component: BlogInputComponent }
];

export const blogRouting = RouterModule.forChild(BLOG_ROUTES);