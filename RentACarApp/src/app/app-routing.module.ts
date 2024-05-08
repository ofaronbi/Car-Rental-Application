import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostCarComponent } from './post-car/post-car.component';
import { CarDashboardComponent } from './car-dashboard/car-dashboard.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { UpdateCarComponent } from './update-car/update-car.component';

const routes: Routes = [
  {path: 'car/post', component: PostCarComponent},
  {path: 'car/dashboard', component: CarDashboardComponent},
  {path: 'car/:carId', component: CarDetailsComponent},
  {path: 'update/:carId', component: UpdateCarComponent},
  {path: '', redirectTo: '/car/dashboard', pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
