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


  //http://localhost:8080/v1/api/cars?pageNumber=0&pageSize=10
  getAllCars(page: number, size: number):Observable<Car>{
    return this.httpClient.get<Car>(`${this.baseUrl}/cars?pageNumber=${page}&pageSize=${size}`)
  }


  //http://localhost:8080/v1/api/car/{{carId}}
  getCar(carId: number):Observable<Car>{
    return this.httpClient.get<Car>(`${this.baseUrl}/car/${carId}`)
  }

}
