import { Routes } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { MainLayoutComponent } from "./layouts/main-layout/main-layout.component";

export const AppRoutes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
  {
    path: "",
    component: MainLayoutComponent,
    children: [
      {
        path: "",
        loadChildren:
          "./layouts/main-layout/main-layout.module#MainLayoutModule"
      }
    ]
  },
  {
    path: "user",
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        loadChildren:
          "./layouts/admin-layout/admin-layout.module#AdminLayoutModule"
      }
    ]
  },
  {
    path: "**",
    redirectTo: "dashboard"
  }
];
