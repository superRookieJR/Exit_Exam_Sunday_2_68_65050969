import { useState, useEffect, useCallback } from "react";
import { api } from "@/libs/api.lib";
import { useDepartmentsStore } from "@/stores/departments.store";
import { CreateDepartmentDto, UpdateDepartmentDto } from "@/types/dtos/departments.dto";

export const useDepartments = () => {
    const { data, loading, error, selected } = useDepartmentsStore();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const findAll = useCallback(async () => {
        useDepartmentsStore.setState({ loading: true, error: null });
        try {
            const response = await api.get("/departments");
            useDepartmentsStore.setState({ data: response.data, loading: false });
        } catch (err: any) {
            useDepartmentsStore.setState({
                error: err.response?.data?.error || err.message,
                loading: false,
            });
        }
    }, []);

    const findOne = useCallback(async (id: number) => {
        useDepartmentsStore.setState({ loading: true, error: null, selected: null });
        try {
            const response = await api.get(`/departments/${id}`);
            useDepartmentsStore.setState({ selected: response.data, loading: false });
        } catch (err: any) {
            useDepartmentsStore.setState({
                error: err.response?.data?.error || err.message,
                loading: false,
            });
        }
    }, []);

    const create = useCallback(async (dto: CreateDepartmentDto) => {
        setIsSubmitting(true);
        useDepartmentsStore.setState({ error: null });
        try {
            const response = await api.post("/departments", dto);
            useDepartmentsStore.setState((state) => ({
                data: [...state.data, response.data],
            }));
            return response.data;
        } catch (err: any) {
            useDepartmentsStore.setState({
                error: err.response?.data?.error || err.message,
            });
            throw err;
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    const update = useCallback(async (id: number, dto: UpdateDepartmentDto) => {
        setIsSubmitting(true);
        useDepartmentsStore.setState({ error: null });
        try {
            const response = await api.put(`/departments/${id}`, dto);
            useDepartmentsStore.setState((state) => ({
                data: state.data.map((item) => (item.id === id ? response.data : item)),
                selected: response.data,
            }));
            return response.data;
        } catch (err: any) {
            useDepartmentsStore.setState({
                error: err.response?.data?.error || err.message,
            });
            throw err;
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    const remove = useCallback(async (id: number) => {
        setIsSubmitting(true);
        useDepartmentsStore.setState({ error: null });
        try {
            await api.delete(`/departments/${id}`);
            useDepartmentsStore.setState((state) => ({
                data: state.data.filter((item) => item.id !== id),
                selected: null,
            }));
        } catch (err: any) {
            useDepartmentsStore.setState({
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
