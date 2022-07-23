import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatSort, Sort} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  displayedColumns: string[] = ['no', 'user_name', 'dog_name', 'form_status','action'];
  data:any=[]
  dataSource : any;
  formList:any=[]
  formdecide:any=FormGroup;
  admin_info=JSON.parse(localStorage.getItem("user") || "[]")
  @ViewChild(MatPaginator,{static:true}) paginator!: MatPaginator;
  @ViewChild(MatTable,{static:true}) table!: MatTable<any>;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private service : DashboardService,
    private fb:FormBuilder,
    private router:Router,
    private _liveAnnouncer: LiveAnnouncer,
    private spinner : NgxSpinnerService) { }

    ngAfterViewInit() {
      this.dataSource.sort = this.sort;
    }
  ngOnInit(): void {
    this.service.show_form().subscribe(response=>{
      console.log(response)
      this.data=response.data
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      })
      this.dataSource.sort = this.sort;
  }

    /** Announce the change in sort state for assistive technology. */
    announceSortChange(sortState: any) {
      // This example uses English messages. If your application supports
      // multiple language, you would internationalize these strings.
      // Furthermore, you can customize the message to add additional
      // details about the values being sorted.
      if (sortState.direction) {
        this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      } else {
        this._liveAnnouncer.announce('Sorting cleared');
      }
    }

  read(data:any){
    // console.log(data)
    this.formList=[data]
  }
  accept(data:any,status:any){

    this.formdecide=this.fb.group({
      admin_id:[this.admin_info.data[0].admin_id,Validators.required],
      dog_id:     [data.dog_id,Validators.required],
      user_email: [data.user_email,Validators.required],
      form_id:    [data.form_id,Validators.required],
      form_status:[status,Validators.required],
    })
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'do you accept this form?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel!',
      reverseButtons: false
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(this.formdecide.value)
        this.spinner.show();
        this.service.divided_form(this.formdecide.value).subscribe(response=>{
          console.log(response)

          if (response.status==1) {
            this.service.show_form().subscribe(response=>{
              console.log(response)
              this.data=response.data
              this.dataSource = new MatTableDataSource(this.data);
              this.dataSource.paginator = this.paginator;
              this.spinner.hide();
              })
            swalWithBootstrapButtons.fire(
              'Accept!',
              'This form has been accepted.',
              'success'
            )

          } else {
            this.spinner.hide();
            swalWithBootstrapButtons.fire(
              'Errors!',
              'Something went wrong.',
              'error'
            )
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
  decline(data:any,status:any){
    this.formdecide=this.fb.group({
      admin_id:[this.admin_info.data[0].admin_id,Validators.required],
      dog_id:     [data.dog_id,Validators.required],
      user_email: [data.user_email,Validators.required],
      form_id:    [data.form_id,Validators.required],
      form_status:[status,Validators.required],
    })
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'do you delince this form?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel!',
      reverseButtons: false
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(this.formdecide.value)
        this.spinner.show();
        this.service.divided_form(this.formdecide.value).subscribe(response=>{
          console.log(response)
          if (response.status==1) {
            this.service.show_form().subscribe(response=>{
              console.log(response)
              this.data=response.data
              this.dataSource = new MatTableDataSource(this.data);
              this.dataSource.paginator = this.paginator;
              this.spinner.hide();
              })
            swalWithBootstrapButtons.fire(
              'Decline!',
              'This form has been decline.',
              'warning'
            )

          } else {
            this.spinner.hide();
            swalWithBootstrapButtons.fire(
              'Errors!',
              'Something went wrong.',
              'error'
            )
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
purchaes(data:any,status:any){
  console.log()
  this.formdecide=this.fb.group({
    admin_id:[this.admin_info.data[0].admin_id,Validators.required],
    dog_id:     [data.dog_id,Validators.required],
    user_email: [data.user_email,Validators.required],
    form_id:    [data.form_id,Validators.required],
    form_status:[status,Validators.required],
  })
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  swalWithBootstrapButtons.fire({
    title: 'do you purchase this form?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel!',
    reverseButtons: false
  }).then((result) => {
    if (result.isConfirmed) {
      this.spinner.show();
      console.log(this.formdecide.value)
      this.service.divided_form(this.formdecide.value).subscribe(response=>{
        console.log(response)
        if (response.status==1) {
          this.service.show_form().subscribe(response=>{
            console.log(response)
            this.data=response.data
            this.dataSource = new MatTableDataSource(this.data);
            this.dataSource.paginator = this.paginator;
            this.formList[0].form_status=3
            this.spinner.hide();
            })
          swalWithBootstrapButtons.fire(
            'Purchase!',
            'This form has been purchase.',
            'success'
          )

        } else {
          this.spinner.hide();
          swalWithBootstrapButtons.fire(
            'Errors!',
            'Something went wrong.',
            'error'
          )
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


  answer(answer:any){
    let semantic
    switch (answer) {
      case 1:
        semantic='Rent'
          break;
      case 2:
        semantic='Own'
          break;
    }
    return semantic
  }
  otheranswer(answer:any){
    let semantic
    switch (answer) {
      case 1:
        semantic='Yes'
          break;
      case 2:
        semantic='No'
          break;
          case 3:
        semantic='None'
          break;
    }
    return semantic
  }
  fanswer(answer:any){
    let semantic
    switch (answer) {
      case 1:
        semantic='Always'
          break;
      case 2:
        semantic='Usually'
          break;
          case 3:
        semantic='Sometimes'
          break;
    }
    return semantic
  }
  statusshow(answer:any){
    let semantic
    switch (answer) {
      case 0:
        semantic='Pending'
          break;
          case 1:
        semantic='Accepted'
          break;
          case 2:
        semantic='Declined'
          break;
          case 3:
        semantic='Purchased'
          break;
    }
    return semantic
  }





//  sendit(event:any){
//     console.log("Value",event.target.value)
//  }

}

