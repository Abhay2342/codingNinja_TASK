import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://codingninja-task.onrender.com/api/users/tasks'; // Ensure this URL matches your API

  constructor(private http: HttpClient) {}

  getTasks(userEmail: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?userEmail=${userEmail}`);
  }
  

  createTask(task: any, userEmail: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { ...task, userEmail });
  }

  deleteTask(taskId: string, userEmail: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${taskId}?userEmail=${userEmail}`);
  }

  updateTask(taskId: string, updates: any, userEmail: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${taskId}?userEmail=${userEmail}`, updates);
  }
}
