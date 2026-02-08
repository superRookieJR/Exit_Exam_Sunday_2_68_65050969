export interface CreateUserDto {
    email: string;
    first_name: string;
    last_name: string;
    role_id: number;
}

export interface UpdateUserDto {
    email?: string;
    first_name?: string;
    last_name?: string;
    role_id?: number;
}
