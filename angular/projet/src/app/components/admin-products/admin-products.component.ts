import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-admin-products',
  standalone: false,
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.css'
})
export class AdminProductsComponent implements OnInit{
  produits: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

 loadProducts() {
  this.authService.getProducts().subscribe({
    next: (res: any) => this.produits = res,
    error: (err) => console.error("Erreur lors du chargement des produits :", err)
  });
}

  supprimer(id: number) {
    if (!confirm("Voulez-vous vraiment supprimer ce produit ?")) return;

    this.authService.deletePublication(id).subscribe({
      next: () => {
        alert("Produit supprimé avec succès !");
        this.produits = this.produits.filter(p => p.id !== id);
      },
      error: (err) => console.error(err)
    });
  }

}
