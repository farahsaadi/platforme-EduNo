import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-product',
  standalone: false,
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
   produit = {
    id_user: '',
    titre: '',
    description: '',
    categorie: '',
    prix: null,
    type_annonce: '',
    localisation: ''
  };

  constructor(public authService: AuthService) {}

  onSubmit() {
    if (!this.authService.currentUser) {
      alert("Vous devez être connecté pour publier un produit !");
      return;
    }

    this.produit.id_user = this.authService.currentUser.id;

    this.authService.addPublication(this.produit).subscribe({
      next: (res: any) => {
        alert("Votre publication est envoyée à l’admin pour validation !");
        // Réinitialiser le formulaire
        this.produit = {
          id_user: '',
          titre: '',
          description: '',
          categorie: '',
          prix: null,
          type_annonce: '',
          localisation: ''
        };
      },
      error: (err) => console.error(err)
    });
  }
 

}
