import { Component,OnInit  } from '@angular/core';
import { AuthService } from '../services/auth.service'; // ✅ correct
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  [x: string]: any;
 
  user: any = null;
  message: string = '';
  editMode = false;
  flashMessage: string = '';

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    if (!this.user) this.router.navigate(['/login']);
  }
   enableEdit() {
    this.editMode = true;
  }
  cancelEdit() {
    this.editMode = false;
  }

  enregistrer() {
    this.authService.updateProfile(this.user).subscribe({
      next: (res) => {
        this.user = res.user;
        this.editMode = false;
        this.showMessage('✅ Profil mis à jour avec succès !');
      },
      error: () => this.showMessage('❌ Erreur lors de la mise à jour.')
    });
  }
  logout() {
    this.authService.logout();
    this.showMessage('⚡ Vous êtes déconnecté.');
    setTimeout(() => this.router.navigate(['/login']), 1000); // redirection après 1s
  }
  showMessage(msg: string) {
    this.flashMessage = msg;
    setTimeout(() => this.flashMessage = '', 3000); // disparaît après 3s
  }
}


