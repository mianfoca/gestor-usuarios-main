import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './product/list.component';
import { UsersComponent } from './users/users.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';

//Login
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'list', component: ListComponent},
  {path: 'profile', component: UsersComponent},
  {path: 'contact', component: ContactComponent},
  {
    path:'',
    redirectTo : 'login',
    pathMatch:'full'
  },
  {
    path:'login',
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
