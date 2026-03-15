import { CommonModule } from '@angular/common';
import { Component, OnInit, input, output } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { OkCancelComponent } from '../../../shared/components/dialog/ok-cancel/ok-cancel.component';
import { Employee, UpdateEmployee } from '../../../models/employee.interface';

@Component({
  selector: 'app-update-employee',
  imports: [CommonModule, ReactiveFormsModule, OkCancelComponent],
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.scss'
})
export class UpdateEmployeeComponent implements OnInit {
  updateFOrmGroup!: FormGroup;
  isShowDialog = false;
  isUpdateEmployee = output<UpdateEmployee>();
  employee = input<Employee | null>();

  ngOnInit(): void {
    // Initialize the form
    this.updateFOrmGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
    });

    // If there's an employee, update the form
    if (this.employee()) {
      this.updateFOrmGroup.patchValue({
        name: this.employee()!.name,
        email: this.employee()!.email,
      });
    }
  }

  // This will run when the input changes
  ngOnChanges() {
    if (this.updateFOrmGroup && this.employee()) {
      this.updateFOrmGroup.patchValue({
        name: this.employee()!.name,
        email: this.employee()!.email,
      });
    }
  }

  onUpdateEmployee() {
    if (this.updateFOrmGroup.valid) {
      this.isShowDialog = true;
    }
  }

  onOkayDialog() {

    

    this.isUpdateEmployee.emit({
      name: this.updateFOrmGroup.value.name,
      email: this.updateFOrmGroup.value.email,
    });
    this.isShowDialog = false;
  }

  onCancelDialog() {
    this.isUpdateEmployee.emit({
      name: this.employee()!.name,
      email: this.employee()!.email,
    });
    this.isShowDialog = false;
  }
}