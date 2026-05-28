import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// validate token
export const validateResetToken = (token: string) => {
    return axios.post(
        `${BASE_URL}/auth/validate-reset-token`,
        {
            token,
        }
    );
};

// reset password
export const resetPassword = (
    token: string,
    password: string
) => {
    return axios.post(
        `${BASE_URL}/auth/reset-password`,
        {
            token,
            password,
        }
    );
};