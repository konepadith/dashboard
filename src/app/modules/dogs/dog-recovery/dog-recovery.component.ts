import { Component, OnInit,ViewChild,ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from '../../dashboard.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table';
@Component({
  selector: 'app-dog-recovery',
  templateUrl: './dog-recovery.component.html',
  styleUrls: ['./dog-recovery.component.scss']
})
export class DogRecoveryComponent implements OnInit {



  displayedColumns: string[] = ['no', 'name', 'dob', 'gender','status','giver','action'];
  data:any=[]
  dataSource : any;
  @ViewChild(MatPaginator,{static:true}) paginator!: MatPaginator;
  @ViewChild(MatTable,{static:true}) table!: MatTable<any>;
  myFiles:any
  addDogs:any = FormGroup
  constructor(private service : DashboardService,
    private fb:FormBuilder,
    private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.service.delete_dog_info().subscribe(response=>{
      this.data=response.data
      console.log(this.data)
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      })

  }

  public ageFromDateOfBirthday(dateOfBirth: any): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  dog_gender(status:any){
    let semantic
    switch (status) {
      case 0:
        semantic='Girl'
          break;
      case 1:
        semantic='Boy'
          break;
    }
    return semantic
  }

  Restore(event:any){
    let data={'dog_id':event.dog_id,'dog_status':0}
    console.log(data)
    this.service.status_dog_data(data).subscribe(response=>{
      console.log(response)
      this.service.delete_dog_info().subscribe(response=>{
        this.data=response.data
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        })
    })
  }
}
