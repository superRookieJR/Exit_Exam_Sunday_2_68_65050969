export interface CreateCanteenDto {
    code: string;
    name: string;
    position_id: number;
}

export interface UpdateCanteenDto {
    code?: string;
    name?: string;
    position_id?: number;
}
