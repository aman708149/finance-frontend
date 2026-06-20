'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { partnerOnboardingService } from './service';

interface FormData {
    fullName: string;
    email: string;
    mobileNumber: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    accountHolderName: string;
    bankName: string;
    accountNumber: string;
    confirmAccountNumber: string;
    ifscCode: string;
    branchName: string;
}

export default function Page() {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        try {
            setLoading(true);

            const payload = {
                fullName: data.fullName,
                email: data.email,
                mobileNumber: data.mobileNumber,
                address: data.address,
                city: data.city,
                state: data.state,
                pincode: data.pincode,
                accountHolderName: data.accountHolderName,
                bankName: data.bankName,
                accountNumber: data.accountNumber,
                ifscCode: data.ifscCode,
                branchName: data.branchName,
            };

            const response =
                await partnerOnboardingService(payload);

            toast.success(
                response?.message ||
                'Onboarding completed successfully',
            );
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message ||
                'Something went wrong',
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-2 px-2">
            <div className="w-full">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">

                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Partner Onboarding
                    </h1>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        {/* Personal Details */}
                        <div>
                            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
                                Personal Details
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Input
                                    label="Full Name"
                                    error={errors.fullName?.message}
                                    register={register('fullName', {
                                        required: 'Full Name is required',
                                    })}
                                />

                                <Input
                                    label="Email"
                                    error={errors.email?.message}
                                    register={register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value:
                                                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: 'Invalid email',
                                        },
                                    })}
                                />

                                <Input
                                    label="Mobile Number"
                                    error={errors.mobileNumber?.message}
                                    register={register('mobileNumber', {
                                        required: 'Mobile Number required',
                                        pattern: {
                                            value: /^[6-9]\d{9}$/,
                                            message:
                                                'Enter valid mobile number',
                                        },
                                    })}
                                />

                                <Input
                                    label="Pincode"
                                    error={errors.pincode?.message}
                                    register={register('pincode', {
                                        required: 'Pincode required',
                                        pattern: {
                                            value: /^\d{6}$/,
                                            message:
                                                'Enter valid pincode',
                                        },
                                    })}
                                />

                                <Input
                                    label="City"
                                    error={errors.city?.message}
                                    register={register('city', {
                                        required: 'City required',
                                    })}
                                />

                                <Input
                                    label="State"
                                    error={errors.state?.message}
                                    register={register('state', {
                                        required: 'State required',
                                    })}
                                />
                            </div>

                            <div className="mt-4">
                                <textarea
                                    placeholder="Address"
                                    {...register('address', {
                                        required: 'Address required',
                                    })}
                                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-3"
                                />
                            </div>
                        </div>

                        {/* Bank Details */}
                        <div>
                            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
                                Bank Details
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                                <Input
                                    label="Account Holder Name"
                                    error={
                                        errors.accountHolderName?.message
                                    }
                                    register={register(
                                        'accountHolderName',
                                        {
                                            required:
                                                'Account holder name required',
                                        },
                                    )}
                                />

                                <Input
                                    label="Bank Name"
                                    error={errors.bankName?.message}
                                    register={register('bankName', {
                                        required: 'Bank name required',
                                    })}
                                />

                                <Input
                                    label="Account Number"
                                    error={
                                        errors.accountNumber?.message
                                    }
                                    register={register(
                                        'accountNumber',
                                        {
                                            required:
                                                'Account number required',
                                        },
                                    )}
                                />

                                <Input
                                    label="Confirm Account Number"
                                    error={
                                        errors.confirmAccountNumber
                                            ?.message
                                    }
                                    register={register(
                                        'confirmAccountNumber',
                                        {
                                            validate: value =>
                                                value ===
                                                watch('accountNumber') ||
                                                'Account numbers do not match',
                                        },
                                    )}
                                />

                                <Input
                                    label="IFSC Code"
                                    error={errors.ifscCode?.message}
                                    register={register('ifscCode', {
                                        required: 'IFSC required',
                                        pattern: {
                                            value:
                                                /^[A-Z]{4}0[A-Z0-9]{6}$/,
                                            message:
                                                'Invalid IFSC Code',
                                        },
                                    })}
                                />

                                <Input
                                    label="Branch Name"
                                    error={errors.branchName?.message}
                                    register={register('branchName')}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
                            <button
                                type="submit"
                                disabled={loading}
                                className="
      min-w-45
      px-8
      py-3
      rounded-lg
      bg-blue-600
      hover:bg-blue-700
      text-white
      font-medium
      disabled:opacity-50
      disabled:cursor-not-allowed
      transition-colors
      duration-200
    "
                            >
                                {loading ? 'Submitting...' : 'Submit Onboarding'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

function Input({
    label,
    register,
    error,
}: any) {
    return (
        <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
            </label>

            <input
                {...register}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-3"
            />

            {error && (
                <p className="mt-1 text-sm text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}