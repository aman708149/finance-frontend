import axiosInstance from "@/utils/axiosInstance";

export const createNotification = async (data: {
    receiverId: string;
    title: string;
    message: string;
}) => {

    const response = await axiosInstance.post(
        "/admin/add-notification",
        data
    );

    return response.data;

};

export const getNotifications = async () => {

    const response = await axiosInstance.get(
        "/notification/my"
    );

    return response.data;

};

export const markNotificationRead = async (
    id: string
) => {

    const response = await axiosInstance.patch(
        `/notification/read/${id}`
    );

    return response.data;

};