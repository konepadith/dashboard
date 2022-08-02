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
  selector: 'app-report-user',
  templateUrl: './report-user.component.html',
  styleUrls: ['./report-user.component.scss']
})
export class ReportUserComponent implements OnInit {
  displayedColumns: string[] = ['no','img' ,'name', 'surname', 'province','email','phone'];
  data:any=[]
  dataSource : any;
  @ViewChild(MatPaginator,{static:true}) paginator!: MatPaginator;
  @ViewChild(MatTable,{static:true}) table!: MatTable<any>;
  constructor(private service : DashboardService,
    private fb:FormBuilder,
    private spinner : NgxSpinnerService) { }

  ngOnInit(): void {
    this.service.report_user().subscribe(response=>{
      this.data=response.data
      console.log(this.data)
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      })
  }
  report(status:any){
    this.service.report_dog(status).subscribe(response=>{
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
      { header: 'ID'            , key: 'user_id',                  width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'admin'         , key: 'user_name',                width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Giver'         , key: 'user_surname',             width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Name'          , key: 'user_dob',                 width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Dob'           , key: 'user_email',               width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Gender'        , key: 'user_gender',              width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Species'       , key: 'user_phoneNumber',         width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Background'    , key: 'user_province',            width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Age'           , key: 'user_district',            width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Status'        , key: 'user_village',             width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Background'    , key: 'province',                 width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Age'           , key: 'district',                 width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Status'        , key: 'village',                  width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Create record' , key: 'dog_create_at',            width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'update recored', key: 'dog_update_at',            width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
    ];

this.data.forEach((e:any) => {
  if(moment(e.date_was_covid).format("DD/MM/yyyy").toString()=='Invalid date'){
    e.date_was_covid=''
   }else{
    e.date_was_covid=moment(e.date_was_covid).format("DD/MM/yyyy").toString()
   }
  worksheet.addRow({Appointment_date: moment(e.Appointment_date).format("DD/MM/yyyy").toString(),
  user_id                :      e.user_id,
  user_name       :      e.user_name,
  user_surname       :      e.user_surname ,
  user_dob          :      moment(e.user_dob).format("DD/MM/yyyy").toString(),
  user_email           :      e.user_email,
  user_gender        :      e.dog_gender,
  user_phoneNumber       :      e.user_phoneNumber  ,
  user_province            :      e.user_province,
  user_district               :      e.user_district,
  user_village        :      e.user_village,
  province            :      e.province,
  district               :      e.district,
  village        :      e.village,
  user_create_at     :      e.dog_create_at,
  user_update_at     :      e.dog_update_at,
   },"n");

});
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'dogs.xlsx');
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
        semantic='ເພດຜູ້'
          break;
      case 1:
        semantic='ເພດແມ່'
          break;
    }
    return semantic
  }
}
