import { Multiplication } from './../../pages/games/multiplication/multiplication.component';
import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { GamesComponent } from '../../pages/games/games.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user',           component: UserComponent },
    { path: 'games',          component: GamesComponent, children: [{
      path: 'multiplication', component: Multiplication
    }] }
];
