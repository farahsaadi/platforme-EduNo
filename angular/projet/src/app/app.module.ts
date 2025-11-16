import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './components/admin/admin.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserAdminComponent } from './components/user-admin/user-admin.component';
import { PublicationAdminComponent } from './components/publication-admin/publication-admin.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { UserPublicationsComponent } from './components/user-publications/user-publications.component';
import { AcceuilComponent } from './components/acceuil/acceuil.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    ProfileComponent,
    AdminComponent,
    NavbarComponent,
    UserAdminComponent,
    PublicationAdminComponent,
    ProductsListComponent,
    AddProductComponent,
    UserPublicationsComponent,
    AcceuilComponent,
    AdminProductsComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
     HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
