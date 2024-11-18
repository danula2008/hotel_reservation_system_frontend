import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { ReserveResourceComponent } from './pages/reserve-resource/reserve-resource.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ViewUsersReservationsComponent } from './pages/view-users-reservations/view-users-reservations.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { ManageRoomsComponent } from '../app/pages/admin/manage-rooms/manage-rooms.component';
import { OverviewComponent } from '../app/pages/admin/overview/overview.component';
import { ManageHallsComponent } from './pages/admin/manage-halls/manage-halls.component';
import { ManageDopComponent } from './pages/admin/manage-dop/manage-dop.component';
import { ManageUserComponent } from './pages/admin/manage-user/manage-user.component';
import { ManageCustomerComponent } from './pages/admin/manage-customer/manage-customer.component';

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
    }, {
        path: "admin",
        component: DashboardComponent,
        children: [
            {
                path: '',
                component: OverviewComponent
            },
            {
                path: "rooms",
                component: ManageRoomsComponent
            }, {
                path: "halls",
                component: ManageHallsComponent
            }, {
                path: "day-out-packages",
                component: ManageDopComponent
            }, {
                path: "users",
                component: ManageUserComponent
            }, {
                path: "customers",
                component: ManageCustomerComponent
            }
        ]
    }
];
