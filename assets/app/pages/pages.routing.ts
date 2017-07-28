import { Routes, RouterModule } from "@angular/router";

// 
import { LandingComponent } from "./landing.component";


import { IdeasComponent } from "./ideas.component";
import { ProjectsComponent } from "./projects.component"
import { ArtComponent } from "./art.component"
import { DevComponent } from "./dev.component";
import { ListsComponent } from "./lists.component";



export const PAGES_ROUTES: Routes = [
    { path: '', redirectTo: 'landing', pathMatch: 'full' },
    { path: 'landing', component: LandingComponent },
    // 
    { path: 'ideas', component: IdeasComponent },
    { path: 'projects', component: ProjectsComponent },
    { path: 'art', component: ArtComponent },
    { path: 'dev', component: DevComponent },
    { path: 'lists', component: ListsComponent },

];

export const pagesRouting = RouterModule.forChild(PAGES_ROUTES);