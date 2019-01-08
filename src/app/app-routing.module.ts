import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { NotLoginComponent } from './components/not-login/not-login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { SidebarcoachComponent } from './components/sidebarcoach/sidebarcoach.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AuthGuard } from './auth.guard';
import { Auth2Guard } from './auth2.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'not-login', component: NotLoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'coach', canActivate : [Auth2Guard], component: SidebarcoachComponent},
  {path: 'admin', canActivate : [AuthGuard], component: SidebarComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
