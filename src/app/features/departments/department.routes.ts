import { Routes } from '@angular/router';

export const EMPLOYEE_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./department-list/department-list.component')
                .then(m => m.DepartmentListComponent)
    }
];