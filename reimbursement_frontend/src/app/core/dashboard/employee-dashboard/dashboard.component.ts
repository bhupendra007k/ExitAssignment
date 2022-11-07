import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms'
import { Modal } from 'bootstrap';
import { ReimbursementService } from 'src/app/services/reimbursement/reimbursement.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  Reimbursements: any = [];
  currentEmployee: any | undefined;
  updateUserReimbursements: any = FormGroup;
  reimbursementId: any;
  receiptAttached: any;
  addUserReimbursement: any = FormGroup;
  testModal: Modal | undefined;
  editModal: Modal | undefined;
  helper = new JwtHelperService();
  employee: any = { email: null };
  requestPhase: any = "Pending";


  constructor(private reimbursementService: ReimbursementService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
  ) { }

  email = () => {
    let token = localStorage.getItem('token')
    let decodedToken = this.helper.decodeToken(token?.toString())
    return decodedToken.email;
  }

  ngOnInit(): void {
    this.addUserReimbursement = this.formBuilder.group({
      date: new FormControl('', Validators.required),
      reimbursementType: new FormControl('', Validators.required),
      requestedValue: new FormControl('', Validators.required),
      currency: new FormControl('', Validators.required),
      receiptUrl: new FormControl('', Validators.required),
      email: new FormControl(this.email()),
      requestPhase: new FormControl(this.requestPhase),
      receiptAttached: new FormControl(this.receiptAttacher())

    })


    this.reimbursementService.getReimbursements(this.router.snapshot.params['id']).subscribe((res: any) => {
      this.Reimbursements = res;

    })
    this.updateUserReimbursements = this.formBuilder.group({
      date: new FormControl('', Validators.required),
      reimbursementType: new FormControl('', Validators.required),
      requestedValue: new FormControl('', Validators.required),
      currency: new FormControl('', Validators.required),
      receiptUrl: new FormControl('', Validators.required),
      reimbursementId: new FormControl(''),
      requestPhase:new FormControl('')

    })

  }

  save() {
    this.testModal?.toggle();
  }
  open() {
    var el_testModal = document.getElementById('testModal');
    if (el_testModal) {
      this.testModal = new Modal(el_testModal, {
        keyboard: false
      });
    }
    this.testModal?.show();
  }
  editSave() {
    this.editModal?.toggle();
  }
  editopen = (id: any) => {
    var el_editModal = document.getElementById('editModal');
    if (el_editModal) {
      this.editModal = new Modal(el_editModal, {
        keyboard: false
      });
    }
    this.editModal?.show();
    this.updateUserReimbursements.value.reimbursementId = id;
  }

  update = () => {
    for (let i = 0; i < this.Reimbursements.length; i++) {
      if (this.Reimbursements[i].reimbursementId == this.updateUserReimbursements.value.reimbursementId) {
        this.reimbursementService.AddReimbursement(this.updateUserReimbursements.value).subscribe((res: any) => {
          if (res) {
            this.ngOnInit();
            this.save();
          }
        })
      }
    }
  }

  get date() {
    return this.addUserReimbursement.get('date');
  }
  get reimbursementtype() {
    return this.addUserReimbursement.get('reimbursementtype');
  }
  get requestedvalue() {
    return this.addUserReimbursement.get('requestedvalue');
  }
  get currency() {
    return this.addUserReimbursement.get('currency');
  }
  get receipt() {
    return this.addUserReimbursement.get('receipt');
  }


  addReimbursement = () => {


    this.reimbursementService.AddReimbursement(this.addUserReimbursement.value).subscribe((res: any) => {
      console.log(this.addUserReimbursement.value);
      if (res) {
        // (res.receiptUrl) ? this.addUserReimbursement.receiptAttached = "Yes" : this.addUserReimbursement.receiptAttached = "No"
        this.addUserReimbursement.reset();
        this.ngOnInit();
        this.save();
      }
      this.reimbursementId = res.reimbursementId

      return res.reimbursementId;
    })
  }
  receiptAttacher = () => {
    console.log(this.addUserReimbursement.receiptUrl);

    if (!this.addUserReimbursement.receiptUrl) {
      this.addUserReimbursement.receiptAttached = "yes"
      return this.addUserReimbursement.receiptAttached
    }
    else if (this.addUserReimbursement.receiptUrl) {
      this.addUserReimbursement.receiptAttached = "No"
      return this.addUserReimbursement.receiptAttached

    }
  }

  deleteReimbursement(id: any) {
    let i = 0;
    const delId = () => {
      for (; i < this.Reimbursements.length; i++) {
        if (this.Reimbursements[i].reimbursementId == id) {
          this.Reimbursements.splice(i, 1);
          console.log(id);
          return id;
        }
      }
    }
    this.reimbursementService.DeleteReimbursement(delId()).subscribe((res: any) => { console.log(res); })
  }


  logout() {
    this.authService.logout();
  }
}





