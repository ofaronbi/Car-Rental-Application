import { Component, OnInit } from '@angular/core';
import { Car } from '../../module/car';
import { CarService } from '../../service/car.service';
import { DatePipe } from '@angular/common';
import { Slider } from '../../module/slider';



@Component({
  selector: 'app-car-dashboard',
  templateUrl: './car-dashboard.component.html',
  styleUrls: ['./car-dashboard.component.css']
})


export class CarDashboardComponent implements OnInit{

  cars:Car[] = [];
  pageNumber: number = 0;
  pageSize: number = 10;

  firstValue!: number;
  secondValue!: number;
  thirdValue!: number;
  previousValue!: number;


  constructor(private carService : CarService, private datePipe: DatePipe){}


  getAllCars(){
    this.carService.getAllCars(this.pageNumber, this.pageSize).subscribe((data:any)=>{
      data.content.forEach((element:any) => {
        element.image = 'data:image/*;base64,' + element.returnedImage;
        element.lastUpdated = this.dateFormat(element.lastUpdated);
        this.cars.push(element);
      });
      this.slideShow(this.cars?.length);
    });
  
  }

  ngOnInit(): void {
    this.getAllCars();
    
    }
  

    slideShow(size: number){
      const slider = new Slider();
      slider.carSize = size;

      slider.subscribeToValues((values: { first: number, second: number, third: number, previous: number }) => {
        this.firstValue = values.first;
        this.secondValue = values.second;
        this.thirdValue = values.third;
        this.previousValue = values.previous;
    });
    }


  dateFormat(date: Date | null){
    if(!date){
      return null;
    }
    let dateTime = new Date(date)
    return this.datePipe.transform(dateTime, 'longDate');
  }



}
