import { Routes } from '@angular/router';
import { GalleryComponent } from './components/paths/home/gallery/gallery.component';
import { HomeComponent } from './components/paths/home/home.component';
import { ScheduleComponent } from './components/paths/home/schedule/schedule.component';


export const routes: Routes = [
    {path : 'home'  , component : HomeComponent , children : [
        { path : 'gallery' , component: GalleryComponent},
        { path : 'schedule' , component: ScheduleComponent}
    ]
    }
];
