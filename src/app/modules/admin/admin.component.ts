import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from '../dashboard.service';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'surname', 'address', 'contact', 'action'];
  data: any = []
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;
  myFiles: any
  btn = false
  Registration: any = FormGroup;

  submitted = false;
  email_exist = false
  genderList: [] = []

  villageList: any = []    //set Data for Filter
  districtList: any = []  //set Data for filter
  provinceList: any = [] //set Data for Filter

  province_data: any = []  //Represent Data Filtered
  district_data: any = [] //Represent Data Filtered
  village_data: any = [] //Represent Data Filtered


  admin_district = '' //give default value for Show Selected option default
  admin_village = '' //give default value for Show Selected option default
  admin_info=JSON.parse(localStorage.getItem("user") || "[]")
  constructor(private service: DashboardService, private fb: FormBuilder, private cd: ChangeDetectorRef, private router: Router) { }

  ngOnInit(): void {
    if (this.admin_info.data[0].admin_email !="konepadithspydee@gmail.com") {
      this.router.navigate([''])
    }
    this.Registration = this.fb.group({
      admin_name: [null, Validators.required],
      admin_surname: [null, Validators.required],
      admin_gender: [null, Validators.required],
      admin_password: [null, Validators.compose([Validators.required, Validators.minLength(8)])],
      confirm_password: [null, Validators.compose([Validators.required])],
      image: [null, Validators.required],
      admin_email: [null, Validators.compose([Validators.required, Validators.email])],
      admin_dob: [null, Validators.required],
      admin_village: [null, Validators.required],
      admin_district: [null, Validators.required],
      admin_province: [null, Validators.required],
      admin_workplace: [null, Validators.required],
      admin_phoneNumber: [null, Validators.compose([Validators.required, Validators.pattern("^[+][0-9]{10,15}$")])],
    }, {
      validators: this.MustMatch('user_password', 'confirm_password') //Corfirm password function
    })

    this.service.village().subscribe(response => {
      // console.log(response.data)
      this.villageList = response.data
    })

    this.service.district().subscribe(response => {
      // console.log(response.data)
      this.districtList = response.data
    })

    this.service.province().subscribe(response => {
      // console.log(response.data)
      this.provinceList = response.data
    })
    this.service.admin_data().subscribe(response => {
      console.log(response)
      this.data = response.data
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
    })
  }
  get f() { return this.Registration.controls; }
  MustMatch(controlName: string, matchingControlName: string) {
    return (Registration: FormGroup) => {
      const control = Registration.controls[controlName]
      const matchingControl = Registration.controls[matchingControlName]
      if (matchingControl.errors && !matchingControl.errors['MustMatch']) {
        return
      } if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ MustMatch: true })
      } else {
        matchingControl.setErrors(null)
      }
    }
  }
  onFIleSelect(event: any, field: any) {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      // just checking if it is an image, ignore if you want
      if (!file.type.startsWith('image')) {
        this.Registration.get(field).setErrors({
          required: true
        });
        this.cd.markForCheck();
      } else {
        // unlike most tutorials, i am using the actual Blob/file object instead of the data-url
        this.Registration.patchValue({
          [field]: file
        });
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      }
    }
  }
  onSelectprovince(province:any){
    let data=this.districtList.filter((res: { id_province: string; })=>{
      return res.id_province.toLowerCase().match(province.target.value.toLocaleLowerCase())
    })
    this.district_data=data
    this.village_data=null
    this.admin_district=''
    this.admin_village=''
  }

  onSelectdistrict(district:any){
    let data=this.villageList.filter((res: { id_district: string; })=>{
      return res.id_district.toLowerCase().match(district.target.value.toLocaleLowerCase())
    })
    this.village_data=data
    this.admin_village=''
  }

  onSelectprovince2(province:any){
    let data=this.districtList.filter((res: { id_province: string; })=>{
      return res.id_province.toLowerCase().match(province.toLocaleLowerCase())
    })
    this.district_data=data
    this.village_data=null
    this.admin_district=''
    this.admin_village=''
  }

  onSelectdistrict2(district:any){
    let data=this.villageList.filter((res: { id_district: string; })=>{
      return res.id_district.toLowerCase().match(district.toLocaleLowerCase())
    })
    this.village_data=data
    this.admin_village=''
  }

  submit_registration() {

    if (this.Registration.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Form is Invalid',
        text: 'Please input all Fill',
      })
    } else {
      const data = new FormData(); //Create Data Store by FormData()
      Object.entries(this.Registration.value).forEach(([key, value]: any[]) => {
        data.set(key, value)
      })
      console.log(data)
      this.service.add_admin_data(data).subscribe(response => {
        console.log(response)
        if (response.status == 0) {
          this.email_exist = true
          Swal.fire({
            icon: 'error',
            title: 'Email is already exist',
            text: 'Try other email',
          })
        } else if (response.error == true) {
          Swal.fire({
            icon: 'error',
            title: 'Sonething went wrong',
            text: 'Please contact supporter',
          })
        }
        else {
          Swal.fire({
            icon: 'success',
            title: 'Sucessfully',
            text: 'Welcome new Member',
          }).then(() => {
            this.service.giver_data().subscribe(response => {
              this.data = response.data
              this.dataSource = new MatTableDataSource(this.data);
              this.dataSource.paginator = this.paginator;
            })
            this.Registration = this.fb.group({
              admin_name: [null, Validators.required],
              admin_surname: [null, Validators.required],
              admin_gender: [null, Validators.required],
              admin_password: [null, Validators.compose([Validators.required, Validators.minLength(8)])],
              confirm_password: [null, Validators.compose([Validators.required])],
              image: [null, Validators.required],
              admin_email: [null, Validators.compose([Validators.required, Validators.email])],
              admin_dob: [null, Validators.required],
              admin_village: [null, Validators.required],
              admin_district: [null, Validators.required],
              admin_province: [null, Validators.required],
              admin_workplace: [null, Validators.required],
              admin_phoneNumber: [null, Validators.compose([Validators.required, Validators.pattern("^[+][0-9]{10,15}$")])],
            })
          })
        }
      })
    }
  }

update(){
      const data= new FormData(); //Create Data Store by FormData()
        Object.entries(this.Registration.value).forEach(([key,value]:any[])=>{
        data.set(key,value)
      })
      this.service.update_admin(data).subscribe(response=>{
        console.log(response)
        if (response.status ==0 ) {
          this.email_exist=true
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error',
            })
        }else if (response.error == true) {
          Swal.fire({
            icon: 'error',
            title: 'Sonething went wrong',
            text: 'Please contact supporter',
            })
        }
        else {
          Swal.fire({
            icon: 'success',
            title: 'UPDATE',
            text: 'Member Update',
            }).then(()=>{
              this.service.admin_data().subscribe(response=>{
                this.data=response.data
                this.dataSource = new MatTableDataSource(this.data);
                this.dataSource.paginator = this.paginator;
                })
                this.Registration = this.fb.group({
                  admin_name: [null, Validators.required],
                  admin_surname: [null, Validators.required],
                  admin_gender: [null, Validators.required],
                  admin_password: [null, Validators.compose([Validators.required, Validators.minLength(8)])],
                  confirm_password: [null, Validators.compose([Validators.required])],
                  image: [null, Validators.required],
                  admin_email: [null, Validators.compose([Validators.required, Validators.email])],
                  admin_dob: [null, Validators.required],
                  admin_village: [null, Validators.required],
                  admin_district: [null, Validators.required],
                  admin_province: [null, Validators.required],
                  admin_workplace: [null, Validators.required],
                  admin_phoneNumber: [null, Validators.compose([Validators.required, Validators.pattern("^[+][0-9]{10,15}$")])],
                })
            })
        }
      })
    }
    Delete(event:any){
      // let data={'giver_id':event.dog_id,'dog_status':3}
      // this.service.status_dog_data(data).subscribe(response=>{
      //   console.log(response)
      //   this.service.dogs_data_info().subscribe(response=>{
      //     this.data=response.data
      //     this.dataSource = new MatTableDataSource(this.data);
      //     this.dataSource.paginator = this.paginator;
      //     })
      // })
    }
    cancel(){
      this.btn=false
      this.Registration = this.fb.group({
        admin_name: [null, Validators.required],
        admin_surname: [null, Validators.required],
        admin_gender: [null, Validators.required],
        admin_password: [null, Validators.compose([Validators.required, Validators.minLength(8)])],
        confirm_password: [null, Validators.compose([Validators.required])],
        image: [null, Validators.required],
        admin_email: [null, Validators.compose([Validators.required, Validators.email])],
        admin_dob: [null, Validators.required],
        admin_village: [null, Validators.required],
        admin_district: [null, Validators.required],
        admin_province: [null, Validators.required],
        admin_workplace: [null, Validators.required],
        admin_phoneNumber: [null, Validators.compose([Validators.required, Validators.pattern("^[+][0-9]{10,15}$")])],
      })
    }
    edit(data:any){
      this.btn=true
      this.Registration = this.fb.group({
        admin_id: [data.admin_id, Validators.required],
        admin_name: [data.admin_name, Validators.required],
        admin_surname: [data.admin_surname, Validators.required],
        admin_gender: [data.admin_gender, Validators.required],
        image: [''],
        admin_email: [data.admin_email, Validators.compose([Validators.required, Validators.email])],
        admin_dob: ['', Validators.required],
        admin_village: [data.admin_village, Validators.required],
        admin_district: [data.admin_district, Validators.required],
        admin_province: [data.admin_province, Validators.required],
        admin_workplace: [data.admin_workplace, Validators.required],
        admin_phoneNumber: [data.admin_phoneNumber, Validators.compose([Validators.required, Validators.pattern("^[+][0-9]{10,15}$")])],
      })

      this.Registration.get('admin_dob').patchValue(this.formatDate(data.admin_dob));
      this.onSelectprovince2(data.admin_province)
      this.onSelectdistrict2(data.admin_district)
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
