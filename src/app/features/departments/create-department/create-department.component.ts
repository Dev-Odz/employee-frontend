import { Component, OnInit, output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { DepartmentService } from '../../../core/services/department.service';


@Component({
  selector: 'app-create-department',
  imports: [ReactiveFormsModule],
  templateUrl: './create-department.component.html',
  styleUrl: './create-department.component.scss'
})
export class CreateDepartmentComponent implements OnInit {
  departmentFormGroup!: FormGroup;
  onSubmitOutput = output<void>();

  constructor(private fb: FormBuilder, private departmentService: DepartmentService) { }

  ngOnInit(): void {
    this.departmentFormGroup = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    });
  }


  onSubmit() {
    if (this.departmentFormGroup.valid) {
      const { name } = this.departmentFormGroup.value;
      try {
        this.departmentService.createDepartment(name).subscribe({
          next: (response) => {
            console.log('Department created:', response);
            // Emit an event to notify the parent component to refresh the department list
            this.onSubmitOutput.emit();
          },
          error: (error) => {
            console.error('Failed to create department', error);
          }
        });
      } catch (error) {
        console.error('An unexpected error occurred', error);
      }
    }
  }



}
