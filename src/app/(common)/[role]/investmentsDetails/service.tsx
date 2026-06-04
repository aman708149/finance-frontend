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
    role: string,
    page = 1,
    limit = 10
) => {

    let endpoint = "/investments";
    // Partner
    if (role === "partner") {
        endpoint = "/partner/investor";
    }

    // Investor
    else if (role === "invester") {
        endpoint = "/investments";
    }

    // Super Admin
    else if (role === "admin") {

        endpoint = "/admin/investments";
    }

    const response =
        await axiosInstance.get(
            `${endpoint}?page=${page}&limit=${limit}`
        );

    return response.data;
};