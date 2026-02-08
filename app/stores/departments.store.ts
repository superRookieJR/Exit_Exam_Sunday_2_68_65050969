import { create } from "zustand";
import { IDepartment } from "@/types/interfaces/departments.interface";

interface DepartmentsStore {
    data: IDepartment[];
    loading: boolean;
    error: string | null;
    selected: IDepartment | null;
}

export const useDepartmentsStore = create<DepartmentsStore>((set) => ({
    data: [],
    loading: false,
    error: null,
    selected: null,
}));
