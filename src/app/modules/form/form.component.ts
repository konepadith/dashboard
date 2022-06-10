import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatSort, Sort} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
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
  @ViewChild(MatPaginator,{static:true}) paginator!: MatPaginator;
  @ViewChild(MatTable,{static:true}) table!: MatTable<any>;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private service : DashboardService,
    private fb:FormBuilder,
    private router:Router,
    private _liveAnnouncer: LiveAnnouncer) { }

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
    console.log(this.formList)
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
}
