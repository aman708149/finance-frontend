import type { Metadata } from "next";
import "./globals.css";

import ReduxProvider from "@/store/provider";

import {
  ToastContainer,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import SocketProvider from "@/socket/SocketProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">

      <body>

        <ReduxProvider>
          <SocketProvider>

            {children}

            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              pauseOnHover
              draggable
              theme="dark"
              aria-label="Notification"
            />

          </SocketProvider>
        </ReduxProvider>

      </body>

    </html>
  );
}