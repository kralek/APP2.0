import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from 'app/pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MainLayoutRoutes } from './main-layout.routing';
import { LandingPageComponent } from 'app/pages/landing-page/landing-page.component';
import { RegistrationComponent } from './../../pages/registration/registration.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MainLayoutRoutes),
    FormsModule,
    NgbModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoginComponent,
    LandingPageComponent,
    RegistrationComponent
  ],
  providers:[]
})

export class MainLayoutModule {}
