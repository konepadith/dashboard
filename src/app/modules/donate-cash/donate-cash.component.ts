import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DashboardService } from '../dashboard.service';
import Swal from "sweetalert2";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-donate-cash',
  templateUrl: './donate-cash.component.html',
  styleUrls: ['./donate-cash.component.scss']
})
export class DonateCashComponent implements OnInit {
  displayedColumns: string[] = ['no','name','surname', 'email', 'donate_cash_bill', 'donate_cash_price','donate_cash_for'];
  dataSource : any;
  data:any=[]
  donate_cash_for:any[]=[]
  btn=false
  admin_info=JSON.parse(localStorage.getItem("user") || "[]")
  @ViewChild(MatPaginator,{static:true}) paginator!: MatPaginator;
  @ViewChild(MatTable,{static:true}) table!: MatTable<any>;
  constructor(private service : DashboardService,
    private fb:FormBuilder,
    private spinner : NgxSpinnerService) { }
    donateCash:any = FormGroup
  ngOnInit(): void {
    this.donateCash=this.fb.group({
      admin_id:[this.admin_info.data[0].admin_id,Validators.required],
      name:       [null,Validators.required],
      surname:       [null,Validators.required],
      dob:          [null,Validators.required],
      email:       [null,Validators.compose([Validators.required,Validators.email])],
      donate_cash_price:      [null,Validators.required],
      donate_cash_for:        [null,Validators.required],
    })
    this.service.data_donateCash().subscribe(response=>{
      this.data=response.data
      console.log(this.data)
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      })
  }

  get d() { return this.donateCash.controls; }

  donate(){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Donate Confirmation',
      text: "Amount:"+this.donateCash.value.donate_cash_price,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel!',
      reverseButtons: false
    }).then((result) => {

      if (result.isConfirmed) {
        this.spinner.show();

    this.service.donateCash(this.donateCash.value).subscribe(response=>{
      console.log(response)

      if (response.status ==1) {
        Swal.fire({
          icon: 'success',
          title: 'Email is sent',
          text: 'successfully',
          })
          this.donateCash.reset()
          this.spinner.hide();
          this.service.data_donateCash().subscribe(response=>{
            this.data=response.data
            console.log(this.data)
            this.dataSource = new MatTableDataSource(this.data);
            this.dataSource.paginator = this.paginator;
            })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Something Wrong',
          text: 'Try again',
          })
          this.spinner.hide();
      }


    })

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'You can decide again',
          'error'
        )
      }

    })
  }

  edit(data:any){

    this.donateCash=this.fb.group({
      donate_cash_id:[data.donate_cash_id,Validators.required],
      admin_id:[this.admin_info.data[0].admin_id,Validators.required],
      name:       [data.name,Validators.required],
      surname:       [data.surname,Validators.required],
      dob:          ['',Validators.required],
      email:       [data.email,Validators.compose([Validators.required,Validators.email])],
      donate_cash_price:      [data.donate_cash_price,Validators.required],
      donate_cash_for:        [data.donate_cash_for,Validators.required],
    })
    this.donateCash.get('dob').patchValue(this.formatDate(data.dob))
    this.btn=!this.btn
  }
  canceledit(){
    this.btn=!this.btn
    this.donateCash.reset()
  }

  private formatDate(date:any) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }
}
