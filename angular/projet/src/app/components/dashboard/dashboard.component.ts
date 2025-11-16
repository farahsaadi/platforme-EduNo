import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AdminService } from '../../services2/admin.service';


@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(public authService: AuthService, private router: Router,private publicationService: AdminService ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // redirige vers login après déconnexion
  }


}
