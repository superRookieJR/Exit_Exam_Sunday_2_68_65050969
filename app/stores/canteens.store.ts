import { create } from "zustand";
import { ICanteen } from "@/types/interfaces/canteens.interface";

interface CanteensStore {
    data: ICanteen[];
    loading: boolean;
    error: string | null;
    selected: ICanteen | null;
}

export const useCanteensStore = create<CanteensStore>((set) => ({
    data: [],
    loading: false,
    error: null,
    selected: null,
}));
