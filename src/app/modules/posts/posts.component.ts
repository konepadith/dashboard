import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subject,switchMap } from 'rxjs';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  displayedColumns: string[] = ['no', 'event', 'date', 'time','places','location','type','action'];
  data:any=[]
  dataSource : any;
  addEvent:any = FormGroup
  @ViewChild(MatPaginator,{static:true}) paginator!: MatPaginator;
  @ViewChild(MatTable,{static:true}) table!: MatTable<any>;

  admin_info=JSON.parse(localStorage.getItem("user") || "[]")
  switches = new Subject<any>();
  constructor(private service : DashboardService,
    private fb:FormBuilder,
    private cd: ChangeDetectorRef,
    private router:Router) {

      this.switches.pipe(switchMap((searchProduct)=>
    this.service.event_switch(searchProduct))).subscribe((value)=>
    console.log('test',value));
     }

  ngOnInit(): void {
    this.addEvent=this.fb.group({
      admin_id:[this.admin_info.data[0].admin_id,Validators.required],
      event_topic:       [null,Validators.required],
      event_date:        [null,Validators.required],
      event_start:     [null,Validators.required],
      event_end:    [null,Validators.required],
      event_place:         [null,Validators.required],
      event_direction:         [null,Validators.required],
      event_status:    [null,Validators.email],
    })

    this.service.events_data_adm().subscribe(response=>{
      console.log(response)
      this.data=response.data
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
    })
  }
  get e() { return this.addEvent.controls; }

  addevent(){
      this.service.add_events(this.addEvent.value).subscribe(response=>{
        console.log(response)


        if (response.status==1) {
          this.addEvent=this.fb.group({
            admin_id:[this.admin_info.data[0].admin_id,Validators.required],
            event_topic:       [null,Validators.required],
            event_date:        [null,Validators.required],
            event_start:     [null,Validators.required],
            event_end:    [null,Validators.required],
            event_place:         [null,Validators.required],
            event_direction:         [null,Validators.required],
            event_status:    [null,Validators.email],
          })
          this.service.events_data_adm().subscribe(response=>{
            console.log(response)
            this.data=response.data
            this.dataSource = new MatTableDataSource(this.data);
            this.dataSource.paginator = this.paginator;
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Sonething went wrong',
            text: 'Please contact supporter',
            })
        }
      })
  }

  switch(event:any,event_id:any){

    let status=event.target.checked
    if (status==true) {
      const data={event_status: 1,
                  event_id:event_id}
      this.switches.next(data);

    this.service.event_switch(data).subscribe(res=>{
      console.log(res)
    })
    } else if(status==false){
      const data={event_status: 0,
        event_id:event_id}
      this.switches.next(data);

    this.service.event_switch(data).subscribe(res=>{
      console.log(res)
    })
    }

  }
}
