import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLoggedInGuard } from './guards/is-logged-in.guard';
import { LoginComponent } from './login/login.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  {
    path: 'map', component: MapComponent
    // loadComponent: async () =>
    //   (await import('./map/map.component')).MapComponent,
    // canActivate: [IsLoggedInGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // {
  //   path: 'no-access',
  //   loadComponent: async() =>
  //   (await import('./no-access/no-access.component')).NoAccessComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
