import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
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
  constructor(private service : DashboardService,
    private fb:FormBuilder,
    private cd: ChangeDetectorRef,
    private router:Router) { }

  ngOnInit(): void {
    this.addEvent=this.fb.group({
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

  }
  test(event:any){
    console.log(event.target.checked)
  }
}
