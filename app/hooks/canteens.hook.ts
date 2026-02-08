import { useState, useEffect, useCallback } from "react";
import { api } from "@/libs/api.lib";
import { useCanteensStore } from "@/stores/canteens.store";
import { CreateCanteenDto, UpdateCanteenDto } from "@/types/dtos/canteens.dto";

export const useCanteens = () => {
    const { data, loading, error, selected } = useCanteensStore();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const findAll = useCallback(async () => {
        useCanteensStore.setState({ loading: true, error: null });
        try {
            const response = await api.get("/canteens");
            useCanteensStore.setState({ data: response.data, loading: false });
        } catch (err: any) {
            useCanteensStore.setState({
                error: err.response?.data?.error || err.message,
                loading: false,
            });
        }
    }, []);

    const findOne = useCallback(async (id: number) => {
        useCanteensStore.setState({ loading: true, error: null, selected: null });
        try {
            const response = await api.get(`/canteens/${id}`);
            useCanteensStore.setState({ selected: response.data, loading: false });
        } catch (err: any) {
            useCanteensStore.setState({
                error: err.response?.data?.error || err.message,
                loading: false,
            });
        }
    }, []);

    const create = useCallback(async (dto: CreateCanteenDto) => {
        setIsSubmitting(true);
        useCanteensStore.setState({ error: null });
        try {
            const response = await api.post("/canteens", dto);
            useCanteensStore.setState((state) => ({
                data: [...state.data, response.data],
            }));
            return response.data;
        } catch (err: any) {
            useCanteensStore.setState({
                error: err.response?.data?.error || err.message,
            });
            throw err;
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    const update = useCallback(async (id: number, dto: UpdateCanteenDto) => {
        setIsSubmitting(true);
        useCanteensStore.setState({ error: null });
        try {
            const response = await api.put(`/canteens/${id}`, dto);
            useCanteensStore.setState((state) => ({
                data: state.data.map((item) => (item.id === id ? response.data : item)),
                selected: response.data,
            }));
            return response.data;
        } catch (err: any) {
            useCanteensStore.setState({
                error: err.response?.data?.error || err.message,
            });
            throw err;
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    const remove = useCallback(async (id: number) => {
        setIsSubmitting(true);
        useCanteensStore.setState({ error: null });
        try {
            await api.delete(`/canteens/${id}`);
            useCanteensStore.setState((state) => ({
                data: state.data.filter((item) => item.id !== id),
                selected: null,
            }));
        } catch (err: any) {
            useCanteensStore.setState({
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
