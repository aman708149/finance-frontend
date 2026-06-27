import { useEffect, useState } from "react";
import { getNotifications } from "@/services/notification.service";
import { socket } from "@/socket/socket";
import { Notification } from "@/types/notification";

export function useNotifications() {

    const [notifications, setNotifications] =
        useState<Notification[]>([]);

    useEffect(() => {

        loadNotifications();

    }, []);

    const loadNotifications = async () => {
        const data = await getNotifications();
        setNotifications(data);

    };

    useEffect(() => {

        socket.on(

            "notification",

            (notification) => {

                setNotifications(prev => [

                    notification,

                    ...prev,

                ]);

            }

        );

        return () => {

            socket.off("notification");

        };

    }, []);

    return {

        notifications,

        setNotifications,

    };

}