import { Multiplication } from './../../pages/games/multiplication/multiplication.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent }       from '../../pages/dashboard/dashboard.component';
import { UserComponent }            from '../../pages/user/user.component';
import { GamesComponent } from './../../pages/games/games.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from 'app/pages/login/login.component';
import { CanActivateAdminLayout } from 'app/guards/canActiveInAdminLayout';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    GamesComponent,
    Multiplication,
    LoginComponent
  ],
  providers:[CanActivateAdminLayout]
})

export class AdminLayoutModule {}
