import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';

// Components
import { MenuComponent } from './components/menu/menu.component';
import { FeaturedContentComponent } from './components/featured-content/featured-content.component';

// Pages
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/product/list.component';
// import { ServicesComponent } from './pages/services/services.component';
import { UsersComponent } from './pages/users/users.component';
import { ContactComponent } from './pages/contact/contact.component';

@NgModule({
    declarations: [
      MenuComponent,
      FeaturedContentComponent,

      LayoutPageComponent,
      HomeComponent,
      ListComponent,
      // ServicesComponent,
      UsersComponent,
      ContactComponent
    ],
    imports: [
      CommonModule,
      FormsModule,
      
      DashboardRoutingModule
    ]
  })
  export class DashboardModule { }