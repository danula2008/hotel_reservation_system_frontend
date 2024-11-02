import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { ReserveComponent } from './pages/reserve/reserve.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    }, {
        path: "explore",
        component: ExploreComponent
    }, {
        path: "reserve",
        component: ReserveComponent
    }
];
