import { Component } from '@angular/core';
import { Car } from '../module/car';
import { CarService } from '../service/car.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-post-car',
  templateUrl: './post-car.component.html',
  styleUrls: ['./post-car.component.css']
})
export class PostCarComponent {

  fileSize!:number;
  priceValidator = /^\d+(\.\d{1,2})?$/;
  tempFileSize = 0.02;
  years: number[] = [];


  selectedFile!: File;
  imagePreview!: string | ArrayBuffer | null;

  constructor(private carService: CarService, private router: Router){
    let selectedYear = new Date().getFullYear()+1;
    for(let year=selectedYear; year >=2010; year--){
      this.years.push(year);
    }

  }

  carForm: FormGroup = new FormGroup({
    make: new FormControl('', [Validators.required]),
    model: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
    color: new FormControl('', [Validators.required]),
    engine: new FormControl('', [Validators.required]),
    fuel: new FormControl('', [Validators.required]),
    transmission: new FormControl('', [Validators.required]),
    price: new FormControl(null, [Validators.pattern(this.priceValidator), Validators.required]),
    image:  new FormControl('')
  })

  onSelect(event: any){
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }
  
  previewImage(){
    const reader = new FileReader();
      reader.onload = () =>{
        this.imagePreview = reader.result;
    } 
      reader.readAsDataURL(this.selectedFile);
  }

  postCar(){
    const formData: FormData = new FormData();
    formData.append('make', this.carForm.get('make')?.value);
    formData.append('model', this.carForm.get('model')?.value);
    formData.append('year', this.carForm.get('year')?.value);
    formData.append('color', this.carForm.get('color')?.value);
    formData.append('engine', this.carForm.get('engine')?.value);
    formData.append('fuel', this.carForm.get('fuel')?.value);
    formData.append('transmission', this.carForm.get('transmission')?.value);
    formData.append('price', this.carForm.get('price')?.value);
    formData.append('image', this.selectedFile);

    this.carService.postACar(formData).subscribe(()=>{
      const page = 1;
      const size = 8
      this.router.navigate(['cars', page, size]);
    })
  }

}
