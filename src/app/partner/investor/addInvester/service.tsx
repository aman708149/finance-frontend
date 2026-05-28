import axiosInstance from "@/utils/axiosInstance";

export const sendInvestorOtp = (
    email: string
) => {

    return axiosInstance.post(
        "/partner/investor/send-otp",
        { email }
    );
};

export const verifyInvestorOtp = (
    email: string,
    otp: string
) => {

    return axiosInstance.post(
        "/partner/investor/verify-otp",
        {
            email,
            otp,
        }
    );
};

export const completeInvestor = (
    data: any
) => {

    return axiosInstance.post(
        "/partner/investor/complete",
        data
    );
};