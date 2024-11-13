import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { ReserveResourceComponent } from './pages/reserve-resource/reserve-resource.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ViewUsersReservationsComponent } from './pages/view-users-reservations/view-users-reservations.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    }, {
        path: "explore",
        component: ExploreComponent
    }, {
        path: "reserve",
        component: ReserveResourceComponent
    }, {
        path: "profile",
        component: UserProfileComponent
    }, {
        path: "reservations",
        component: ViewUsersReservationsComponent
    }, {
        path: "login",
        component: LoginComponent
    }, {
        path: "register",
        component: RegisterComponent
    }
];
