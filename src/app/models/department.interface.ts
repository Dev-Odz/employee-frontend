export interface GetDepartment {
    success: boolean;
    status: number;
    message: string;
    data: [Department];
}


export interface Department {
    id: number;
    name: string;
}


export interface CreateDepartment {
    success: boolean;
    status: number;
    message: string;
    data: {
        id: number;
        name: string;
        updatedAt: string;
        createdAt: string;
    }

}