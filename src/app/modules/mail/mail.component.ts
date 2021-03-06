import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from "sweetalert2";
import { NgxSpinnerService } from "ngx-spinner";
import { DashboardService } from '../dashboard.service';
@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.scss']
})
export class MailComponent implements OnInit {
  mail:any = FormGroup;
  receivemail:any
  p: number = 1;

  admin_info=JSON.parse(localStorage.getItem("user") || "[]")
  constructor(private fb:FormBuilder,private spinner : NgxSpinnerService,private service:DashboardService) { }

  ngOnInit(): void {
    this.mail = this.fb.group({

      admin_id:[this.admin_info.data[0].admin_id,Validators.required],
      emailto:[null,Validators.compose([Validators.required,Validators.email])],
      subject:[null,Validators.required],
      text:[null,Validators.required]
    })
    this.service.receive().subscribe(response=>{
      console.log(response.data)
      this.receivemail=response.data
    })
  }
  get m() { return this.mail.controls; }

  send(){
    this.spinner.show();
    if (this.mail.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Form is Invalid',
        text: 'Please input all Fill',
        })
        this.spinner.hide();
    }else{
      this.service.mail(this.mail.value).subscribe(response=>{
        if (response.status == 1) {
          Swal.fire({
            icon: 'success',
            title: 'Email is sent',
            text: 'successfully',
            })
            this.mail.reset()
            this.spinner.hide();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Something Wrong',
            text: 'Try again',
            })
            this.spinner.hide();
        }
      })
    }
  }
  inputFocus(email:string){
    console.log(email)
    this.mail.controls['emailto'].setValue(email);

  }
  read(receivemail_id:number){
    this.service.readmail(receivemail_id).subscribe(response=>{
      console.log(response)
    })
  }
}
