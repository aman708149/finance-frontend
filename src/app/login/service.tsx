import axios from "axios";

const baseurl = process.env.NEXT_PUBLIC_BASE_URL;

/**
 * LOGIN USER
 */
export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  return await axios.post(`${baseurl}/auth/login`, data);
};

/**
 * FORGOT PASSWORD
 */
export const forgotPassword = async (data: {
  email: string;
}) => {
  return await axios.post(
    `${baseurl}/auth/forgot-password`,
    data
  );
};