import { useState, useEffect, useCallback } from "react";
import { api } from "@/libs/api.lib";
import { useRolesStore } from "@/stores/roles.store";
import { CreateRoleDto, UpdateRoleDto } from "@/types/dtos/roles.dto";

export const useRoles = () => {
    const { data, loading, error, selected } = useRolesStore();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const findAll = useCallback(async () => {
        useRolesStore.setState({ loading: true, error: null });
        try {
            const response = await api.get("/roles");
            useRolesStore.setState({ data: response.data, loading: false });
        } catch (err: any) {
            useRolesStore.setState({
                error: err.response?.data?.error || err.message,
                loading: false,
            });
        }
    }, []);

    const findOne = useCallback(async (id: number) => {
        useRolesStore.setState({ loading: true, error: null, selected: null });
        try {
            const response = await api.get(`/roles/${id}`);
            useRolesStore.setState({ selected: response.data, loading: false });
        } catch (err: any) {
            useRolesStore.setState({
                error: err.response?.data?.error || err.message,
                loading: false,
            });
        }
    }, []);

    const create = useCallback(async (dto: CreateRoleDto) => {
        setIsSubmitting(true);
        useRolesStore.setState({ error: null });
        try {
            const response = await api.post("/roles", dto);
            useRolesStore.setState((state) => ({
                data: [...state.data, response.data],
            }));
            return response.data;
        } catch (err: any) {
            useRolesStore.setState({
                error: err.response?.data?.error || err.message,
            });
            throw err;
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    const update = useCallback(async (id: number, dto: UpdateRoleDto) => {
        setIsSubmitting(true);
        useRolesStore.setState({ error: null });
        try {
            const response = await api.put(`/roles/${id}`, dto);
            useRolesStore.setState((state) => ({
                data: state.data.map((item) => (item.id === id ? response.data : item)),
                selected: response.data,
            }));
            return response.data;
        } catch (err: any) {
            useRolesStore.setState({
                error: err.response?.data?.error || err.message,
            });
            throw err;
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    const remove = useCallback(async (id: number) => {
        setIsSubmitting(true);
        useRolesStore.setState({ error: null });
        try {
            await api.delete(`/roles/${id}`);
            useRolesStore.setState((state) => ({
                data: state.data.filter((item) => item.id !== id),
                selected: null,
            }));
        } catch (err: any) {
            useRolesStore.setState({
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
