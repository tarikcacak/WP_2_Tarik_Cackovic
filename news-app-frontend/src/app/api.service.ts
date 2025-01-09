import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:8000/project/index.php';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}?action=login`, { email, password });
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}?action=register`, { username, email, password });
  }

  getNews(type?: string, page: number = 1, limit: number = 12): Observable<any> {
    return this.http.get(`${this.baseUrl}?action=getNews&type=${type || ''}&page=${page}&limit=${limit}`);
  }

  getNewsByDate(date: string, page: number = 1, limit: number = 12): Observable<any> {
    return this.http.get(`${this.baseUrl}?action=getNewsByDate&date=${date}&page=${page}&limit=${limit}`);
  }

  addNews(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}?action=addNews`, data);
  }

  editNews(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}?action=editNews`, data);
  }

  makeAdmin(userId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}?action=makeAdmin`, { id: userId });
  }

  removeAdmin(userId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}?action=removeAdmin`, { id: userId });
  }

  changePassword(email: string, oldPassword: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.baseUrl}?action=changePassword`, { email, oldPassword, newPassword });
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}?action=getUsers`);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}?action=deleteUser&id=${userId}`);
  }
}
