import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from '../../../models/employee.interface';


@Component({
  selector: 'app-display-employee',
  imports: [CommonModule],
  templateUrl: './display-employee.component.html',
  styleUrl: './display-employee.component.scss',
})
export class DisplayEmployeeComponent {

  employee = input<Employee>();



}
