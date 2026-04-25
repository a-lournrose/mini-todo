import { inject, Injectable, signal } from '@angular/core';
import { User } from '@core/models/user.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';

interface GetMeResponse {
  id: string;
  username: string;
  email: string;
  created_at: string;
}

const USER_LOCAL_STORAGE_KEY = 'user';

@Injectable({providedIn: 'root'})
export class UserService {
  private readonly http = inject(HttpClient);

  public loadCurrentUser(): Observable<User>   {
    return this.http.get<GetMeResponse>('/users/me').pipe(
      map(this.mapUser),
      tap((user) => {
        localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));
      })
    );
  }

  public getUserInfo(): User | null {
    const user = localStorage.getItem(USER_LOCAL_STORAGE_KEY);

    return user ? JSON.parse(user) as User : null;
  }

  public clear(): void {
    localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
  }

  private mapUser(response: GetMeResponse): User {
    const {id, username, email, created_at} = response;

    return {
      id,
      username,
      email,
      createdAt: new Date(created_at),
    }
  }
}
