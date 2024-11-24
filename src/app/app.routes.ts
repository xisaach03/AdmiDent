import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { WelcomeComponent } from './components/paths/welcome/welcome.component';
import { LoginComponent } from './components/paths/login/login.component';
import { RegisterComponent } from './components/paths/register/register.component';
import { GalleryComponent } from './components/paths/home/gallery/gallery.component';
import { HomeComponent } from './components/paths/home/home.component';
import { ScheduleComponent } from './components/paths/home/schedule/schedule.component';
import { LADPatiensSumComponent } from './components/paths/home/ladpatiens-sum/ladpatiens-sum.component';
import { LADPatiensTreatmentComponent } from './components/paths/home/ladpatiens-treatment/ladpatiens-treatment.component';
import { authGuard } from './guards/auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';


export const routes: Routes = [
    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    { path: 'welcome', component: WelcomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent , canActivate : [authGuard]},
    { path: 'summary', component: LADPatiensSumComponent, canActivate : [authGuard] },
    { path: 'treatment', component: LADPatiensTreatmentComponent , canActivate : [authGuard]},
    { path: 'gallery' , component: GalleryComponent , canActivate : [authGuard] },
    { path: 'schedule' , component: ScheduleComponent , canActivate : [authGuard]},
    {path: '**', component: NotFoundComponent} 
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }