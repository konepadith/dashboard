import { Component, OnInit } from '@angular/core';
// import * as Excel from "exceljs";
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import * as moment from 'moment';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  data:any
  constructor() { }

  ngOnInit(): void {
  }

  exportExcel() {

    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('ProductData');
    worksheet.columns = [
      { header: 'RegisterID', key: 'id_form_header',                      width: 18, style: { font: { name: 'phetsarath OT', size:12} }  },
      { header: 'Ticket Code', key: 'ticket_code',                        width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Status', key: 'status_cus',                              width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Register Date', key: 'tb_form_create_date',              width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Date for Vaccination', key: 'Appointment_date',          width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Vaccine', key: 'vaccine_name',                           width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Dose', key: 'dose',                                      width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Vaccination ID', key: 'cvid_ref',                        width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Location', key: 'location_name',                         width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Gender', key: 'gender',                                  width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Name', key: 'name',                                      width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'LastName', key: 'lastname',                              width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Date of Birth', key: 'dob',                              width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Age', key: 'age',                              width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Village', key: 'village',                                width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'District', key: 'district',                              width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Province', key: 'province',                              width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Country', key: 'country',                                width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'ID/Passport', key: 'id_or_passportid',                   width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Phone Number', key: 'phone',                             width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Email', key: 'email',                                    width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Job Sector', key: 'job_name',                            width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Disease/Illness', key: 'disease',                        width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Date Cured', key: 'date_was_covid',                      width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Question 1', key: 'q_1',                                 width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Question 2', key: 'q_2',                                 width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Question 3', key: 'q_3',                                 width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Question 4', key: 'q_4',                                 width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Question 5', key: 'q_5',                                 width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Question 6', key: 'q_6',                                 width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Question 7', key: 'q_7',                                 width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Question 8', key: 'q_8',                                 width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Question 9', key: 'q_9',                                 width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Question 10', key: 'q_10',                               width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Question 11', key: 'q_11',                               width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
      { header: 'Question 12', key: 'q_12',                               width: 18, style: { font: { name: 'phetsarath OT', size:12} } },
    ];

this.data.forEach((e:any) => {
  if(moment(e.date_was_covid).format("DD/MM/yyyy").toString()=='Invalid date'){
    e.date_was_covid=''
   }else{
    e.date_was_covid=moment(e.date_was_covid).format("DD/MM/yyyy").toString()
   }
  worksheet.addRow({Appointment_date: moment(e.Appointment_date).format("DD/MM/yyyy").toString(),
    country: e.country,
    cvid_ref:e.cvid_ref,
    date_was_covid: e.date_was_covid ,
    disease:e.disease,
    district:e.district,
    dob: moment(e.dob).format("DD/MM/yyyy").toString()  ,
    dose:e.dose,
    email:e.email,
    gender:e.gender,
    id_form_header:e.id_form_header,
    id_or_passportid:e.id_or_passportid,
    job_name:e.job_name,
    lastname:e.lastname,
    age: e.dob,
    location_name:e.location_name,
    name:e.name,
    phone:e.phone,
    province:e.province,
    q_1:e.q_1,
    q_2:e.q_2,
    q_3:e.q_3,
    q_4:e.q_4,
    q_5:e.q_5,
    q_6:e.q_6,
    q_7:e.q_7,
    q_8:e.q_8,
    q_9:e.q_9,
    q_10:e.q_10,
    q_11:e.q_11,
    q_12:e.q_12,
    status_cus:e.status_cus,
    tb_form_create_date: moment(e.tb_form_create_date).format("DD/MM/yyyy").toString(),
    tb_form_modify_date: moment(e.tb_form_modify_date).format("DD/MM/yyyy").toString(),
    ticket_code:e.ticket_code,
    vaccine_name:e.vaccine_name,
    village:e.village,
    workplace:e.workplace,
   },"n");

});
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'ProductData.xlsx');
    })

  }
}
