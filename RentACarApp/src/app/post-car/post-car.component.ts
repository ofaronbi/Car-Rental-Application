import { Component } from '@angular/core';
import { Car } from '../module/car';
import { CarService } from '../service/car.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-car',
  templateUrl: './post-car.component.html',
  styleUrls: ['./post-car.component.css']
})
export class PostCarComponent {

  selectedFile!: File;
  imagePreview!: string | ArrayBuffer | null;

  constructor(private carService: CarService, private router: Router){}

  carForm: FormGroup = new FormGroup({
    make: new FormControl(''),
    model: new FormControl(''),
    year: new FormControl(''),
    color: new FormControl(''),
    engine: new FormControl(''),
    fuel: new FormControl(''),
    transmission: new FormControl(''),
    price: new FormControl(null),
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

      setInterval(()=>{
        this.router.navigateByUrl("/car/dashboard");
      }, 3000);
      
    })
  
  }

}
