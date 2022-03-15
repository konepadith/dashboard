import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http : HttpClient) { }
  bigChart(){
    return [{
      name: 'Asia',
      data: [502, 635, 809, 947, 1402, 3634, 5268]
  }, {
      name: 'Africa',
      data: [106, 107, 111, 133, 221, 767, 1766]
  }, {
      name: 'Europe',
      data: [163, 203, 276, 408, 547, 729, 628]
  }, {
      name: 'America',
      data: [18, 31, 54, 156, 339, 818, 1201]
  }, {
      name: 'Oceania',
      data: [2, 2, 2, 6, 13, 30, 46]
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
    const url ='http://localhost:3000/mailing'
    return this.http.post<any>(url,data)
  }
  receive(){
    const url = 'http://localhost:3000/show_mail'
    return this.http.get<any>(url)
  }
  readmail(receivemail_id:any){
    const url = 'http://localhost:3000/read_mail?receivemail_id='+receivemail_id
    return this.http.get<any>(url)
  }
  dogs_data(){
    return this.http.get<any>('http://localhost:3000/dogs_data')
  }
}
