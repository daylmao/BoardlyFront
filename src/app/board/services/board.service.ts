import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { createTask } from '../interfaces/createTask.interface';
import { Task } from '../interfaces/task.interface';
import { TaskDetails } from '../interfaces/taskDetails.interface';

@Injectable({ providedIn: 'root' })
export class BoardService {
  private http = inject(HttpClient);
  private readonly baseUrl = environment.BASE_URL;

  deleteTask(projectId: string): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/tasks/${projectId}`);
  }

  createTask(formData: FormData): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/tasks`, formData);
  }

  getTaskById(taskId: string): Observable<TaskDetails> {
    return this.http.get<TaskDetails>(`${this.baseUrl}/tasks/${taskId}/info`);
  }
  updateTaskById(
    taskId: string,
    request: Partial<TaskDetails>
  ): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/tasks/${taskId}`, request);
  }
}
