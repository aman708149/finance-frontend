"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { forgotPassword, loginUser } from "./service";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaArrowRight, FaShieldAlt, FaChartLine, FaUsers, FaWallet, FaCheckCircle } from "react-icons/fa";
import { setUser } from "@/store/authSlice";
import { useDispatch } from "react-redux";
import Image from "next/image";

export enum Role {
    ADMIN = "admin",
    PARTNER = "partner",
    INVESTER = "invester",
}

export default function LoginPage() {
    const router = useRouter();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showForgotModal, setShowForgotModal] = useState(false);
    const [forgotEmail, setForgotEmail] = useState("");
    const [forgotLoading, setForgotLoading] = useState(false);
    const [forgotMessage, setForgotMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    // Load saved email if remember me was checked
    useEffect(() => {
        const savedEmail = localStorage.getItem("rememberedEmail");
        if (savedEmail) {
            setEmail(savedEmail);
            setRememberMe(true);
        }
    }, []);

    const handleLogin = async () => {
        if (!email || !password) {
            setError("Please enter both email and password");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const res = await loginUser({ email, password });
            const { accessToken, refreshToken } = res.data;
            const payload = JSON.parse(atob(accessToken.split(".")[1]));
            const role = payload.role;

            dispatch(setUser({
                userId: payload.userId,
                email: payload.email,
                role: payload.role,
                accessToken,
                refreshToken,
            }));

            // Store in sessionStorage
            sessionStorage.setItem("accessToken", accessToken);
            sessionStorage.setItem("refreshToken", refreshToken);
            sessionStorage.setItem("role", role);

            // Store in cookies for middleware
            document.cookie = `accessToken=${accessToken}; path=/; max-age=86400`; // 24 hours
            document.cookie = `role=${role}; path=/; max-age=86400`;

            // Remember me functionality
            if (rememberMe) {
                localStorage.setItem("rememberedEmail", email);
            } else {
                localStorage.removeItem("rememberedEmail");
            }

            // Redirect based on role
            const redirectMap = {
                [Role.ADMIN]: "/admin",
                [Role.PARTNER]: "/partner",
                [Role.INVESTER]: "/investor",
            };
            
            router.push(redirectMap[role as Role] || "/");
        } catch (err: any) {
            setError(err?.response?.data?.message || "Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async () => {
        if (!forgotEmail) {
            setForgotMessage("Please enter your email address");
            return;
        }

        try {
            setForgotLoading(true);
            setForgotMessage("");
            const res = await forgotPassword({ email: forgotEmail });
            setForgotMessage(res?.data?.message || "Password reset link sent successfully! Please check your email.");
        } catch (error: any) {
            setForgotMessage(error?.response?.data?.message || "Failed to send reset link. Please try again.");
        } finally {
            setForgotLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleLogin();
        }
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            {/* Left Side - Login Form */}
            <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
                <div className="w-full max-w-md">
                    {/* Logo/Brand */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-blue-500 to-blue-600 shadow-lg mb-4">
                            <FaChartLine className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold bg-linear-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                            WealthPulse
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                            Secure Finance Portal Access
                        </p>
                    </div>

                    {/* Login Card */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-800">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                            Welcome Back
                        </h2>

                        {error && (
                            <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
                                <span className="text-lg">⚠️</span>
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            {/* Email Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                                    >
                                        {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Remember me</span>
                                </label>
                                <button
                                    onClick={() => setShowForgotModal(true)}
                                    className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                                >
                                    Forgot Password?
                                </button>
                            </div>

                            {/* Login Button */}
                            <button
                                onClick={handleLogin}
                                disabled={loading}
                                className="w-full bg-linear-to-r hover:cursor-pointer from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Logging in...
                                    </>
                                ) : (
                                    <>
                                        Login
                                        <FaArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>

                            {/* Signup Link */}
                            <div className="text-center pt-4">
                                <p className="text-gray-600 dark:text-gray-400">
                                    Don't have an account?{" "}
                                    <button
                                        onClick={() => router.push("/partnersignup")}
                                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors"
                                    >
                                        Sign up here
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Security Badge */}
                    <div className="text-center mt-6">
                        <div className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <FaShieldAlt className="text-green-500" />
                            <span>256-bit SSL Secure</span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                            <span>GDPR Compliant</span>
                        </div>
                    </div>
                </div>
            </div>


            {/* Forgot Password Modal */}
            {showForgotModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowForgotModal(false)} />
                    <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 w-full max-w-md animate-in zoom-in-95 duration-200">
                        <div className="text-center mb-4">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-500/20 mb-3">
                                <FaLock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                Forgot Password?
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                Enter your email to receive a reset link
                            </p>
                        </div>

                        <input
                            type="email"
                            placeholder="Enter your registered email"
                            value={forgotEmail}
                            onChange={(e) => setForgotEmail(e.target.value)}
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-xl p-3 text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            onKeyPress={(e) => e.key === "Enter" && handleForgotPassword()}
                        />

                        {forgotMessage && (
                            <div className={`mt-3 p-3 rounded-lg text-sm flex items-center gap-2 ${forgotMessage.includes("success") || forgotMessage.includes("sent") 
                                ? "bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/20" 
                                : "bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-500/20"
                            }`}>
                                <FaCheckCircle className="w-4 h-4 shrink-0" />
                                {forgotMessage}
                            </div>
                        )}

                        <div className="flex gap-3 mt-5">
                            <button
                                onClick={() => {
                                    setShowForgotModal(false);
                                    setForgotEmail("");
                                    setForgotMessage("");
                                }}
                                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleForgotPassword}
                                disabled={forgotLoading}
                                className="flex-1 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50"
                            >
                                {forgotLoading ? "Sending..." : "Send Reset Link"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}