"use client";

import React, { useState } from "react";

import {
    CheckCircle2,
    Mail,
    ShieldCheck,
    UserPlus,
} from "lucide-react";

import {
    completeInvestor,
    sendInvestorOtp,
    verifyInvestorOtp,
} from "./service";

export default function Page() {

    const [step, setStep] = useState(1);

    const [loading, setLoading] =
        useState(false);

    const [message, setMessage] =
        useState("");

    const [error, setError] =
        useState("");

    const [formData, setFormData] =
        useState({
            fullName: "",
            email: "",
            otp: "",
            password: "",
        });

    const handleChange = (
        key: string,
        value: string
    ) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    // SEND OTP
    const handleSendOtp = async () => {
        try {
            setLoading(true);
            setError("");

            const res =
                await sendInvestorOtp(
                    formData.email
                );

            setMessage(res.data.message);

            setStep(2);

        } catch (err: any) {

            setError(
                err?.response?.data?.message
            );

        } finally {
            setLoading(false);
        }
    };

    // VERIFY OTP
    const handleVerifyOtp = async () => {
        try {

            setLoading(true);
            setError("");

            const res =
                await verifyInvestorOtp(
                    formData.email,
                    formData.otp
                );

            setMessage(res.data.message);

            setStep(3);

        } catch (err: any) {

            setError(
                err?.response?.data?.message
            );

        } finally {
            setLoading(false);
        }
    };

    // COMPLETE
    const handleComplete = async () => {
        try {

            setLoading(true);
            setError("");

            const res =
                await completeInvestor(
                    formData
                );

            setMessage(res.data.message);

            setStep(4);

        } catch (err: any) {

            setError(
                err?.response?.data?.message
            );

        } finally {
            setLoading(false);
        }
    };

    const steps = [
        {
            id: 1,
            title: "Email",
            icon: Mail,
        },
        {
            id: 2,
            title: "Verify OTP",
            icon: ShieldCheck,
        },
        {
            id: 3,
            title: "Investor Details",
            icon: UserPlus,
        },
        {
            id: 4,
            title: "Completed",
            icon: CheckCircle2,
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-8 transition-colors duration-200">

            {/* TOP HEADER */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300 p-6 md:p-8 mb-8">

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">
                            Add New Investor
                        </h1>

                        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm md:text-base">
                            Secure onboarding process
                            for new investors with OTP verification.
                        </p>
                    </div>

                    {/* STATUS BADGE */}
                    <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 px-5 py-3 rounded-2xl backdrop-blur-sm">

                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Current Step
                        </p>

                        <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                            {steps[step - 1]?.title}
                        </h3>

                    </div>
                </div>
            </div>

            {/* STEP PROGRESS */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300 p-6 md:p-8 mb-8 overflow-hidden">

                <div className="relative flex items-center justify-between">

                    {/* DOTTED LINE */}
                    <div className="absolute top-6 left-0 w-full border-t-2 border-dashed border-gray-300 dark:border-gray-600 z-0"></div>

                    {steps.map((item) => {

                        const Icon = item.icon;

                        const active =
                            step >= item.id;

                        return (
                            <div
                                key={item.id}
                                className="relative z-10 flex flex-col items-center flex-1"
                            >

                                <div
                                    className={`
                            w-14 h-14 rounded-full border-4
                            flex items-center justify-center
                            transition-all duration-300
                            bg-white dark:bg-gray-800
                            ${active
                                            ? "border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 shadow-lg shadow-blue-100 dark:shadow-blue-900/30"
                                            : "border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500"
                                        }
                        `}
                                >
                                    <Icon size={22} />
                                </div>

                                <p
                                    className={`
                            mt-3 text-xs md:text-sm font-medium text-center
                            ${active
                                            ? "text-blue-600 dark:text-blue-400"
                                            : "text-gray-400 dark:text-gray-500"
                                        }
                        `}
                                >
                                    {item.title}
                                </p>

                            </div>
                        );
                    })}
                </div>
            </div>

            {/* MAIN CARD */}
            <div className="max-w-3xl mx-auto">

                <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300 p-6 md:p-10">

                    {/* ERROR */}
                    {error && (
                        <div className="mb-6 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-2xl backdrop-blur-sm">
                            {error}
                        </div>
                    )}

                    {/* SUCCESS */}
                    {message && (
                        <div className="mb-6 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded-2xl backdrop-blur-sm">
                            {message}
                        </div>
                    )}

                    {/* STEP 1 */}
                    {step === 1 && (
                        <div className="space-y-6">

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Investor Email
                                </label>

                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        handleChange(
                                            "email",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter investor email"
                                    className="
                            w-full
                            rounded-2xl
                            border
                            border-gray-300 dark:border-gray-600
                            bg-gray-50 dark:bg-gray-700/50
                            hover:bg-white dark:hover:bg-gray-700
                            focus:bg-white dark:focus:bg-gray-700
                            px-5
                            py-4
                            text-gray-900 dark:text-gray-100
                            placeholder:text-gray-400 dark:placeholder:text-gray-500
                            outline-none
                            transition-all duration-200
                            focus:border-blue-500 dark:focus:border-blue-400
                            focus:ring-4
                            focus:ring-blue-100 dark:focus:ring-blue-900/30
                        "
                                />
                            </div>

                            <button
                                onClick={handleSendOtp}
                                disabled={loading}
                                className="
                        bg-blue-600 dark:bg-blue-500
                        hover:bg-blue-700 dark:hover:bg-blue-600
                        active:scale-95
                        text-white
                        px-8
                        py-4
                        rounded-2xl
                        font-semibold
                        transition-all duration-200
                        shadow-lg shadow-blue-200 dark:shadow-blue-900/30
                        hover:shadow-xl hover:shadow-blue-300 dark:hover:shadow-blue-900/50
                        disabled:opacity-50 disabled:cursor-not-allowed
                    "
                            >
                                {loading
                                    ? "Sending OTP..."
                                    : "Send OTP"}
                            </button>

                        </div>
                    )}

                    {/* STEP 2 */}
                    {step === 2 && (
                        <div className="space-y-6">

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Enter OTP
                                </label>

                                <input
                                    type="text"
                                    value={formData.otp}
                                    onChange={(e) =>
                                        handleChange(
                                            "otp",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter 6 digit OTP"
                                    className="
                            w-full
                            rounded-2xl
                            border
                            border-gray-300 dark:border-gray-600
                            bg-gray-50 dark:bg-gray-700/50
                            hover:bg-white dark:hover:bg-gray-700
                            focus:bg-white dark:focus:bg-gray-700
                            px-5
                            py-4
                            text-gray-900 dark:text-gray-100
                            placeholder:text-gray-400 dark:placeholder:text-gray-500
                            outline-none
                            transition-all duration-200
                            focus:border-blue-500 dark:focus:border-blue-400
                            focus:ring-4
                            focus:ring-blue-100 dark:focus:ring-blue-900/30
                        "
                                />
                            </div>

                            <button
                                onClick={handleVerifyOtp}
                                disabled={loading}
                                className="
                        bg-blue-600 dark:bg-blue-500
                        hover:bg-blue-700 dark:hover:bg-blue-600
                        active:scale-95
                        text-white
                        px-8
                        py-4
                        rounded-2xl
                        font-semibold
                        transition-all duration-200
                        shadow-lg shadow-blue-200 dark:shadow-blue-900/30
                        hover:shadow-xl hover:shadow-blue-300 dark:hover:shadow-blue-900/50
                        disabled:opacity-50 disabled:cursor-not-allowed
                    "
                            >
                                {loading
                                    ? "Verifying..."
                                    : "Verify OTP"}
                            </button>

                        </div>
                    )}

                    {/* STEP 3 */}
                    {step === 3 && (
                        <div className="space-y-6">

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    value={formData.fullName}
                                    onChange={(e) =>
                                        handleChange(
                                            "fullName",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter full name"
                                    className="
                            w-full
                            rounded-2xl
                            border
                            border-gray-300 dark:border-gray-600
                            bg-gray-50 dark:bg-gray-700/50
                            hover:bg-white dark:hover:bg-gray-700
                            focus:bg-white dark:focus:bg-gray-700
                            px-5
                            py-4
                            text-gray-900 dark:text-gray-100
                            placeholder:text-gray-400 dark:placeholder:text-gray-500
                            outline-none
                            transition-all duration-200
                            focus:border-blue-500 dark:focus:border-blue-400
                            focus:ring-4
                            focus:ring-blue-100 dark:focus:ring-blue-900/30
                        "
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) =>
                                        handleChange(
                                            "password",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter password"
                                    className="
                            w-full
                            rounded-2xl
                            border
                            border-gray-300 dark:border-gray-600
                            bg-gray-50 dark:bg-gray-700/50
                            hover:bg-white dark:hover:bg-gray-700
                            focus:bg-white dark:focus:bg-gray-700
                            px-5
                            py-4
                            text-gray-900 dark:text-gray-100
                            placeholder:text-gray-400 dark:placeholder:text-gray-500
                            outline-none
                            transition-all duration-200
                            focus:border-blue-500 dark:focus:border-blue-400
                            focus:ring-4
                            focus:ring-blue-100 dark:focus:ring-blue-900/30
                        "
                                />
                            </div>

                            <button
                                onClick={handleComplete}
                                disabled={loading}
                                className="
                        bg-green-600 dark:bg-green-500
                        hover:bg-green-700 dark:hover:bg-green-600
                        active:scale-95
                        text-white
                        px-8
                        py-4
                        rounded-2xl
                        font-semibold
                        transition-all duration-200
                        shadow-lg shadow-green-200 dark:shadow-green-900/30
                        hover:shadow-xl hover:shadow-green-300 dark:hover:shadow-green-900/50
                        disabled:opacity-50 disabled:cursor-not-allowed
                    "
                            >
                                {loading
                                    ? "Creating..."
                                    : "Create Investor"}
                            </button>

                        </div>
                    )}

                    {/* STEP 4 */}
                    {step === 4 && (
                        <div className="text-center py-10">

                            <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto backdrop-blur-sm">

                                <CheckCircle2
                                    size={50}
                                    className="text-green-600 dark:text-green-400"
                                />

                            </div>

                            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mt-6">
                                Investor Created
                            </h2>

                            <p className="text-gray-500 dark:text-gray-400 mt-3">
                                Investor account has
                                been successfully created
                                and verified.
                            </p>

                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}