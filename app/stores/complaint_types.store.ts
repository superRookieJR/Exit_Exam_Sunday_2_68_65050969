import { create } from "zustand";
import { IComplaintType } from "@/types/interfaces/complaint_types.interface";

interface ComplaintTypesStore {
    data: IComplaintType[];
    loading: boolean;
    error: string | null;
    selected: IComplaintType | null;
}

export const useComplaintTypesStore = create<ComplaintTypesStore>((set) => ({
    data: [],
    loading: false,
    error: null,
    selected: null,
}));
