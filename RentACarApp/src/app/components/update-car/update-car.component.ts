import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CarService } from '../../service/car.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.css']
})
export class UpdateCarComponent implements OnInit{

  fileSize:number = 1024 * 1024; // 1 MB.
  priceValidator = /^\d+(\.\d{1,2})?$/; // pattern to validate numbers up to two decimal places.
  UploadFileSize = 0;
  years: number[] = [];
  updateCarForm!: FormGroup;
  carId: number = this.route.snapshot.params['carId'];
  selectedFile!: File;
  imagePreview!: string | ArrayBuffer | null;
  existingCarImange!: string | ArrayBuffer | null;

  constructor(private carService: CarService, private router: Router, private route: ActivatedRoute){
    let selectedYear = new Date().getFullYear()+1;
    for(let year=selectedYear; year >=2010; year--){
      this.years.push(year);
    }

  }
  ngOnInit(): void {
    this.updateCarForm = new FormGroup({
      make: new FormControl('', [Validators.required]),
      model: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required]),
      color: new FormControl('', [Validators.required]),
      engine: new FormControl('', [Validators.required]),
      fuel: new FormControl('', [Validators.required]),
      transmission: new FormControl('', [Validators.required]),
      price: new FormControl(null, [Validators.pattern(this.priceValidator), Validators.required]),
      image:  new FormControl(null, [this.maxSizeValidator()])
    })

    this.getCarImageById();
    this.previewImage()
  }

  getCarImageById(){
    this.carService.getCarById(this.carId).subscribe((response:any) =>{
      const carDto = response;
      this.existingCarImange = 'data:image/*;base64,' + response.returnedImage;
      this.updateCarForm.patchValue(carDto);
    })
  }

  onSelect(event: any){
    this.selectedFile = event.target.files[0];
    this.UploadFileSize = this.selectedFile.size;
    this.previewImage();
    this.updateCarForm.get('image')?.updateValueAndValidity();
  }
  
  maxSizeValidator(){
    return () => {
      if (this.UploadFileSize > this.fileSize) {
        return { maxSize: true };
      }
      return null;
    };
  }

  previewImage(){
    const reader = new FileReader();
      reader.onload = () =>{
        this.imagePreview = reader.result;
        this.existingCarImange = this.imagePreview;
    } 
      reader.readAsDataURL(this.selectedFile);
  }

  updateCar(){
    if (this.updateCarForm.invalid) {
      return; 
    }

    const formData: FormData = new FormData();
    formData.append('make', this.updateCarForm.get('make')?.value);
    formData.append('model', this.updateCarForm.get('model')?.value);
    formData.append('year', this.updateCarForm.get('year')?.value);
    formData.append('color', this.updateCarForm.get('color')?.value);
    formData.append('engine', this.updateCarForm.get('engine')?.value);
    formData.append('fuel', this.updateCarForm.get('fuel')?.value);
    formData.append('transmission', this.updateCarForm.get('transmission')?.value);
    formData.append('price', this.updateCarForm.get('price')?.value);
    if(this.selectedFile){
      formData.append('image', this.selectedFile);
    }
    
    this.carService.updateCar(this.carId,formData).subscribe(()=>{
      const page = 1;
      const size = 8
      this.router.navigate(['cars', page, size]);
    })
  }

  
}
