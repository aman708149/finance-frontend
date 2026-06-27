import axiosInstance from "@/utils/axiosInstance";

export const getNotifications = async () => {

    const res =
        await axiosInstance.get(
            "/notification/my"
        );

    return res.data;
};