import type { Metadata } from "next";
import "./globals.css";

import ReduxProvider from "@/store/provider";

import {
  ToastContainer,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">

      <body>

        <ReduxProvider>

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

        </ReduxProvider>

      </body>

    </html>
  );
}