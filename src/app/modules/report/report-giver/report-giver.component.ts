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
  selector: 'app-report-giver',
  templateUrl: './report-giver.component.html',
  styleUrls: ['./report-giver.component.scss']
})
export class ReportGiverComponent implements OnInit {
  displayedColumns: string[] = ['no','img' ,'name', 'surname', 'province','email','phone'];
  data:any=[]
  dataSource : any;
  @ViewChild(MatPaginator,{static:true}) paginator!: MatPaginator;
  @ViewChild(MatTable,{static:true}) table!: MatTable<any>;
  constructor(private service : DashboardService,
    private fb:FormBuilder,
    private spinner : NgxSpinnerService) { }

  ngOnInit(): void {
    this.service.report_giver().subscribe(response=>{
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
      { header: 'Form ID'            , key: 'user_id',                  width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'User ID'         , key: 'user_id',                width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'user Email'         , key: 'user_email',             width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'admin ID'          , key: 'admin_id',                 width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Admin Email'           , key: 'admin_email',               width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Dog ID'        , key: 'dog_id',              width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Dog Name'       , key: 'dog_name',         width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Question 1'    , key: 'q_1',            width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'district code'      , key: 'user_district',            width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'village code'        , key: 'user_village',             width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'province'    , key: 'province',                 width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'district'           , key: 'district',                 width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'village'        , key: 'village',                  width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Create record' , key: 'user_create_at',            width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'update recored', key: 'user_update_at',            width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
    ];

this.data.forEach((e:any) => {
  worksheet.addRow({Appointment_date: moment(e.Appointment_date).format("DD/MM/yyyy").toString(),
  user_id                :      e.user_id,
  user_name       :      e.user_name,
  user_surname       :      e.user_surname ,
  user_dob          :      moment(e.user_dob).format("DD/MM/yyyy").toString(),
  user_email           :      e.user_email,
  user_gender        :      this.user_gender(e.user_gender),
  user_phoneNumber       :      e.user_phoneNumber  ,
  user_province            :      e.user_province,
  user_district               :      e.user_district,
  user_village        :      e.user_village,
  province            :      e.province,
  district               :      e.district,
  village        :      e.village,
  user_create_at     :     moment(e.user_create_at).format("DD/MM/yyyy").toString(),
  user_update_at     :      moment(e.user_update_at).format("DD/MM/yyyy").toString(),
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
  user_gender(status:any){
    let semantic
    switch (status) {
      case 0:
        semantic='ເພdຊາຍ'
          break;
      case 1:
        semantic='ເພດຍິງ'
          break;
    }
    return semantic
  }
}
