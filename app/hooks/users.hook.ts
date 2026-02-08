import { useState, useEffect, useCallback } from "react";
import { api } from "@/libs/api.lib";
import { useUsersStore } from "@/stores/users.store";
import { CreateUserDto, UpdateUserDto } from "@/types/dtos/users.dto";

export const useUsers = () => {
    const { data, loading, error, selected } = useUsersStore();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const findAll = useCallback(async () => {
        useUsersStore.setState({ loading: true, error: null });
        try {
            const response = await api.get("/users");
            useUsersStore.setState({ data: response.data, loading: false });
        } catch (err: any) {
            useUsersStore.setState({
                error: err.response?.data?.error || err.message,
                loading: false,
            });
        }
    }, []);

    const findOne = useCallback(async (id: string) => {
        useUsersStore.setState({ loading: true, error: null, selected: null });
        try {
            const response = await api.get(`/users/${id}`);
            useUsersStore.setState({ selected: response.data, loading: false });
        } catch (err: any) {
            useUsersStore.setState({
                error: err.response?.data?.error || err.message,
                loading: false,
            });
        }
    }, []);

    const create = useCallback(async (dto: CreateUserDto) => {
        setIsSubmitting(true);
        useUsersStore.setState({ error: null });
        try {
            const response = await api.post("/users", dto);
            useUsersStore.setState((state) => ({
                data: [...state.data, response.data],
            }));
            return response.data;
        } catch (err: any) {
            useUsersStore.setState({
                error: err.response?.data?.error || err.message,
            });
            throw err;
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    const update = useCallback(async (id: string, dto: UpdateUserDto) => {
        setIsSubmitting(true);
        useUsersStore.setState({ error: null });
        try {
            const response = await api.put(`/users/${id}`, dto);
            useUsersStore.setState((state) => ({
                data: state.data.map((item) => (item.id === id ? response.data : item)),
                selected: response.data,
            }));
            return response.data;
        } catch (err: any) {
            useUsersStore.setState({
                error: err.response?.data?.error || err.message,
            });
            throw err;
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    const remove = useCallback(async (id: string) => {
        setIsSubmitting(true);
        useUsersStore.setState({ error: null });
        try {
            await api.delete(`/users/${id}`);
            useUsersStore.setState((state) => ({
                data: state.data.filter((item) => item.id !== id),
                selected: null,
            }));
        } catch (err: any) {
            useUsersStore.setState({
                error: err.response?.data?.error || err.message,
            });
            throw err;
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    return {
        data,
        loading,
        error,
        selected,
        isSubmitting,
        findAll,
        findOne,
        create,
        update,
        remove,
    };
};
