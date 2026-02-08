import { useState, useEffect, useCallback } from "react";
import { api } from "@/libs/api.lib";
import { useComplaintsStore } from "@/stores/complaints.store";
import { CreateComplaintDto, UpdateComplaintDto } from "@/types/dtos/complaints.dto";

export const useComplaints = () => {
    const { data, loading, error, selected } = useComplaintsStore();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const findAll = useCallback(async () => {
        useComplaintsStore.setState({ loading: true, error: null });
        try {
            const response = await api.get("/complaints");
            useComplaintsStore.setState({ data: response.data, loading: false });
        } catch (err: any) {
            useComplaintsStore.setState({
                error: err.response?.data?.error || err.message,
                loading: false,
            });
        }
    }, []);

    const findOne = useCallback(async (id: string) => {
        useComplaintsStore.setState({ loading: true, error: null, selected: null });
        try {
            const response = await api.get(`/complaints/${id}`);
            useComplaintsStore.setState({ selected: response.data, loading: false });
        } catch (err: any) {
            useComplaintsStore.setState({
                error: err.response?.data?.error || err.message,
                loading: false,
            });
        }
    }, []);

    const create = useCallback(async (dto: CreateComplaintDto) => {
        setIsSubmitting(true);
        useComplaintsStore.setState({ error: null });
        try {
            const response = await api.post("/complaints", dto);
            useComplaintsStore.setState((state) => ({
                data: [...state.data, response.data],
            }));
            return response.data;
        } catch (err: any) {
            useComplaintsStore.setState({
                error: err.response?.data?.error || err.message,
            });
            throw err;
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    const update = useCallback(async (id: string, dto: UpdateComplaintDto) => {
        setIsSubmitting(true);
        useComplaintsStore.setState({ error: null });
        try {
            const response = await api.put(`/complaints/${id}`, dto);
            useComplaintsStore.setState((state) => ({
                data: state.data.map((item) => (item.id === id ? response.data : item)),
                selected: response.data,
            }));
            return response.data;
        } catch (err: any) {
            useComplaintsStore.setState({
                error: err.response?.data?.error || err.message,
            });
            throw err;
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    const remove = useCallback(async (id: string) => {
        setIsSubmitting(true);
        useComplaintsStore.setState({ error: null });
        try {
            await api.delete(`/complaints/${id}`);
            useComplaintsStore.setState((state) => ({
                data: state.data.filter((item) => item.id !== id),
                selected: null,
            }));
        } catch (err: any) {
            useComplaintsStore.setState({
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
