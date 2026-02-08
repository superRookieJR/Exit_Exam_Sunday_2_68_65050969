export interface CreateStallDto {
    name: string;
    canteen_id: number;
}

export interface UpdateStallDto {
    name?: string;
    canteen_id?: number;
}
