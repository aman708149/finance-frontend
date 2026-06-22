import axiosInstance from "@/utils/axiosInstance";

export const getAllPartnerOnboardings = async (
    page = 1,
    limit = 10,
    search = ""
) => {
    const response = await axiosInstance.get(
        `/admin/partner/onboarding?page=${page}&limit=${limit}&search=${search}`
    );

    return response.data;
};

export const getPartnerOnboardingByUserId = async (
    userId: string
) => {
    const response = await axiosInstance.get(
        `/admin/partner/onboarding/${userId}`
    );

    return response.data;
};

export const updatePartnerOnboarding = async (
    userId: string,
    payload: any
) => {
    const response = await axiosInstance.post(
        `/admin/partner/onboarding/${userId}`,
        payload
    );

    return response.data;
};

export const verifyPartner = async (
    userId: string,
) => {
    const response = await axiosInstance.post(
        `/admin/partner/verify/${userId}`
    );

    return response.data;
};