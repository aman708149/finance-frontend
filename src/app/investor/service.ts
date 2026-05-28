import axiosInstance from "@/utils/axiosInstance";

export interface CreateInvestmentPayload {
    investorId: string;
    partnerId: string;
    amount: number;
    roiPercent: number;
    durationMonths: number;
    remarks?: string;
}

export const createInvestment = async (
    payload: CreateInvestmentPayload
) => {
    const response = await axiosInstance.post(
        "/investments/create",
        payload
    );

    return response.data;
};

export const getAllInvestments = async (
    page = 1,
    limit = 10
) => {

    const response = await axiosInstance.get(
        `/investments?page=${page}&limit=${limit}`
    );

    return response.data;
};