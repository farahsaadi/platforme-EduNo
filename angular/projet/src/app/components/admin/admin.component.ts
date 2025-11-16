import { Component,OnInit } from '@angular/core';
import { AdminService } from '../../services2/admin.service';
@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
   users: any[] = [];
   constructor(private adminService: AdminService) {}
 ngOnInit(): void {
    this.loadUsers();
  }
  loadUsers() {
    this.adminService.getAllUsers().subscribe(data => this.users = data);
  }

  deleteUser(id: number) {
    if (confirm("Voulez-vous supprimer cet utilisateur ?")) {
      this.adminService.deleteUser(id).subscribe(() => {
        this.loadUsers();
      });
    }
  }
}
