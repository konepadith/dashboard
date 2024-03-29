import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  url = 'http://localhost:3000'
  constructor(private http : HttpClient) { }
  bigChart(){

    return [{
      name: 'ຜ່ານບັດ Credit',
      data: [502, 635, 809, 947, 1402, 3634, 5268,5588]
  }, {
      name: 'ເງິນສົດ',
      data: [106, 107, 111, 133, 221, 767, 1766]
  // }, {
  //     name: 'Europe',
  //     data: [163, 203, 276, 408, 547, 729, 628]
  // }, {
  //     name: 'America',
  //     data: [18, 31, 54, 156, 339, 818, 1201]
  // }, {
  //     name: 'Oceania',
  //     data: [2, 2, 2, 6, 13, 30, 46]
  }]
  }
  cards(){
    return [71,78,39,66]
  }
  pieChart(){
    return [{
      name: 'Chrome',
      y: 61.41,
      sliced: true,
      selected: true
  }, {
      name: 'Internet Explorer',
      y: 11.84
  }, {
      name: 'Firefox',
      y: 10.85
  }, {
      name: 'Edge',
      y: 4.67
  }, {
      name: 'Safari',
      y: 4.18
  }, {
      name: 'Sogou Explorer',
      y: 1.64
  }, {
      name: 'Opera',
      y: 1.6
  }, {
      name: 'QQ',
      y: 1.2
  }, {
      name: 'Other',
      y: 2.61
  }]
  }
  mail(data:any){
    const url =this.url+'/mailing'
    return this.http.post<any>(url,data)
  }
  receive(){
    const url = this.url+'/show_mail'
    return this.http.get<any>(url)
  }
  readmail(receivemail_id:any){
    const url = this.url+'/read_mail?receivemail_id='+receivemail_id
    return this.http.get<any>(url)
  }
  dogs_data_info(){
    return this.http.get<any>(this.url+'/dogs_data_info')
  }
  delete_dog_info(){
    return this.http.get<any>(this.url+'/delete_dog_info')
  }
  add_dog_data_array(data:any){
    const url = this.url+'/add_dog_data_array'
    return this.http.post<any>(url,data)
  }
  add_dog_data(data:any){
    const url = this.url+'/add_dog_data'
    return this.http.post<any>(url,data)
  }
  status_dog_data(data:any){
    const url = this.url+'/status_dog_data'
    return this.http.post<any>(url,data)
  }
  getDog(){
    return axios.get(this.url+'/dogs_data')
  }
  data_dog_id(id:any){
    const url=this.url+'/data_dog_id?id='+id
    return this.http.get<any>(url)
  }
  update_dog(data:any){
    const url= this.url+'/update_dogs'
    return this.http.post<any>(url,data)
  }
  show_form(){
    return this.http.get<any>(this.url+'/form_show')
  }
  divided_form(data:any){
    const url=this.url+'/divided_form'
    return this.http.post<any>(url,data)
  }
  giver_register(data:any){
    const url=this.url+'/giver_register'
    return this.http.post<any>(url,data)
  }
  giver_data(){
    return this.http.get<any>(this.url+'/giver_data')
  }
  events_data_adm(){
    return this.http.get<any>(this.url+'/events_data_adm')
  }
  add_events(data:any){
    const url=this.url+'/add_events'
    return this.http.post<any>(url,data)
  }
  update_event(data:any){
    const url=this.url+'/update_event'
    return this.http.post<any>(url,data)
  }

  event_switch(data:any){
    const url=this.url+'/event_switch'
    return this.http.post<any>(url,data)
  }

  village(){
    const url=this.url+'/village'
    return this.http.get<any>(url)
  }

  district(){
    const url=this.url+'/district'
    return this.http.get<any>(url)
  }

  province(){
    const url=this.url+'/province'
    return this.http.get<any>(url)
  }
  login(data:any){
    const url=this.url+'/login_adm'
    return this.http.post<any>(url,data)
  }
  data_donateCash(){
    const url=this.url+'/data_donateCash'
    return this.http.get<any>(url)
  }
  donateCash(data:any){
    const url=this.url+'/donateCash'
    return this.http.post<any>(url,data)
  }
  report_dog(status:any){
    const url=this.url+'/report_dog?status='+status
    return this.http.get<any>(url)
  }
  report_user(){
    const url=this.url+'/report_user'
    return this.http.get<any>(url)
  }
  report_form(status:any){
    const url=this.url+'/report_form?status='+status
    return this.http.get<any>(url)
  }
  report_donate(){
    const url=this.url+'/report_donate'
    return this.http.get<any>(url)
  }
  report_donate_cash(){
    const url=this.url+'/report_donate_cash'
    return this.http.get<any>(url)
  }
  report_giver(){
    const url=this.url+'/report_giver'
    return this.http.get<any>(url)
  }
  delete_event(event_id:any){
    const url=this.url+'/delete_event/'
    return this.http.delete<any>(url+event_id)
  }
  update_giver(data:any){
    const url=this.url+'/update_giver'
    return this.http.post<any>(url,data)
  }
  update_admin(data:any){
    const url=this.url+'/update_admin'
    return this.http.post<any>(url,data)
  }
  add_admin_data(data:any){
    const url=this.url+'/add_admin_data'
    return this.http.post<any>(url,data)
  }
  admin_data(){
    const url=this.url+'/admin_data'
    return this.http.get<any>(url)
  }
}
