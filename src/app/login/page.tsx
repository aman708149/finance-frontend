"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { forgotPassword, loginUser } from "./service";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { setUser } from "@/store/authSlice";
import { useDispatch } from "react-redux";

export enum Role {
    SUPER_ADMIN = "super_admin",
    PARTNER = "partner",
    INVESTER = "invester",
}

export default function Page() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [showForgotModal, setShowForgotModal] = useState(false);
    const [forgotEmail, setForgotEmail] = useState("");
    const [forgotLoading, setForgotLoading] = useState(false);
    const [forgotMessage, setForgotMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();

    const handleLogin = async () => {
        try {
            setLoading(true);
            setError("");

            const res = await loginUser({
                email,
                password,
            });

            const { accessToken, refreshToken } = res.data;
            const payload = JSON.parse(atob(accessToken.split(".")[1]));
            const role = payload.role;
            dispatch(
                setUser({
                    userId: payload.sub,
                    role,
                    accessToken,
                    refreshToken,
                })
            );

            // console.log("role is", role);

            sessionStorage.setItem("accessToken", accessToken);
            sessionStorage.setItem("refreshToken", refreshToken);
            sessionStorage.setItem("role", role);

            // cookie for middleware
            document.cookie = `accessToken=${accessToken}; path=/`;
            document.cookie = `role=${role}; path=/`;

            // decode token
            if (role === Role.SUPER_ADMIN) {
                router.push("/admin");
            }
            else if (role === Role.PARTNER) {
                router.push("/partner");
            }
            else if (role === Role.INVESTER) {
                router.push("/investor");
            } else {
                router.push("/");
            }
        } catch (err: any) {
            setError(err?.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async () => {
        try {
            setForgotLoading(true);
            setForgotMessage("");

            const res = await forgotPassword({
                email: forgotEmail,
            });

            setForgotMessage(
                res?.data?.message ||
                "Reset link sent successfully"
            );

        } catch (error: any) {
            setForgotMessage(
                error?.response?.data?.message ||
                "Failed to send reset link"
            );
        } finally {
            setForgotLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
            <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">

                <h2 className="text-2xl font-bold text-center mb-6 text-black">
                    Finance Portal Login
                </h2>

                {error && (
                    <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}

                <div className="space-y-4">

                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="w-full border rounded-lg p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                        </button>
                    </div>

                    <button
                        onClick={handleLogin}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={() => router.push("/partnersignup")}
                            className="text-sm text-blue-600 hover:underline hover:cursor-pointer"
                        >
                            Signup
                        </button>

                        <button
                            type="button"
                            onClick={() => setShowForgotModal(true)}
                            className="text-sm text-blue-600 hover:underline hover:cursor-pointer"
                        >
                            Forgot Password?
                        </button>
                    </div>
                </div>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Secure Finance Access Portal
                </p>

            </div>

            {showForgotModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">

                        <h3 className="text-xl font-bold mb-4 text-black">
                            Forgot Password
                        </h3>

                        <input
                            type="email"
                            placeholder="Enter your registered email"
                            value={forgotEmail}
                            onChange={(e) => setForgotEmail(e.target.value)}
                            className="w-full border rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {forgotMessage && (
                            <div className="mt-3 text-sm text-green-600">
                                {forgotMessage}
                            </div>
                        )}

                        <div className="flex justify-end gap-3 mt-5">

                            <button
                                onClick={() => {
                                    setShowForgotModal(false);
                                    setForgotEmail("");
                                    setForgotMessage("");
                                }}
                                className="px-4 py-2 rounded-lg border text-black hover:cursor-pointer"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleForgotPassword}
                                disabled={forgotLoading}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg hover:cursor-pointer"
                            >
                                {forgotLoading
                                    ? "Sending..."
                                    : "Send Reset Link"}
                            </button>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}