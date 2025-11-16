import { Component , OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-products-list',
  standalone: false,
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent implements OnInit {
  produits: any[] = [];
  type: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: AuthService
  ) {}

  ngOnInit(): void {
    // Récupérer le paramètre "type" si présent
    this.type = this.route.snapshot.params['type'] || '';

    if (this.type) {
      // Si un type est défini, filtrer par type
      this.productService.getProductsByType(this.type).subscribe({
        next: (res: any) => this.produits = res,
        error: (err) => console.error(err)
      });
    } else {
      // Sinon, récupérer tous les produits
      this.productService.getProducts().subscribe({
        next: (res: any) => this.produits = res,
        error: (err) => console.error(err)
      });
    }
  }

  // Méthode pour filtrer dynamiquement par type (ex: bouton ou select)
  filterByType(type: string) {
    if (type === '') {
      this.productService.getProducts().subscribe({
        next: (res: any) => this.produits = res
      });
    } else {
      this.productService.getProductsByType(type).subscribe({
        next: (res: any) => this.produits = res
      });
    }
  }
  selectedProduct: any = null;
showDetails = false;
voirDetail(id: number) {
  this.productService.getProductById(id).subscribe({
    next: (data) => {
      this.selectedProduct = data; // un objet, pas un tableau
      this.showDetails = true;
    },
    error: (err) => console.error(err)
  });
}



}
