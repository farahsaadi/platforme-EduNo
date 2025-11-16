import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
   user = {
    nom: '',
    email: '',
    mot_de_passe: '',
    type_user: '',
    telephone: '',
    adresse: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.register(this.user).subscribe({
      next: res => {
        alert('Compte créé avec succès 🎉');
        this.router.navigate(['/login']);
      },
      error: err => alert(err.error.message)
    });
  }

}
