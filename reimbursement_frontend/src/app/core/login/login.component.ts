import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/register/account.service';
import { AuthService } from 'src/app/services/auth/auth.service';

import { DashboardComponent } from '../dashboard/employee-dashboard/dashboard.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  employeeLogin: any = FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeLogin = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', Validators.required),
    });
  }
  get email() {
    return this.employeeLogin.get('email');
  }
  get password() {
    return this.employeeLogin.get('password');
  }
  getFormData() {
    this.authService.Login(this.employeeLogin.value).subscribe((response: any) => {
      console.log('>>>', response);
      if (response) {
        alert('login Successful');
        this.employeeLogin.reset();
        this.router.navigate([`dashboard/${response.id}`]);
        // localStorage.setItem('token',response.jwtToken)
      } 
      else {
        alert("Invalid Email or password.");
      }
    });
  }
} 
