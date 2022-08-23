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
  exportExcel1() {
    //add code below when you would like to use Exceljs to tsconfig.app.json
    // "type":[
    //   "node"
    // ]
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('DogReport');
    worksheet.columns = [
      { header: 'donate ID'            , key: 'donate_id',                  width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'User ID'            , key: 'user_id',                  width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'User Name'            , key: 'user_name',                  width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'User Email'         , key: 'user_email',                width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Donate price'         , key: 'donate_price',             width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Donate Bill'          , key: 'donate_bill',                 width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Donate For'           , key: 'donate_for',               width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Create record' , key: 'donate_create_at',            width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'update recored', key: 'donate_update_at',            width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
    ];
this.data.forEach((e:any) => {
  worksheet.addRow({
    donate_id                :      e.donate_id,
    user_id       :      e.user_id,
    user_name       :      e.user_name ,
    user_email           :      e.user_email,
    donate_price        :      e.donate_price,
    donate_bill       :      e.donate_bill  ,
    donate_for            :      e.donate_for,
    donate_create_at     :     moment(e.donate_create_at).format("DD/MM/yyyy").toString(),
    donate_update_at     :      moment(e.donate_update_at).format("DD/MM/yyyy").toString(),
   },"n");

});
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'donate.xlsx');
    })

  }

  exportExcel2() {
    //add code below when you would like to use Exceljs to tsconfig.app.json
    // "type":[
    //   "node"
    // ]
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('DogReport');
    worksheet.columns = [
      { header: 'donate ID'            , key: 'donate_cash_id',                  width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Admin ID'            , key: 'admin_id',                  width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Admin Email'         , key: 'admin_email',                width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'User Name'            , key: 'name',                  width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'User email'            , key: 'email',                  width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'User dob'            , key: 'dob',                  width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Donate price'         , key: 'donate_cash_price',             width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Donate Bill'          , key: 'donate_cash_bill',                 width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Donate For'           , key: 'donate_cash_for',               width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Create record' , key: 'donate_cash_create_at',            width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'update recored', key: 'donate_cash_update_at',            width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
    ];
this.data2.forEach((e:any) => {
  worksheet.addRow({
    donate_cash_id                :      e.donate_cash_id,
    admin_id       :      e.admin_id,
    admin_email       :      e.admin_email ,
    name           :      e.name,
    email        :      e.email,
    dob       :      e.dob  ,
    donate_cash_price            :      e.donate_cash_price,
    donate_for            :      e.donate_for,
    donate_cash_bill            :      e.donate_cash_bill,
    donate_cash_for            :      e.donate_cash_for,
    donate_cash_create_at     :     moment(e.donate_cash_create_at).format("DD/MM/yyyy").toString(),
    donate_cash_update_at     :      moment(e.donate_cash_update_at).format("DD/MM/yyyy").toString(),
   },"n");

});
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'doantecash.xlsx');
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
