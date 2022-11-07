import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/register/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  employeeRegister: any = FormGroup

  constructor(private formBuilder: FormBuilder, private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    
    this.employeeRegister = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$')]),
      confirmpassword: new FormControl('', [Validators.required]),
      fullname: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      pan: new FormControl('', [Validators.required,
      Validators.pattern('^[A-Za-z]{5}[0-9]{4}[A-Za-z]$')]),
      bank: new FormControl('', Validators.required),
      bankaccountno: new FormControl('', [
        Validators.required,
        Validators.maxLength(12),
        Validators.minLength(12),
        Validators.pattern('^[0-11]*$')
      ])
    },
   
    {
      validators: this.MustMatch('password', 'confirmpassword')
    }
    
    )

  }
  get email() {
    return this.employeeRegister.get('email');
  }
  get password() {
    return this.employeeRegister.get('password');
  }
  get confirmpassword() {
    return this.employeeRegister.get('retypepassword');
  }
  get fullname() {
    return this.employeeRegister.get('fullname');
  }
  get pan() {
    return this.employeeRegister.get('pan');
  }
  get bank() {
    return this.employeeRegister.get('bank');
  }
  get bankaccountno() {
    return this.employeeRegister.get('bankaccountno');
  }

  MustMatch(controlName: string, matchingControlName: string){
    return(formGroup: FormGroup) =>{
    
      const control = formGroup.controls[controlName]
      const matchingControl = formGroup.controls[matchingControlName];
      if(matchingControl.errors && !matchingControl.errors['MustMatch']){
        return
      }
      if(control.value !== matchingControl.value){
        matchingControl.setErrors({MustMatch: true});
      }
      else{
        matchingControl.setErrors(null);
      }
    }

  }

  registerUser() {
    console.log(this.employeeRegister.value);

    this.accountService.Signup(this.employeeRegister.value).subscribe((res = (response: any) => JSON.parse(response)) => {
      this.router.navigate(['']);
      console.log(">>>", res);

      if (res) {
        alert('user created');
        this.employeeRegister.reset();
      }
      else {
        alert("user already exist");
      }

    });

  }


}
