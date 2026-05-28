import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const registerOtp = async (data: { email: string }) => {
  const response = await axios.post(
    `${BASE_URL}/initialize-admin/register-otp`,
    data
  );

  return response.data;
};

const signupAdmin = async (data: {
  email: string;
  emailOtp: string;
  prefix: string;
}) => {
  const response = await axios.post(
    `${BASE_URL}/initialize-admin/signup`,
    data
  );

  return response.data;
};

const service = {
  registerOtp,
  signupAdmin,
};

export default service;