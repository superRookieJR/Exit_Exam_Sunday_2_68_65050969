import { create } from "zustand";
import { IResponse } from "@/types/interfaces/responses.interface";

interface ResponsesStore {
    data: IResponse[];
    loading: boolean;
    error: string | null;
    selected: IResponse | null;
}

export const useResponsesStore = create<ResponsesStore>((set) => ({
    data: [],
    loading: false,
    error: null,
    selected: null,
}));
