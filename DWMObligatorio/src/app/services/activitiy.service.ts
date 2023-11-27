import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Activity } from "../interfaces/activity";
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivitiyService {
  constructor(private http: HttpClient) { }

  private activitiesUrl = `http://${environment.url}:3000/activities`;

  getActivity(token: string): Observable<Activity[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Activity[]>(this.activitiesUrl, { headers });
  }

  getActivityByID(token: string): Observable<Activity[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    return this.http.get<Activity[]>(this.activitiesUrl, { headers });
  }

  addActivity(token: string, newActivity: Activity): Observable<Activity> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    return this.http.post<Activity>(this.activitiesUrl, newActivity, { headers });
  }

  modificarActivity(token: string, updatedActivity: Activity): Observable<Activity> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = `${this.activitiesUrl}/${updatedActivity.id}`;
    return this.http.patch<Activity>(url, updatedActivity, { headers });
  }

  eliminarActivity(token: string, id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = `${this.activitiesUrl}/${id}`;
    return this.http.delete(url, { headers });
  }
}
