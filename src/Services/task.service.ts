import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskDto, CreateTaskDto, UpdateTaskDto } from '../Models/ModelTask';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    private apiUrl = environment.apiUrlTask;

    constructor(private http: HttpClient) { }

    getToken(): HttpHeaders {
        const token = localStorage.getItem('token');
        let headers = new HttpHeaders();
        if (token) {
            headers = headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }

    getTasksByUserId(userId: string): Observable<TaskDto[]> {
        let headers = this.getToken()
        return this.http.get<TaskDto[]>(`${this.apiUrl}/GetTasksByUserId/${userId}`, { headers });
    }

    getTaskById(id: number): Observable<TaskDto> {
        let headers = this.getToken()
        return this.http.get<TaskDto>(`${this.apiUrl}/GetTaskById/${id}`, { headers });
    }

    createTask(createTaskDto: CreateTaskDto): Observable<TaskDto> {
        let headers = this.getToken()
        return this.http.post<TaskDto>(this.apiUrl, createTaskDto, { headers });
    }

    updateTask(updateTaskDto: UpdateTaskDto): Observable<TaskDto> {
        let headers = this.getToken()
        return this.http.put<TaskDto>(this.apiUrl, updateTaskDto, { headers });
    }

    deleteTask(id: number): Observable<void> {
        let headers = this.getToken()
        return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
    }
}