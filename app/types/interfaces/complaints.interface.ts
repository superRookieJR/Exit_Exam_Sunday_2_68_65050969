import { complaints_status } from "@prisma/client";
import { ICanteen } from "./canteens.interface";
import { IStall } from "./stalls.interface";
import { IComplaintType } from "./complaint_types.interface";
import { IUser } from "./users.interface";
import { IResponse } from "./responses.interface";

export interface IComplaint {
    id: string;
    code: string;
    user_id?: string | null;
    canteen_id: number;
    stall_id?: number | null;
    type_id: number;
    details?: string | null;
    status: complaints_status | null;
    created_at: Date | null;
    updated_at: Date | null;
    canteens?: ICanteen;
    stalls?: IStall | null;
    complaint_types?: IComplaintType;
    users?: IUser | null;
    responses?: IResponse[];
}
