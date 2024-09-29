import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/paths/welcome/welcome.component';
import { LoginComponent } from './components/paths/login/login.component';
import { RegisterComponent } from './components/paths/register/register.component';

export const routes: Routes = [
    { path: '', redirectTo: 'register', pathMatch: 'full'},
    { path: 'welcome', component: WelcomeComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},

];
