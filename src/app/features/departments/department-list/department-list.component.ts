import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../../core/services/department.service';
import { Department } from './../../../models/department.interface';
import { CommonModule } from '@angular/common';
import { CreateDepartmentComponent } from '../create-department/create-department.component';

@Component({
  selector: 'app-department-list',
  imports: [CommonModule, CreateDepartmentComponent],
  templateUrl: './department-list.component.html',
  styleUrl: './department-list.component.scss'
})
export class DepartmentListComponent implements OnInit {

  departments = <Department[]>[];
  isShowAddDepartment = false;

  constructor(private departmentService: DepartmentService) { }


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.getDepartments();

  }



  getDepartments() {
    this.departmentService.getDepartments().subscribe({
      next: (data) => {
        this.departments = data.data;
      },
      error: (err) => {
        console.error('Failed to load departments', err);
      }
    });


  }

  onAddDepartment() {

    this.isShowAddDepartment = true;

  }


  onRefreshData() {
    this.isShowAddDepartment = false;
    this.getDepartments();
  }

}
