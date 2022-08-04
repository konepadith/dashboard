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
  selector: 'app-report-dog',
  templateUrl: './report-dog.component.html',
  styleUrls: ['./report-dog.component.scss']
})
export class ReportDogComponent implements OnInit {
  displayedColumns: string[] = ['no','img' ,'dog_name', 'dog_dob', 'dog_gender','admin_email','giver_email','dog_bg'];
  data:any=[]
  dataSource : any;
  @ViewChild(MatPaginator,{static:true}) paginator!: MatPaginator;
  @ViewChild(MatTable,{static:true}) table!: MatTable<any>;
  constructor(private service : DashboardService,
    private fb:FormBuilder,
    private spinner : NgxSpinnerService) { }

  ngOnInit(): void {
    this.report_dog()
  }
  report_dog(){
    this.service.report_dog(101).subscribe(response=>{
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
      { header: 'ID'            , key: 'dog_id',                   width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'admin'         , key: 'admin_email',              width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Giver'         , key: 'giver_email',              width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Name'          , key: 'dog_name',                 width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Dob'           , key: 'dog_dob',                  width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Gender'        , key: 'dog_gender',               width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Species'       , key: 'dog_species',              width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Background'    , key: 'dog_bg',                   width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Age'           , key: 'age',                      width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Status'        , key: 'dog_status',               width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
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
        dog_id            :      e.dog_id,
        admin_email       :      e.admin_email,
        giver_email       :      e.giver_email ,
        dog_name          :      e.dog_name,
        dog_dob           :      moment(e.dog_dob).format("DD/MM/yyyy").toString(),
        dog_gender        :      this.dog_gender(e.dog_gender),
        dog_species       :      e.dog_species  ,
        dog_bg            :      e.dog_bg,
        age               :      this.ageFromDateOfBirthday(e.dog_dob),
        dog_status        :      e.dog_status,
        dog_create_at     :      moment(e.dog_create_at).format("DD/MM/yyyy").toString(),
        dog_update_at     :      moment(e.dog_update_at).format("DD/MM/yyyy").toString(),
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
