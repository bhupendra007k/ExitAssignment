import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { RegisterComponent } from './core/register/register.component';
import { DashboardComponent } from './core/dashboard/employee-dashboard/dashboard.component';
import { AuthGuardService } from './services/guard/auth-guard.service';
import { AdminDashboardComponent } from './core/dashboard/admin-dashboard/admin-dashboard.component';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch:'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard/:id', component: DashboardComponent,canActivate:[AuthGuardService]},
  {path: 'admindashboard', component: AdminDashboardComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
