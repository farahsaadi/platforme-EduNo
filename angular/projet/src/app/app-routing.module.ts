import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
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












const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] ,
     children: [
      { path: 'admin/dashboard', component: AdminComponent },
      { path: 'users', component: UserAdminComponent,canActivate: [AuthGuard]},
      { path: 'pub', component: PublicationAdminComponent,canActivate: [AuthGuard]},
      { path: 'liste', component: ProductsListComponent,canActivate: [AuthGuard]},
      { path: 'aaa', component:AdminProductsComponent,canActivate: [AuthGuard]  },


     ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'profil', component:ProfileComponent},
  { path: 'admin/dashboard', component: AdminComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'liste', component: ProductsListComponent},
  { path: 'add', component:AddProductComponent },
  { path: 'user-public', component:UserPublicationsComponent  },
  { path: 'acceuil', component:AcceuilComponent  },
  



 



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
