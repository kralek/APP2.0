import { Routes } from '@angular/router';

import { LoginComponent } from 'app/pages/login/login.component';
import { LandingPageComponent } from 'app/pages/landing-page/landing-page.component';
import { RegistrationComponent } from 'app/pages/registration/registration.component';

export const MainLayoutRoutes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
];
