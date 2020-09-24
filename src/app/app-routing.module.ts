import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './core/home/home.component';
import {AuthComponent} from './core/auth/auth.component';
import {AuthProcessComponent} from './core/auth-process/auth-process.component';
import {AuthProcessGuard} from './guards/auth-process.guard';
import {AuthMissGuard} from './guards/auth-miss.guard';
import {ArtistPageComponent} from './core/artist-page/artist-page.component';
import {DashboardComponent} from './core/dashboard/dashboard.component';


export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth'
  },
  {
    path: 'home',
    pathMatch: 'full',
    component: HomeComponent,
    canActivate: [AuthMissGuard],
  },
  {
    path: 'auth',
    pathMatch: 'full',
    component: AuthComponent,
    canActivate: [AuthMissGuard]
  },
  {
    path: 'authorized',
    pathMatch: 'full',
    canActivate: [AuthProcessGuard],
    component: AuthProcessComponent
  },
  {
    path: '',
    canActivate: [AuthMissGuard],
    component: DashboardComponent,
    children: [
      {
        path: 'artists/:id',
        component: ArtistPageComponent
      }
    ]
  }
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes)
  ]
})

export class AppRoutingModule {
}
