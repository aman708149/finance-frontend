'use client';

import React, { useState } from 'react';

import {
    mdiCashMultiple,
    mdiFinance,
    mdiPercent,
    mdiCalendarMonth,
    mdiText,
} from '@mdi/js';

import Icon from '@mdi/react';
import { toast } from 'react-toastify';
import { createInvestment } from '../service';


export default function Page() {

    const [loading, setLoading] =
        useState(false);

    const [formData, setFormData] = useState({
        investorId: '',
        partnerId: '',
        amount: '',
        roiPercent: '',
        durationMonths: '',
        remarks: '',
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement
        >
    ) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        try {

            setLoading(true);

            const payload = {
                investorId: formData.investorId,
                partnerId: formData.partnerId,
                amount: Number(formData.amount),
                roiPercent: Number(
                    formData.roiPercent
                ),
                durationMonths: Number(
                    formData.durationMonths
                ),
                remarks: formData.remarks,
            };

            const response =
                await createInvestment(payload);

            toast.success(
                response?.message ||
                'Investment created successfully'
            );

            setFormData({
                investorId: '',
                partnerId: '',
                amount: '',
                roiPercent: '',
                durationMonths: '',
                remarks: '',
            });

        } catch (error: any) {

            console.log(error);

            toast.error(
                error?.response?.data?.message ||
                'Something went wrong'
            );

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0f172a] p-4 md:p-8">

            {/* Header */}
            <div className="mb-8 flex flex-col gap-2">

                <h1 className="text-3xl font-bold text-white">
                    Add Investment
                </h1>

                <p className="text-sm text-slate-400">
                    Create and manage investor
                    investments professionally
                </p>
            </div>

            {/* Form Card */}
            <div className="mx-auto max-w-5xl rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl backdrop-blur">

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 gap-6 md:grid-cols-2"
                >

                    {/* Investor ID */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-300">
                            Investor ID
                        </label>

                        <div className="flex items-center rounded-xl border border-slate-700 bg-slate-800 px-4">
                            <Icon
                                path={mdiFinance}
                                size={0.8}
                                className="text-slate-400"
                            />

                            <input
                                type="text"
                                name="investorId"
                                value={formData.investorId}
                                onChange={handleChange}
                                required
                                placeholder="Enter investor id"
                                className="w-full bg-transparent px-3 py-3 text-white outline-none"
                            />
                        </div>
                    </div>

                    {/* Partner ID */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-300">
                            Partner ID
                        </label>

                        <div className="flex items-center rounded-xl border border-slate-700 bg-slate-800 px-4">
                            <Icon
                                path={mdiFinance}
                                size={0.8}
                                className="text-slate-400"
                            />

                            <input
                                type="text"
                                name="partnerId"
                                value={formData.partnerId}
                                onChange={handleChange}
                                required
                                placeholder="Enter partner id"
                                className="w-full bg-transparent px-3 py-3 text-white outline-none"
                            />
                        </div>
                    </div>

                    {/* Amount */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-300">
                            Investment Amount
                        </label>

                        <div className="flex items-center rounded-xl border border-slate-700 bg-slate-800 px-4">
                            <Icon
                                path={mdiCashMultiple}
                                size={0.8}
                                className="text-emerald-400"
                            />

                            <input
                                type="number"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                required
                                placeholder="Enter amount"
                                className="w-full bg-transparent px-3 py-3 text-white outline-none"
                            />
                        </div>
                    </div>

                    {/* ROI */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-300">
                            ROI %
                        </label>

                        <div className="flex items-center rounded-xl border border-slate-700 bg-slate-800 px-4">
                            <Icon
                                path={mdiPercent}
                                size={0.8}
                                className="text-cyan-400"
                            />

                            <input
                                type="number"
                                name="roiPercent"
                                value={formData.roiPercent}
                                onChange={handleChange}
                                required
                                placeholder="Enter ROI percentage"
                                className="w-full bg-transparent px-3 py-3 text-white outline-none"
                            />
                        </div>
                    </div>

                    {/* Duration */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-300">
                            Duration (Months)
                        </label>

                        <div className="flex items-center rounded-xl border border-slate-700 bg-slate-800 px-4">
                            <Icon
                                path={mdiCalendarMonth}
                                size={0.8}
                                className="text-yellow-400"
                            />

                            <input
                                type="number"
                                name="durationMonths"
                                value={formData.durationMonths}
                                onChange={handleChange}
                                required
                                placeholder="Enter duration"
                                className="w-full bg-transparent px-3 py-3 text-white outline-none"
                            />
                        </div>
                    </div>

                    {/* Remarks */}
                    <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-slate-300">
                            Remarks
                        </label>

                        <div className="flex rounded-xl border border-slate-700 bg-slate-800 px-4">
                            <Icon
                                path={mdiText}
                                size={0.8}
                                className="mt-4 text-slate-400"
                            />

                            <textarea
                                name="remarks"
                                value={formData.remarks}
                                onChange={handleChange}
                                rows={4}
                                placeholder="Write remarks..."
                                className="w-full resize-none bg-transparent px-3 py-3 text-white outline-none"
                            />
                        </div>
                    </div>

                    {/* Button */}
                    <div className="md:col-span-2">

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-2xl bg-linear-to-r from-indigo-500 to-cyan-500 px-6 py-4 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.01] hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {
                                loading
                                    ? 'Creating Investment...'
                                    : 'Create Investment'
                            }
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}