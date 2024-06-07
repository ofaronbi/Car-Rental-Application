import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostCarComponent } from './components/post-car/post-car.component';
import { CarDashboardComponent } from './components/car-dashboard/car-dashboard.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { UpdateCarComponent } from './components/update-car/update-car.component';
import { ListAllCarsComponent } from './components/list-all-cars/list-all-cars.component';

const routes: Routes = [
  {path: 'car/post', component: PostCarComponent},
  {path: 'car/dashboard', component: CarDashboardComponent},
  {path: 'car/:carId', component: CarDetailsComponent},
  {path: 'update/:carId', component: UpdateCarComponent},
  {path:'cars/:page/:size', component: ListAllCarsComponent},
  {path: '', redirectTo: '/car/dashboard', pathMatch:'full'},

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
