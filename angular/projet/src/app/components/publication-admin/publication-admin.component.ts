import { Component,OnInit } from '@angular/core';
import { AdminService } from '../../services2/admin.service';


@Component({
  selector: 'app-publication-admin',
  standalone: false,
  templateUrl: './publication-admin.component.html',
  styleUrl: './publication-admin.component.css'
})
export class PublicationAdminComponent implements OnInit {

  publications: any[] = [];

  constructor(private publicationService: AdminService ) {}

  ngOnInit(): void {
    this.getPublications();
  }

  // Récupération des publications
  getPublications() {
  this.publicationService.getPending().subscribe({
    next: (data) => this.publications = data,
    error: (err) => console.error(err)
  });
}


  // Accepter une publication
  accept(id: number) {
    this.publicationService.accept(id).subscribe({
      next: () => {
        alert('Publication acceptée ✔');
        this.getPublications();  // refresh liste
      },
      error: (err) => console.error('Erreur acceptation', err)
    });
  }

  // Rejeter/Supprimer publication
  reject(id: number) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ?')) return;

    this.publicationService.reject(id).subscribe({
      next: () => {
        alert('Publication supprimée ❌');
        this.getPublications(); // refresh liste
      },
      error: (err) => console.error('Erreur suppression', err)
    });
  }
}
