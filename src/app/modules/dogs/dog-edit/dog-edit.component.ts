import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../../dashboard.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-dog-edit',
  templateUrl: './dog-edit.component.html',
  styleUrls: ['./dog-edit.component.scss']
})
export class DogEditComponent implements OnInit {
  dog_list:any
  UpdateDog:any=FormGroup
  constructor(private activatedRoute : ActivatedRoute,private service:DashboardService,private fb:FormBuilder ) { }

  ngOnInit(): void {

    this.service.data_dog_id(this.activatedRoute.snapshot.params['id']).subscribe(response=>{
      console.log(response.data)
      this.dog_list=response.data
      this.UpdateDog=this.fb.group({
        dog_id:        [response.data[0].dog_id,Validators.required],
        dog_name:     [response.data[0].dog_name,Validators.required],
        dog_dob:      ['',Validators.required],
        dog_gender:      [response.data[0].dog_gender.toString(),Validators.required],
        dog_species:      [response.data[0].dog_species,Validators.required],
        giver_email:      [response.data[0].giver_email,Validators.email]
      })
      this.UpdateDog.get('dog_dob').patchValue(this.formatDate(response.data[0].dog_dob));
    })
  }
  DogEdit(){
    if (this.UpdateDog.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Form is Invalid',
        text: 'Please input all Fill',
        })
    } else {
    console.log(this.UpdateDog.value)
    this.service.update_dog(this.UpdateDog.value).subscribe(response=>{
      console.log(response)
      if (response.error == true) {
        Swal.fire({
          icon: 'error',
          title: 'Sonething went wrong',
          text: 'Please input all Fill',
          })
      }
      else if(response.status == 1) {
        Swal.fire({
          icon: 'success',
          title: 'Sucessfully',
          text: 'Update Sucessfully',
          })
      } else if(response.status == 3){
        Swal.fire({
          icon: 'error',
          title: 'Fail',
          text: 'This Email is not exist',
        })
      } else{
        Swal.fire({
          icon: 'error',
          title: 'Sonething went wrong',
          text: 'Please contact supporter',
          })
      }
    })
    }
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
