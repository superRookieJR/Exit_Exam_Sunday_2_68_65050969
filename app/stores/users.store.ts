import { create } from "zustand";
import { IUser } from "@/types/interfaces/users.interface";

interface UsersStore {
    data: IUser[];
    loading: boolean;
    error: string | null;
    selected: IUser | null;
}

export const useUsersStore = create<UsersStore>((set) => ({
    data: [],
    loading: false,
    error: null,
    selected: null,
}));
