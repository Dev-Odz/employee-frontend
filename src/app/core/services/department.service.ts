import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetDepartment, CreateDepartment } from '../../models/department.interface';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private API_URL = `${environment.apiUrl}/department`;

  constructor(private http: HttpClient) { }


  getDepartments(): Observable<GetDepartment> {
    try {
      return this.http.get<GetDepartment>(this.API_URL);
    } catch (error) {
      console.error('Error fetching departments:', error);
      throw error;
    }
  }


  createDepartment(name: string): Observable<CreateDepartment> {
    return this.http.post<CreateDepartment>(this.API_URL, { name });
  }

}
