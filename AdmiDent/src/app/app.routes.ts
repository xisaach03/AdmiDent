import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/paths/welcome/welcome.component';
import { LoginComponent } from './components/paths/login/login.component';
import { RegisterComponent } from './components/paths/register/register.component';
import { GalleryComponent } from './components/paths/home/gallery/gallery.component';
import { HomeComponent } from './components/paths/home/home.component';
import { ScheduleComponent } from './components/paths/home/schedule/schedule.component';
import { LADPatiensSumComponent } from './components/paths/home/ladpatiens-sum/ladpatiens-sum.component';
import { LADPatiensTreatmentComponent } from './components/paths/home/ladpatiens-treatment/ladpatiens-treatment.component';


export const routes: Routes = [
    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    { path: 'welcome', component: WelcomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent },
    { path: 'summary', component: LADPatiensSumComponent },
    { path: 'treatment', component: LADPatiensTreatmentComponent},
    { path: 'gallery' , component: GalleryComponent },
    { path: 'schedule' , component: ScheduleComponent },
    
    //{path: '**', component: NotFoundComponent} 
]
