import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddNewReimburstmentComponent } from './core/add-new-reimburstment/add-new-reimburstment.component';
import { LoginComponent } from './core/login/login.component';
import { DashboardComponent } from './core/dashboard/employee-dashboard/dashboard.component';
import { RegisterComponent } from './core/register/register.component';
import { TokenInterceptorService } from './interceptor/token-interceptor.service';
import { AdminDashboardComponent } from './core/dashboard/admin-dashboard/admin-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    AddNewReimburstmentComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    AdminDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
      
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
