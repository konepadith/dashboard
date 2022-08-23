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
      { header: 'Giver ID'            , key: 'giver_id',                  width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Admin ID'         , key: 'admin_id',                width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'giver img'         , key: 'giver_img',             width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'giver name'          , key: 'giver_name',                 width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'giver surname'           , key: 'giver_surname',               width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'giver dob'        , key: 'giver_dob',              width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'code village'       , key: 'giver_village',         width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'code district'    , key: 'giver_district',            width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'code province'      , key: 'giver_province',            width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'giver phoneNumber'        , key: 'giver_phoneNumber',             width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'giver email'    , key: 'giver_email',                 width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'giver gender'           , key: 'giver_gender',                 width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'giver workplace'        , key: 'giver_workplace',                  width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'village'           , key: 'village',                 width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'distict'        , key: 'district',                  width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'province'           , key: 'province',                 width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'dog_name'        , key: 'dog_name',                  width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Create record' , key: 'giver_create_at',            width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'update recored', key: 'giver_update_at',            width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
    ];

this.data.forEach((e:any) => {
  worksheet.addRow({Appointment_date: moment(e.Appointment_date).format("DD/MM/yyyy").toString(),
  giver_id                :      e.giver_id,
  admin_id       :      e.admin_id,
  giver_img       :      e.giver_img ,
  giver_dob          :      moment(e.giver_dob).format("DD/MM/yyyy").toString(),
  giver_name           :      e.giver_name,
  giver_gender        :      this.user_gender(e.giver_gender),
  giver_surname       :      e.giver_surname  ,
  giver_village            :      e.giver_village,
  giver_district               :      e.giver_district,
  giver_province        :      e.giver_province,
  giver_phoneNumber            :      e.giver_phoneNumber,
  giver_email               :      e.giver_email,
  giver_workplace        :      e.giver_workplace,
  village            :      e.village,
  district               :      e.district,
  province        :      e.province,
  dog_name            :      e.dog_name,
  giver_create_at     :     moment(e.giver_create_at).format("DD/MM/yyyy").toString(),
  giver_update_at     :      moment(e.giver_update_at).format("DD/MM/yyyy").toString(),
   },"n");

});
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'giver.xlsx');
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
