import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostCarComponent } from './components/post-car/post-car.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CarDashboardComponent } from './components/car-dashboard/car-dashboard.component'
import { DatePipe } from '@angular/common';
import { CarDetailsComponent } from './car-details/car-details.component';
import { UpdateCarComponent } from './components/update-car/update-car.component';
import { ListAllCarsComponent } from './components/list-all-cars/list-all-cars.component';

@NgModule({
  declarations: [
    AppComponent,
    PostCarComponent,
    CarDashboardComponent,
    CarDetailsComponent,
    UpdateCarComponent,
    ListAllCarsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule
  
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
