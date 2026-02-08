import { create } from "zustand";
import { IStall } from "@/types/interfaces/stalls.interface";

interface StallsStore {
    data: IStall[];
    loading: boolean;
    error: string | null;
    selected: IStall | null;
}

export const useStallsStore = create<StallsStore>((set) => ({
    data: [],
    loading: false,
    error: null,
    selected: null,
}));
