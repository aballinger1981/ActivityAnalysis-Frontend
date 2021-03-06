import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../login/login.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { AuthGuardService } from '../auth-guard.service';
import { AuthService } from '../auth.service';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes),
  ],
  declarations: [],
  exports: [
    RouterModule
  ],
  providers: [ AuthGuardService, AuthService ]
})
export class AppRoutingModule { }
