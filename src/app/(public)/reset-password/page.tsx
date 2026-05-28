"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { validateResetToken } from "./service";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // validate token on page load
    useEffect(() => {
        if (!token) {
            setError("Invalid reset link");
            return;
        }

        validateToken();
    }, []);

    const validateToken = async () => {
        try {
            await validateResetToken(token as string);
        } catch (err: any) {
            setError(
                err?.response?.data?.message ||
                "Invalid or expired token"
            );
        }
    };

    const handleResetPassword = async () => {
        try {
            setError("");
            setMessage("");

            if (!password || !confirmPassword) {
                return setError("All fields are required");
            }

            if (password.length < 6) {
                return setError(
                    "Password must be at least 6 characters"
                );
            }

            if (password !== confirmPassword) {
                return setError("Passwords do not match");
            }

            setLoading(true);

            const res = await axios.post(
                `${BASE_URL}/auth/reset-password`,
                {
                    token,
                    password,
                }
            );

            setMessage(
                res?.data?.message ||
                "Password reset successfully"
            );

            setTimeout(() => {
                router.push("/login");
            }, 2000);

        } catch (err: any) {
            setError(
                err?.response?.data?.message ||
                "Failed to reset password"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
            <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">

                <h2 className="text-2xl font-bold text-center mb-6 text-black">
                    Reset Password
                </h2>

                {error && (
                    <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}

                {message && (
                    <div className="bg-green-100 text-green-600 p-3 rounded mb-4 text-sm">
                        {message}
                    </div>
                )}

                {!error && (
                    <div className="space-y-4">

                        {/* New Password */}
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="New Password"
                                className="w-full border rounded-lg p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            >
                                {showPassword ? (
                                    <FaEyeSlash size={18} />
                                ) : (
                                    <FaEye size={18} />
                                )}
                            </button>
                        </div>

                        {/* Confirm Password */}
                        <div className="relative">
                            <input
                                type={
                                    showConfirmPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Confirm Password"
                                className="w-full border rounded-lg p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(
                                        !showConfirmPassword
                                    )
                                }
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            >
                                {showConfirmPassword ? (
                                    <FaEyeSlash size={18} />
                                ) : (
                                    <FaEye size={18} />
                                )}
                            </button>
                        </div>

                        <button
                            onClick={handleResetPassword}
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition"
                        >
                            {loading
                                ? "Updating..."
                                : "Reset Password"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}