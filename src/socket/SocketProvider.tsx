"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { socket } from "./socket";
import { RootState } from "@/store";

export default function SocketProvider({
    children,
}: {
    children: React.ReactNode;
}) {

    const { userId } = useSelector(
        (state: RootState) => state.auth
    );

    useEffect(() => {

        socket.connect();

        if (userId) {

            socket.emit("join", {
                userId,
            });

        }

        return () => {
            socket.disconnect();
        };

    }, [userId]);

    return children;
}