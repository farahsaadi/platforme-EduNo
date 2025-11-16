import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of,Observable, tap } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
   private apiUrl = 'http://localhost:3000/api/users';
 // ton backend Node.js
currentUser: any = null;
  constructor(private http: HttpClient ) {}

  register(userData: any): Observable<any> {
       return this.http.post('http://localhost:3000/auth/register', userData);     
  }

  login(credentials: any) {
  return this.http.post('http://localhost:3000/auth/login', credentials)
    .pipe(
      tap((res: any) => {
        this.currentUser = res.user;
      })
    );
}

   /*saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }*/

  logout() {
    this.currentUser = null;
  }

  // Vérifie si connecté
  isLoggedIn(): boolean {
    return this.currentUser != null;
  }


  // 🔹 Nouvelle méthode pour récupérer les infos utilisateur depuis le token
  getUser(): any {
  return this.currentUser; // currentUser sera défini après login
}


getProfile(): Observable<any> {
  return of(this.currentUser); // renvoie l’utilisateur stocké
}
updateProfile(data: any): Observable<any> {
  return this.http.put('http://localhost:3000/auth/update-profile', data).pipe(
    tap((res: any) => {
      if (res.user) {
        this.currentUser = { ...this.currentUser, ...res.user };
      }
    })
  );
}

 getPending() {
  return this.http.get<any[]>('http://localhost:3000/auth/pending');
}
  getProducts() {
    return this.http.get('http://localhost:3000/auth/produits');
  }

  // Produit par type : vente / don / echange
  getProductsByType(type: string) {
 return this.http.get(`http://localhost:3000/auth/type/${type}`);

}
  getProductsByUser(id_user: number) {
  return this.http.get(`http://localhost:3000/auth/user/${id_user}`);
}
addPublication(produit: any) {
  return this.http.post('http://localhost:3000/auth/add-publication', produit);
}

getProductById(id: number) {
  return this.http.get(`http://localhost:3000/auth/product/${id}`);
}
 deletePublication(id: number) {
  return this.http.delete(`http://localhost:3000/auth/publication/${id}`);
}

updatePublication(id: number, data: any) {
  return this.http.put(`http://localhost:3000/auth/publication/${id}`, data);
}
// Récupérer les images d'un produit
getProductImages(id_produit: number) {
  return this.http.get<any[]>(`http://localhost:3000/auth/publication/${id_produit}/images`);
}

// Upload d'une image
uploadProductImage(id_produit: number, file: File) {
  const formData = new FormData();
  formData.append('image', file);
  return this.http.post(`http://localhost:3000/auth/publication/${id_produit}/upload-image`, formData);
}


}
