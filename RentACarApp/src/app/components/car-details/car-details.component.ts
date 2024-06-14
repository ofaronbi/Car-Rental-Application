import { Component, OnInit } from '@angular/core';
import { Car } from '../module/car';
import { CarService } from '../../service/car.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit{

  carId: number = +this.router.snapshot.params['carId']!;
  car!: Car;
  returnedImage!: string | ArrayBuffer | null;
  message:string = 'The home page cars can not be deleted!';
  delete: boolean = false;

  constructor(private carService: CarService, private router: ActivatedRoute, private route: Router){}


  ngOnInit(): void {
    this.getCarById();
  }

  getCarById(){
    this.carService.getCarById(this.carId).subscribe((response:any)=>{
      this.car = response;
      if(this.car && response.returnedImage){
        this.car.image = 'data:image/*;base64,' + response.returnedImage;
      }
    })
  }

  deleteCar(){
    if(this.carId >=5){
      this.carService.deleteCar(this.carId).subscribe(()=>{
        this.delete = true;
        setTimeout(()=>{
          const page = 1;
          const size = 8
          this.delete = false;
          this.route.navigate(['cars', page, size]);
        }, 2000);
      })
    }
  }
}
