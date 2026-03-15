import { Routes } from '@angular/router';

export const EMPLOYEE_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./dashboard-home/dashboard-home.component')
                .then(m => m.DashboardHomeComponent)
    }
];