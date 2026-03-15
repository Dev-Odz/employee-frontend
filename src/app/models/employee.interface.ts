import { Department } from './department.interface';


export interface GetEmployeesResponse extends Array<Employee> {
    success: boolean;
    status: number;
    message: string;
    data: {
        total: number;
        page: number;
        limit: number;
        data: Employee[];
    };
}


export interface Employee {
    id?: number;
    name: string;
    email: string;
    password?: string;
    role: string;
    departmentId: number;
    department?: Department;
}

export interface UpdateEmployee {
    name?: string;
    email?: string;
    password?: string;
}


