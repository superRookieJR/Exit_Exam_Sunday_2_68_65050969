import { useState, useEffect, useCallback } from "react";
import { api } from "@/libs/api.lib";
import { useResponsesStore } from "@/stores/responses.store";
import { CreateResponseDto, UpdateResponseDto } from "@/types/dtos/responses.dto";

export const useResponses = () => {
    const { data, loading, error, selected } = useResponsesStore();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const findAll = useCallback(async () => {
        useResponsesStore.setState({ loading: true, error: null });
        try {
            const response = await api.get("/responses");
            useResponsesStore.setState({ data: response.data, loading: false });
        } catch (err: any) {
            useResponsesStore.setState({
                error: err.response?.data?.error || err.message,
                loading: false,
            });
        }
    }, []);

    const findOne = useCallback(async (id: string) => {
        useResponsesStore.setState({ loading: true, error: null, selected: null });
        try {
            const response = await api.get(`/responses/${id}`);
            useResponsesStore.setState({ selected: response.data, loading: false });
        } catch (err: any) {
            useResponsesStore.setState({
                error: err.response?.data?.error || err.message,
                loading: false,
            });
        }
    }, []);

    const create = useCallback(async (dto: CreateResponseDto) => {
        setIsSubmitting(true);
        useResponsesStore.setState({ error: null });
        try {
            const response = await api.post("/responses", dto);
            useResponsesStore.setState((state) => ({
                data: [...state.data, response.data],
            }));
            return response.data;
        } catch (err: any) {
            useResponsesStore.setState({
                error: err.response?.data?.error || err.message,
            });
            throw err;
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    const update = useCallback(async (id: string, dto: UpdateResponseDto) => {
        setIsSubmitting(true);
        useResponsesStore.setState({ error: null });
        try {
            const response = await api.put(`/responses/${id}`, dto);
            useResponsesStore.setState((state) => ({
                data: state.data.map((item) => (item.id === id ? response.data : item)),
                selected: response.data,
            }));
            return response.data;
        } catch (err: any) {
            useResponsesStore.setState({
                error: err.response?.data?.error || err.message,
            });
            throw err;
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    const remove = useCallback(async (id: string) => {
        setIsSubmitting(true);
        useResponsesStore.setState({ error: null });
        try {
            await api.delete(`/responses/${id}`);
            useResponsesStore.setState((state) => ({
                data: state.data.filter((item) => item.id !== id),
                selected: null,
            }));
        } catch (err: any) {
            useResponsesStore.setState({
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
