import { useState, useEffect, useCallback } from "react";
import { api } from "@/libs/api.lib";
import { useComplaintTypesStore } from "@/stores/complaint_types.store";
import { CreateComplaintTypeDto, UpdateComplaintTypeDto } from "@/types/dtos/complaint_types.dto";

export const useComplaintTypes = () => {
    const { data, loading, error, selected } = useComplaintTypesStore();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const findAll = useCallback(async () => {
        useComplaintTypesStore.setState({ loading: true, error: null });
        try {
            const response = await api.get("/complaint_types");
            useComplaintTypesStore.setState({ data: response.data, loading: false });
        } catch (err: any) {
            useComplaintTypesStore.setState({
                error: err.response?.data?.error || err.message,
                loading: false,
            });
        }
    }, []);

    const findOne = useCallback(async (id: number) => {
        useComplaintTypesStore.setState({ loading: true, error: null, selected: null });
        try {
            const response = await api.get(`/complaint_types/${id}`);
            useComplaintTypesStore.setState({ selected: response.data, loading: false });
        } catch (err: any) {
            useComplaintTypesStore.setState({
                error: err.response?.data?.error || err.message,
                loading: false,
            });
        }
    }, []);

    const create = useCallback(async (dto: CreateComplaintTypeDto) => {
        setIsSubmitting(true);
        useComplaintTypesStore.setState({ error: null });
        try {
            const response = await api.post("/complaint_types", dto);
            useComplaintTypesStore.setState((state) => ({
                data: [...state.data, response.data],
            }));
            return response.data;
        } catch (err: any) {
            useComplaintTypesStore.setState({
                error: err.response?.data?.error || err.message,
            });
            throw err;
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    const update = useCallback(async (id: number, dto: UpdateComplaintTypeDto) => {
        setIsSubmitting(true);
        useComplaintTypesStore.setState({ error: null });
        try {
            const response = await api.put(`/complaint_types/${id}`, dto);
            useComplaintTypesStore.setState((state) => ({
                data: state.data.map((item) => (item.id === id ? response.data : item)),
                selected: response.data,
            }));
            return response.data;
        } catch (err: any) {
            useComplaintTypesStore.setState({
                error: err.response?.data?.error || err.message,
            });
            throw err;
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    const remove = useCallback(async (id: number) => {
        setIsSubmitting(true);
        useComplaintTypesStore.setState({ error: null });
        try {
            await api.delete(`/complaint_types/${id}`);
            useComplaintTypesStore.setState((state) => ({
                data: state.data.filter((item) => item.id !== id),
                selected: null,
            }));
        } catch (err: any) {
            useComplaintTypesStore.setState({
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
