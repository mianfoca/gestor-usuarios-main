import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/product/list.component';
// import { ServicesComponent } from './pages/services/services.component';
import { UsersComponent } from './pages/users/users.component';
import { ContactComponent } from './pages/contact/contact.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'list-products', component: ListComponent },
      // {path: 'list-services', component: ServicesComponent},
      { path: 'profile', component: UsersComponent },
      { path: 'contact', component: ContactComponent },
      { path: '**', redirectTo: 'home' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }