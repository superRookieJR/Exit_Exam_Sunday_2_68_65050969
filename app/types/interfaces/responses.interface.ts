export interface IResponse {
    id: string;
    user_id?: string | null;
    complaint_id?: string | null;
    message: string;
    created_at: Date | null;
}
