import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Modal } from 'bootstrap';
import { FormGroup,FormControl,FormBuilder } from '@angular/forms';
import { ReimbursementService } from 'src/app/services/reimbursement/reimbursement.service';
import { Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  allReimbursements :any=[{email:null,receiptUrl:null}]
  searchText:string=""
  searchReimbursement:any
  testModal:Modal |undefined
  approveReimbursement:any
  approvedReimbursement:any
  Reimbursement:any=[]
  FormGroup:any
  helper= new JwtHelperService();
  userModelId:any;


  constructor(private reimbursementService:ReimbursementService,
    private authService: AuthService,
    private formBuilder:FormBuilder) { }

  email=()=>{
    let token=localStorage.getItem('token')
    let decodedToken=this.helper.decodeToken(token?.toString())
    return decodedToken.email;
  }


  ngOnInit(): void {
    this.reimbursementService.GetAllReimbursements().subscribe((res:any)=>{
      console.log(res);
      this.allReimbursements = res;
      console.log("From Admin", this.allReimbursements);
    })
    this.approveReimbursement = this.formBuilder.group({
      date: new FormControl('', Validators.required),
      reimbursementType: new FormControl('', Validators.required),
      requestedValue: new FormControl('', Validators.required),
      currency: new FormControl('', Validators.required),
      receiptUrl: new FormControl('', Validators.required),
      email: new FormControl(this.email()),
      requestPhase:new FormControl(''),
      receiptAttached:new FormControl(''),
      IsApprover: new FormControl(''),
      approvedValue: new FormControl('', Validators.required),
      internalNotes: new FormControl('', Validators.required),
      reimbursementId:new FormControl(this.Reimbursement['reimbursementId']),
      requestedBy:new FormControl(this.Reimbursement['email']),
      userModelId:new FormControl('')
    })
  }



  save() {
    this.testModal?.toggle();
  }
  open(id:any) {
    var el_testModal = document.getElementById('testModal');
    if (el_testModal) {
      this.testModal = new Modal(el_testModal, {
        keyboard: false
      });
    }
    this.testModal?.show();
    this.reimbursementService.GetReimbursementById(id).subscribe((res):any=>{
      console.log(res);
      this.approveReimbursement=this.formBuilder.group({
        date: new FormControl(res['date'], Validators.required),
        reimbursementType: new FormControl(res['reimbursementType'], Validators.required),
        requestedValue: new FormControl(res['requestedValue'], Validators.required),
        currency: new FormControl(res['currency'], Validators.required),
        receiptUrl: new FormControl(res['receiptUrl'], Validators.required),
        requestPhase:new FormControl('Approved'),
        IsApprover: new FormControl(this.email()),
        approvedValue: new FormControl('', Validators.required),
        internalNotes: new FormControl('', Validators.required),
        reimbursementId:new FormControl(res['reimbursementId']),
        email:new FormControl(res['email']),
        userModelId:new FormControl(res['userModelId'])
        
    })
    })
 
  }
  

  
  DeclineReimbursement(id:any){
    console.log(this.allReimbursements);
    const decId=()=>{
      for (let i=0; i < this.allReimbursements.length; i++) {
        if (this.allReimbursements[i].reimbursementId == id) {
          this.allReimbursements.splice(i, 1);
          console.log(id);
          return id;
        }
      }}
    this.reimbursementService.DeclineReimbursements(decId()).subscribe((res:any)=>{
      console.log(res);
      })
  }

  ApproveReimbursement(id:any){
    
    const approveId=()=>{
      for (let i=0; i < this.allReimbursements.length; i++) {
        if (this.allReimbursements[i].reimbursementId == id) {
          this.allReimbursements.splice(i, 1);
          console.log(id);
          return id;
        }
      }}
      this.reimbursementService.GetApprovedReimbursements(approveId()).subscribe((res:any)=>{
      console.log(res);
    })
  }

  PostApprovedReimbursement(){
    
    let reimburesmentId=this.approveReimbursement.value.reimbursementId
    console.log(this.approveReimbursement.value);
    this.reimbursementService.ApprovedReimbursements(reimburesmentId,this.approveReimbursement.value).subscribe((res:any)=>{
      console.log(res);
      
    })

   }

   
  logout() {
    this.authService.logout();
  }

}
