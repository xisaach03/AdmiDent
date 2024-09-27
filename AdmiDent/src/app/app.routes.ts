import { Routes } from '@angular/router';
import { LADPatiensSumComponent } from './components/layout/ladpatiens-sum/ladpatiens-sum.component';
import { AppComponent } from './app.component';
import { LADPatiensTreatmentComponent } from './components/layout/ladpatiens-treatment/ladpatiens-treatment.component';

export const routes: Routes = [
    {path: '', component: AppComponent},
    {path: 'home/summary', component: LADPatiensSumComponent},
    {path: 'home/treatment', component: LADPatiensTreatmentComponent}
    //{path: '**', component: NotFoundComponent}
];
