import { Routes } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { MainLayoutComponent } from "./layouts/main-layout/main-layout.component";

export const AppRoutes: Routes = [
  {
    path: "",
    component: MainLayoutComponent,
    loadChildren: () => import("./layouts/main-layout/main-layout.module").then(m => m.MainLayoutModule) 
  },
  {
    path: "user",
    component: AdminLayoutComponent,
    loadChildren: () => import("./layouts/admin-layout/admin-layout.module").then(m => m.AdminLayoutModule) 
  },
  {
    path: "**",
    redirectTo: ""
  }
];
