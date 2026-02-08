import { useState, useEffect, useCallback } from "react";
import { api } from "@/libs/api.lib";
import { useStallsStore } from "@/stores/stalls.store";
import { CreateStallDto, UpdateStallDto } from "@/types/dtos/stalls.dto";

export const useStalls = () => {
    const { data, loading, error, selected } = useStallsStore();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const findAll = useCallback(async () => {
        useStallsStore.setState({ loading: true, error: null });
        try {
            const response = await api.get("/stalls");
            useStallsStore.setState({ data: response.data, loading: false });
        } catch (err: any) {
            useStallsStore.setState({
                error: err.response?.data?.error || err.message,
                loading: false,
            });
        }
    }, []);

    const findOne = useCallback(async (id: number) => {
        useStallsStore.setState({ loading: true, error: null, selected: null });
        try {
            const response = await api.get(`/stalls/${id}`);
            useStallsStore.setState({ selected: response.data, loading: false });
        } catch (err: any) {
            useStallsStore.setState({
                error: err.response?.data?.error || err.message,
                loading: false,
            });
        }
    }, []);

    const create = useCallback(async (dto: CreateStallDto) => {
        setIsSubmitting(true);
        useStallsStore.setState({ error: null });
        try {
            const response = await api.post("/stalls", dto);
            useStallsStore.setState((state) => ({
                data: [...state.data, response.data],
            }));
            return response.data;
        } catch (err: any) {
            useStallsStore.setState({
                error: err.response?.data?.error || err.message,
            });
            throw err;
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    const update = useCallback(async (id: number, dto: UpdateStallDto) => {
        setIsSubmitting(true);
        useStallsStore.setState({ error: null });
        try {
            const response = await api.put(`/stalls/${id}`, dto);
            useStallsStore.setState((state) => ({
                data: state.data.map((item) => (item.id === id ? response.data : item)),
                selected: response.data,
            }));
            return response.data;
        } catch (err: any) {
            useStallsStore.setState({
                error: err.response?.data?.error || err.message,
            });
            throw err;
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    const remove = useCallback(async (id: number) => {
        setIsSubmitting(true);
        useStallsStore.setState({ error: null });
        try {
            await api.delete(`/stalls/${id}`);
            useStallsStore.setState((state) => ({
                data: state.data.filter((item) => item.id !== id),
                selected: null,
            }));
        } catch (err: any) {
            useStallsStore.setState({
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
