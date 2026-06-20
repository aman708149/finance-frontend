// services/partner.service.ts

import axiosInstance from '@/utils/axiosInstance';

export interface PartnerOnboardingPayload {
    fullName: string;
    email: string;
    mobileNumber: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    accountHolderName: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    branchName: string;
}

export const partnerOnboardingService = async (
    payload: PartnerOnboardingPayload,
) => {
    const response = await axiosInstance.post(
        '/signup/partner-onboarding',
        payload,
    );

    return response.data;
};