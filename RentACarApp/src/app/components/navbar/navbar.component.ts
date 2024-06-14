import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{

  searchText: string = '';

  page: number = 1;
  size: number = 8;

  constructor(private router: Router){}


  onClick(){
    this.router.navigate(['cars/', this.searchText, this.page, this.size]);
  }

}
