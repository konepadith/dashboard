import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  Login:any= FormGroup;
  constructor(private service : DashboardService,
              private fb:FormBuilder,
              private router:Router) { }

  ngOnInit(): void {
    if (JSON.parse(localStorage.getItem("user") || "[]").status==1) {
      this.router.navigate([''])
    }
    this.Login = this.fb.group({
      admin_email: [null,Validators.compose([Validators.required,Validators.email])],
      admin_password:[null,Validators.compose([Validators.required,Validators.minLength(8)])]
    })
  }

  submit_login(){
    this.service.login(this.Login.value).subscribe(response=>{
      if (response.status == 1) {
          localStorage.setItem("user",JSON.stringify(response))
          this.router.navigate([''])
          // this.user_status = JSON.parse(localStorage.getItem("user") || "[]").status;
          // this.user_info =JSON.parse(localStorage.getItem("user") || "[]")

      } else {
        localStorage.clear()
        // this.user_status=0
        // console.log("fail",this.user_status)
        alert("Fail")
      }
      console.log(response)
    })
  }
}
