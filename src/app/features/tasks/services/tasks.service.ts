import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class TasksService {
  private readonly http = inject(HttpClient);

  public getAll() {
    return this.http.get('/tasks');
  }
}
