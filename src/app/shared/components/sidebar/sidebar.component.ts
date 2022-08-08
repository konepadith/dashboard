import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  admin_info=JSON.parse(localStorage.getItem("user") || "[]")
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  logout(){
    localStorage.clear()
    this.router.navigate(['login'])
  }
}
