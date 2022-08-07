import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DashboardService } from '../../dashboard.service';
import Swal from "sweetalert2";
import { NgxSpinnerService } from "ngx-spinner";
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import * as moment from 'moment';
@Component({
  selector: 'app-report-donate',
  templateUrl: './report-donate.component.html',
  styleUrls: ['./report-donate.component.scss']
})
export class ReportDonateComponent implements OnInit {
  displayedColumns: string[] = ['no','user_name','donate_price','donate_bill' ,'donate_create_at'];
  data:any=[]
  dataSource : any;

  displayedColumns2: string[] = ['no','name','donate_cash_price','donate_cash_bill' ,'donate_create_at'];
  data2:any=[]
  dataSource2 : any;
  @ViewChild(MatPaginator,{static:true}) paginator!: MatPaginator;
  @ViewChild(MatTable,{static:true}) table!: MatTable<any>;
  constructor(private service : DashboardService,
    private fb:FormBuilder,
    private spinner : NgxSpinnerService) { }

  ngOnInit(): void {
    this.service.report_donate().subscribe(response=>{
      this.data=response.data
      console.log(this.data)
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      })
      this.service.report_donate_cash().subscribe(response=>{
        this.data2=response.data
        console.log(this.data2)
        this.dataSource2 = new MatTableDataSource(this.data2);
        this.dataSource2.paginator = this.paginator;
        })
  }


  report(status:any){
    this.service.report_form(status).subscribe(response=>{
      this.data=response.data
      console.log(this.data)
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      })
  }
  exportExcel() {
    //add code below when you would like to use Exceljs to tsconfig.app.json
    // "type":[
    //   "node"
    // ]
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('DogReport');
    worksheet.columns = [
      { header: 'Form ID'            , key: 'form_id',                  width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'User ID'         , key: 'user_id',                width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'user Email'         , key: 'user_email',             width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'admin ID'          , key: 'admin_id',                 width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Admin Email'           , key: 'admin_email',               width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Dog ID'        , key: 'dog_id',              width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Dog Name'       , key: 'dog_name',         width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Form Status'       , key: 'form_status',         width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Question 1'    , key: 'q_1',            width: 10, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Question 2'    , key: 'q_2',            width: 10, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Question 3'    , key: 'q_3',            width: 10, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Question 4'    , key: 'q_4',            width: 10, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Question 5'    , key: 'q_5',            width: 10, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Question 6'    , key: 'q_6',            width: 10, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Question 7'    , key: 'q_7',            width: 10, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Question 8'    , key: 'q_8',            width: 10, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Question 9'    , key: 'q_9',            width: 10, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Question 10'    , key: 'q_10',            width: 10, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Question 11'    , key: 'q_11',            width: 10, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Question 12'    , key: 'q_12',            width: 10, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Question 13'    , key: 'q_13',            width: 10, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Question 14'    , key: 'q_14',            width: 10, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Question 15'    , key: 'q_15',            width: 10, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Question 16'    , key: 'q_16',            width: 10, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Question 17'    , key: 'q_17',            width: 10, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Question 18'    , key: 'q_18',            width: 10, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Question 19'    , key: 'q_19',            width: 10, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Create record' , key: 'form_create_at',            width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'update recored', key: 'form_update_at',            width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
    ];
this.data.forEach((e:any) => {
  worksheet.addRow({
    form_id                :      e.form_id,
    user_id       :      e.user_id,
    user_email       :      e.user_email ,
  admin_id           :      e.admin_id,
  admin_email        :      e.admin_email,
  dog_id       :      e.dog_id  ,
  dog_name            :      e.dog_name,
  form_status               :     e.form_status ,
      q_1       : e.q_1,
    q_2       : e.q_2,
    q_3       : e.q_3,
    q_4       : e.q_4,
    q_5       : e.q_5,
    q_6       : e.q_6,
    q_7       : e.q_7,
    q_8       : e.q_8,
    q_9       : e.q_9,
    q_10      : e.q_10,
    q_11      : e.q_11,
    q_12      : e.q_12,
    q_13      : e.q_13,
    q_14      : e.q_14,
    q_15      : e.q_15,
    q_16      : e.q_16,
    q_17      : e.q_17,
    q_18      : e.q_18,
    q_19      : e.q_19,
    form_create_at     :     moment(e.user_create_at).format("DD/MM/yyyy").toString(),
    form_update_at     :      moment(e.user_update_at).format("DD/MM/yyyy").toString(),
   },"n");

});
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'dogs.xlsx');
    })

  }

  DonateSum(donate:any){
    let sum = 0;
    for (let index = 0; index < donate.length; index++) {
      sum += donate[index].donate_price;
    }
    return sum
  }

  DonateSum2(donate:any){
    let sum = 0;
    for (let index = 0; index < donate.length; index++) {
      sum += donate[index].donate_cash_price;
    }
    return sum
  }
}
