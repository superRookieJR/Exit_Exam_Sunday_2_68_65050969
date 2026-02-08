import { create } from "zustand";
import { IComplaint } from "@/types/interfaces/complaints.interface";

interface ComplaintsStore {
    data: IComplaint[];
    loading: boolean;
    error: string | null;
    selected: IComplaint | null;
}

export const useComplaintsStore = create<ComplaintsStore>((set) => ({
    data: [],
    loading: false,
    error: null,
    selected: null,
}));
