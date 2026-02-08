import { complaints_status } from "@prisma/client";

export interface CreateComplaintDto {
    code: string;
    user_id?: string;
    canteen_id: number;
    stall_id?: number;
    type_id: number;
    details?: string;
}

export interface UpdateComplaintDto {
    code?: string;
    user_id?: string;
    canteen_id?: number;
    stall_id?: number;
    type_id?: number;
    details?: string;
    status?: complaints_status;
}
