import { Multiplication } from './../../pages/games/multiplication/multiplication.component';
import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { GamesComponent } from '../../pages/games/games.component';
import { CanActivateAdminLayout } from 'app/guards/can-active-in-admin-layout';
import { CanActivateAsAdmin } from 'app/guards/can-active-as-admin';

export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [CanActivateAdminLayout, CanActivateAsAdmin] },
  { path: 'user', component: UserComponent, canActivate: [CanActivateAdminLayout] },
  {
    path: 'games',
    component: GamesComponent,
    canActivate: [CanActivateAdminLayout],
    children: [
      {
        path: 'multiplication',
        component: Multiplication, 
        canActivate: [CanActivateAdminLayout]
      }
    ]
  },
  { path: '*', redirectTo: 'dashboard' },
];
