import { Component, OnInit,ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from '../dashboard.service';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
@Component({
  selector: 'app-giver',
  templateUrl: './giver.component.html',
  styleUrls: ['./giver.component.scss']
})
export class GiverComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'surname', 'address','contact','action'];
  data:any=[]
  dataSource : any;
  @ViewChild(MatPaginator,{static:true}) paginator!: MatPaginator;
  @ViewChild(MatTable,{static:true}) table!: MatTable<any>;
  myFiles:any
  btn=false
  Registration:any = FormGroup;

  submitted = false;
  email_exist = false
  genderList:[]=[]

  villageList:any=[]    //set Data for Filter
  districtList:any=[]  //set Data for filter
  provinceList:any=[] //set Data for Filter

  province_data:any=[]  //Represent Data Filtered
  district_data:any=[] //Represent Data Filtered
  village_data:any=[] //Represent Data Filtered


  giver_district='' //give default value for Show Selected option default
  giver_village='' //give default value for Show Selected option default
  admin_info=JSON.parse(localStorage.getItem("user") || "[]")
  constructor(private service : DashboardService,private fb:FormBuilder,private cd: ChangeDetectorRef,private router:Router) { }

  ngOnInit(): void {
    this.Registration = this.fb.group({
      admin_id:[this.admin_info.data[0].admin_id,Validators.required],
      giver_name:        [null,Validators.required],
      giver_surname:     [null,Validators.required],
      giver_gender:      [null,Validators.required],
      // giver_password:    [null,Validators.compose([Validators.required,Validators.minLength(8)])],
      // confirm_password: [null,Validators.compose([Validators.required])],
      image:            [null,Validators.required],
      giver_email:       [null,Validators.compose([Validators.required,Validators.email])],
      giver_dob:         [null,Validators.required],
      giver_village:     [null,Validators.required],
      giver_district:    [null,Validators.required],
      giver_province:    [null,Validators.required],
      giver_workplace:   [null,Validators.required],
      giver_phoneNumber: [null,Validators.compose([Validators.required,Validators.pattern("^[+][0-9]{10,15}$")])],
    })
    this.service.village().subscribe(response=>{
      // console.log(response.data)
      this.villageList=response.data
    })

    this.service.district().subscribe(response=>{
      // console.log(response.data)
      this.districtList=response.data
    })

    this.service.province().subscribe(response=>{
      // console.log(response.data)
      this.provinceList=response.data
    })
    this.service.giver_data().subscribe(response=>{
      this.data=response.data
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      })

  }
  get f() { return this.Registration.controls; }

  onFIleSelect(event:any, field:any) {
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
    }}
    submit_registration(){

      if (this.Registration.invalid) {
        Swal.fire({
          icon: 'error',
          title: 'Form is Invalid',
          text: 'Please input all Fill',
          })
      } else {
        const data= new FormData(); //Create Data Store by FormData()
        Object.entries(this.Registration.value).forEach(([key,value]:any[])=>{
        data.set(key,value)
      })
      console.log(data)
      this.service.giver_register(data).subscribe(response=>{
            console.log(response)
            if (response.status ==0 ) {
              this.email_exist=true
              Swal.fire({
                icon: 'error',
                title: 'Email is already exist',
                text: 'Try other email',
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
                title: 'Sucessfully',
                text: 'Welcome new Member',
                }).then(()=>{
                  this.service.giver_data().subscribe(response=>{
                    this.data=response.data
                    this.dataSource = new MatTableDataSource(this.data);
                    this.dataSource.paginator = this.paginator;
                    })
                    this.Registration = this.fb.group({
                      admin_id:[this.admin_info.data[0].admin_id,Validators.required],
                      giver_name:        [null,Validators.required],
                      giver_surname:     [null,Validators.required],
                      giver_gender:      [null,Validators.required],
                      // giver_password:    [null,Validators.compose([Validators.required,Validators.minLength(8)])],
                      // confirm_password: [null,Validators.compose([Validators.required])],
                      image:            [null,Validators.required],
                      giver_email:       [null,Validators.compose([Validators.required,Validators.email])],
                      giver_dob:         [null,Validators.required],
                      giver_village:     [null,Validators.required],
                      giver_district:    [null,Validators.required],
                      giver_province:    [null,Validators.required],
                      giver_workplace:   [null,Validators.required],
                      giver_phoneNumber: [null,Validators.compose([Validators.required,Validators.pattern("^[+][0-9]{10,15}$")])],
                    })
                })
            }

          })
      }

    }



    onSelectprovince(province:any){
      let data=this.districtList.filter((res: { id_province: string; })=>{
        return res.id_province.toLowerCase().match(province.target.value.toLocaleLowerCase())
      })
      this.district_data=data
      this.village_data=null
      this.giver_district=''
      this.giver_village=''
    }

    onSelectdistrict(district:any){
      let data=this.villageList.filter((res: { id_district: string; })=>{
        return res.id_district.toLowerCase().match(district.target.value.toLocaleLowerCase())
      })
      this.village_data=data
      this.giver_village=''
    }

    onSelectprovince2(province:any){
      let data=this.districtList.filter((res: { id_province: string; })=>{
        return res.id_province.toLowerCase().match(province.toLocaleLowerCase())
      })
      this.district_data=data
      this.village_data=null
      this.giver_district=''
      this.giver_village=''
    }

    onSelectdistrict2(district:any){
      let data=this.villageList.filter((res: { id_district: string; })=>{
        return res.id_district.toLowerCase().match(district.toLocaleLowerCase())
      })
      this.village_data=data
      this.giver_village=''
    }






    update(){
      const data= new FormData(); //Create Data Store by FormData()
        Object.entries(this.Registration.value).forEach(([key,value]:any[])=>{
        data.set(key,value)
      })
      this.service.update_giver(data).subscribe(response=>{
        console.log(response)
        if (response.status ==0 ) {
          this.email_exist=true
          Swal.fire({
            icon: 'error',
            title: 'Email is already exist',
            text: 'Try other email',
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
              this.service.giver_data().subscribe(response=>{
                this.data=response.data
                this.dataSource = new MatTableDataSource(this.data);
                this.dataSource.paginator = this.paginator;
                })
                this.Registration = this.fb.group({
                  admin_id:[this.admin_info.data[0].admin_id,Validators.required],
                  giver_name:        [null,Validators.required],
                  giver_surname:     [null,Validators.required],
                  giver_gender:      [null,Validators.required],
                  // giver_password:    [null,Validators.compose([Validators.required,Validators.minLength(8)])],
                  // confirm_password: [null,Validators.compose([Validators.required])],
                  image:            [null,Validators.required],
                  giver_email:       [null,Validators.compose([Validators.required,Validators.email])],
                  giver_dob:         [null,Validators.required],
                  giver_village:     [null,Validators.required],
                  giver_district:    [null,Validators.required],
                  giver_province:    [null,Validators.required],
                  giver_workplace:   [null,Validators.required],
                  giver_phoneNumber: [null,Validators.compose([Validators.required,Validators.pattern("^[+][0-9]{10,15}$")])],
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
        admin_id:[this.admin_info.data[0].admin_id,Validators.required],

        giver_name:        [null,Validators.required],
        giver_surname:     [null,Validators.required],
        giver_gender:      [null,Validators.required],
        image:            [null,Validators.required],
        giver_email:       [null,Validators.compose([Validators.required,Validators.email])],
        giver_dob:         [null,Validators.required],
        giver_village:     [null,Validators.required],
        giver_district:    [null,Validators.required],
        giver_province:    [null,Validators.required],
        giver_workplace:   [null,Validators.required],
        giver_phoneNumber: [null,Validators.compose([Validators.required,Validators.pattern("^[+][0-9]{10,15}$")])],
      })
    }
    edit(data:any){
      this.btn=true
      this.Registration = this.fb.group({
        admin_id:[this.admin_info.data[0].admin_id,Validators.required],
        giver_id:[data.giver_id,Validators.required],
        giver_name:        [data.giver_name,Validators.required],
        giver_surname:     [data.giver_surname,Validators.required],
        giver_gender:      [data.giver_gender,Validators.required],
        image:             [''],
        giver_email:       [data.giver_email,Validators.compose([Validators.required,Validators.email])],
        giver_dob:         ['',Validators.required],
        giver_village:     [data.giver_village,Validators.required],
        giver_district:    [data.giver_district,Validators.required],
        giver_province:    [data.giver_province,Validators.required],
        giver_workplace:   [data.giver_workplace,Validators.required],
        giver_phoneNumber: [data.giver_phoneNumber,Validators.compose([Validators.required,Validators.pattern("^[+][0-9]{10,15}$")])],
      })

      this.Registration.get('giver_dob').patchValue(this.formatDate(data.giver_dob));
      this.onSelectprovince2(data.giver_province)
      this.onSelectdistrict2(data.giver_district)
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
