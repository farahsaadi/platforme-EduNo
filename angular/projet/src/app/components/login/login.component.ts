import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = {
    email: '',
    mot_de_passe: ''
  };
step: any;

 constructor(public authService: AuthService, private router: Router) {}


 onSubmit() {
  this.authService.login(this.credentials).subscribe({
    next: (res: any) => {
      console.log('Utilisateur connecté :', res);

      this.authService.currentUser = res.user;

      if (res.role === "admin") {
        this.router.navigate(['/dashboard/users']);
      } else {
        this.router.navigate(['/acceuil']);
      }
    },
    error: (err) => {
      alert(err.error.message);
    }
  });
}

}
