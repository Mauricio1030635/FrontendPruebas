export interface TaskDto {
    id: number;
    name: string;
    description: string;
    completado: boolean;
}

export interface CreateTaskDto {
    name: string;
    description: string;
    completado: boolean;
}

export interface UpdateTaskDto {
    id: number;
    name: string;
    description: string;
    completado: boolean;
    UserId: string;
}