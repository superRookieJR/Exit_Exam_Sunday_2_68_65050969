import { create } from "zustand";
import { IRole } from "@/types/interfaces/roles.interface";

interface RolesStore {
    data: IRole[];
    loading: boolean;
    error: string | null;
    selected: IRole | null;
}

export const useRolesStore = create<RolesStore>((set) => ({
    data: [],
    loading: false,
    error: null,
    selected: null,
}));
