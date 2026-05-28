import axios from "axios";

const baseurl = process.env.NEXT_PUBLIC_BASE_URL;

/**
 * SEND OTP
 */
export const SendOtpForPartnerSignup = async (data: { email: string }) => {
    return await axios.post(`${baseurl}/signup/send-otp`, data);
};

/**
 * VERIFY OTP
 */
export const VerifyOtpForPartnerSignup = async (data: {
    email: string;
    otp: string;
}) => {
    return await axios.post(`${baseurl}/signup/verify-otp`, data);
};

/**
 * COMPLETE SIGNUP
 */
export const CompletePartnerSignup = async (data: {
    email: string;
    password: string;
    fullName: string;
}) => {
    return await axios.post(`${baseurl}/signup/complete`, data);
};

/**
 * RESET PASSWORD
 */
export const ResetPartnerPassword = async (data: { email: string }) => {
    return await axios.post(`${baseurl}/signup/reset-password`, data);
};