import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from '../module/car';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {


  private baseUrl = 'http://localhost:8080/v1/api'

  constructor(private httpClient: HttpClient) { }

  postACar(formData: any):Observable<any>{
    return this.httpClient.post(`${this.baseUrl}/post/car`, formData)
  }


  getAllCars(page: number, size: number):Observable<Car>{
    return this.httpClient.get<Car>(`${this.baseUrl}/cars?pageNumber=${page}&pageSize=${size}`)
  }

  
  getCarById(carId: number):Observable<Car>{
    return this.httpClient.get<Car>(`${this.baseUrl}/car/${carId}`)
  }

  updateCar(carId: number, formData:any):Observable<any>{
    return this.httpClient.put(`${this.baseUrl}/update/car/${carId}`, formData);
  }

  deleteCar(carId: number):Observable<Car>{
    return this.httpClient.delete<Car>(`${this.baseUrl}/delete/car/${carId}`);
  }
}
