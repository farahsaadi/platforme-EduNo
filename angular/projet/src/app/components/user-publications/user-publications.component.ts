import { Component ,OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-user-publications',
  standalone: false,
  templateUrl: './user-publications.component.html',
  styleUrl: './user-publications.component.css'
})
export class UserPublicationsComponent implements OnInit {
  publications: any[] = [];
  selectedPublication: any = null;
  showDetails = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const currentUser = this.authService.getUser();
    if (currentUser) {
      this.authService.getProductsByUser(currentUser.id).subscribe({
        next: (res: any) => this.publications = res,
        error: (err) => console.error(err)
      });
    }
  }

  voirDetail(pub: any) {
    this.selectedPublication = pub;
    this.showDetails = true;
  }

  supprimer(id: number) {
  if (!confirm("Voulez-vous vraiment supprimer cette publication ?")) return;

  console.log("Suppression ID :", id); // debug
  this.authService.deletePublication(id).subscribe({
    next: () => {
      this.publications = this.publications.filter(p => p.id !== id);
      console.log("Publication supprimée avec succès");
    },
    error: (err) => console.error("Erreur suppression :", err)
  });
}
  modifier(pub: any) {
    this.selectedPublication = { ...pub };
    this.showDetails = true;
  }

  saveModification() {
  this.authService.updatePublication(this.selectedPublication.id, this.selectedPublication).subscribe({
    next: () => {
      alert("Publication mise à jour !");
      this.showDetails = false;
      const index = this.publications.findIndex(p => p.id === this.selectedPublication.id);
      if (index !== -1) this.publications[index] = { ...this.selectedPublication };
    },
    error: (err) => console.error("Erreur mise à jour :", err)
  });
}

}