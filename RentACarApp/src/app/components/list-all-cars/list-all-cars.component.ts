import { Component, OnInit } from '@angular/core';
import { CarService } from '../../service/car.service';
import { Observable } from 'rxjs';
import { Car } from '../module/car';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

const PAGE_SIZE_INCREMENT = 4;
const MAX_PAGE_SIZE = 24;

@Component({
  selector: 'app-list-all-cars',
  templateUrl: './list-all-cars.component.html',
  styleUrls: ['./list-all-cars.component.css']
})
export class ListAllCarsComponent implements OnInit{

  pageNumber: number = 1;
  pageSize: number = 8;
  cars: Car[] = []
  totalpage: number[] = [];
  totalSize: number[] = [];
  searchText: string = '';
  isEmpty: boolean = false;

  constructor(private carService:CarService, private datePipe:DatePipe, 
              private router:ActivatedRoute, private route: Router){
                for(let size=this.pageSize; size<=MAX_PAGE_SIZE; size +=PAGE_SIZE_INCREMENT){
                  this.totalSize.push(size);
                }
              }

  ngOnInit(): void {
    this.router.params.subscribe((params) =>{
      this.searchText = params['searchText'] || '';
      this.pageNumber = params['page'] || 1;
      this.pageSize = params['size'] || 8;
      this.allCars();
    })
  }


  onSearchText(text:string){
    this.cars = [];
    this.searchText = text;
    this.allCars(this.searchText);
  }

  allCars(searchText: string = ''){
    this.carService.getAllCars(searchText,this.pageNumber-1, this.pageSize).subscribe((data:any)=>{
      this.page(data.totalPages);
      this.cars = [];
      data.content.forEach((element:any)=>{
        element.image = 'data:image/*;base64,' + element.returnedImage;
        element.lastUpdated = this.dateFormater(element.lastUpdated);
        this.cars.push(element)
      });
    });
  }


  dateFormater(date: Date | null){
    if(!date){
      return null;
    }
    let dateTime = new Date(date)
    return this.datePipe.transform(dateTime, 'longDate');
  }

  page(pages:number){
    this.totalpage = [];
    for(let page = 1; page <= pages; page++){
      this.totalpage.push(page)
    }
  }

  onPageNumberChange(){
    this.updateUrl();
  }

  onPageSizeChange(){
    this.updateUrl();
  }

  updateUrl(){
    this.route.navigate(['cars/', this.searchText, this.pageNumber, this.pageSize]);
  }
}
