import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }
  getAllUsers(): Observable<any> {
    return this.http.get('http://localhost:3000/auth/all-users');
  }

  deleteUser(id: number): Observable<any> {
return this.http.delete(`http://localhost:3000/auth/delete-user/${id}`);
  }
  getPending() {
  return this.http.get<any[]>("http://localhost:3000/auth/pending");
}

accept(id: number) {
  return this.http.put(`http://localhost:3000/auth/accept/${id}`, {});
}

reject(id: number) {
  return this.http.delete(`http://localhost:3000/auth/reject/${id}`);
}

}



