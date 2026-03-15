import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UpdateEmployee } from '../../models/employee.interface';
import { environment } from '../../../environments/environment';

export interface Employee {
  id?: number;
  name: string;
  email: string;
  password?: string;
  role: string;
  departmentId: number;
  department?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private API_URL = `${environment.apiUrl}/auth/users`;

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<any> {
    return this.http.get(this.API_URL);
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.API_URL}/${id}`);
  }

  createEmployee(data: Partial<Employee>): Observable<Employee> {
    return this.http.post<Employee>(this.API_URL, data);
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  updateEmployee(id: number, data: Partial<UpdateEmployee>): Observable<UpdateEmployee> {
    return this.http.put<UpdateEmployee>(`${this.API_URL}/${id}`, data);
  }
}