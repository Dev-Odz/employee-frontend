import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../../core/services/employee.service';
import { DisplayEmployeeComponent } from '../display-employee/display-employee.component';
import { Employee, UpdateEmployee } from '../../../models/employee.interface';
import { OkCancelComponent } from '../../../shared/components/dialog/ok-cancel/ok-cancel.component';
import { UpdateEmployeeComponent } from '../update-employee/update-employee.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, DisplayEmployeeComponent, OkCancelComponent, UpdateEmployeeComponent],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent implements OnInit {

  loading = false;
  employees: Employee[] = [];
  selectedEmployee: Employee | null = null;
  rawData: any;
  isDeleteDialogOpen = false;
  isUpdateDialogOpen = false;
  employeeToDelete: Employee | null = null;

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {

    this.loading = true;

    setTimeout(() => {
      this.employeeService.getEmployees().subscribe(res => this.employees = res.data.data, err => {
        if (err.status === 401) {
          this.router.navigate(['/auth/login']);
        } else {
          console.error('Failed to fetch employees', err);
        }
      }
      );
      this.loading = false;
    }, 1000);

  }


  onEmployeeClick(emp: Employee) {

    this.selectedEmployee = emp;
    this.isUpdateDialogOpen = false;

  }

  onDeleteEmployee(emp: Employee) {
    this.employeeToDelete = emp;
    this.isDeleteDialogOpen = true;
  }

  onDeleteConfirm() {

    if (this.employeeToDelete) {
      this.employeeService.deleteEmployee(this.employeeToDelete.id!).subscribe({
        next: () => {
          this.isDeleteDialogOpen = false;
          this.employeeToDelete = null;
          this.onRefreshData();
          this.selectedEmployee = null;
        },
        error: (err) => {
          console.error('Failed to delete employee', err);
        }
      });
    }


  }

  onCancelDelete() {

    this.isDeleteDialogOpen = false;

  }

  onEditEmployee(emp: Employee) {
    this.selectedEmployee = emp;
    this.isUpdateDialogOpen = true;

  
  }

  onRefreshData() {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data.data.data;
      },
      error: (err) => {
        console.error('Failed to refresh employees', err);
      }
    });
  }

  onUpdateEmployee(updateEmployee: UpdateEmployee) {
    if (updateEmployee) {
      this.employeeService.updateEmployee(this.selectedEmployee!.id!, updateEmployee).subscribe({
        next: (updatedEmployee) => {
          console.log('Employee updated successfully', updatedEmployee);
          this.onRefreshData();
          this.isUpdateDialogOpen = false;
          this.selectedEmployee = null;
        },
        error: (err) => {
          this.isUpdateDialogOpen = false;
          console.error('Failed to update employee', err);
        }
      });
    }
  }
}