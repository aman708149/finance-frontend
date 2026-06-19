'use client';

import React, {
    useEffect,
    useState,
} from 'react';

import {
    mdiCashMultiple,
    mdiPercent,
    mdiCalendarMonth,
    mdiAccountTie,
    mdiWallet,
    mdiRefresh,
} from '@mdi/js';

import Icon from '@mdi/react';


import { toast } from 'react-toastify';
import { getAllInvestments } from './service';
import { useSelector } from 'react-redux';

export default function Page() {

    const user = useSelector(
        (state: any) => state.auth.user
    );

    const [loading, setLoading] =
        useState(true);

    const [investments, setInvestments] =
        useState<any[]>([]);

    const fetchInvestments =
        async () => {

            try {

                setLoading(true);

                const response =
                    await getAllInvestments(
                        user?.role
                    );

                setInvestments(
                    response?.data || []
                );

            } catch (error: any) {

                console.log(error);

                toast.error(
                    error?.response?.data?.message ||
                    'Failed to fetch investments'
                );

            } finally {

                setLoading(false);
            }
        };

    useEffect(() => {

        fetchInvestments();

    }, []);

    return (

        <div className="min-h-screen bg-gray-100 dark:bg-[#0f172a] p-4 md:p-8">

            {/* Header */}
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Investment Details
                    </h1>

                    <p className="mt-1 text-sm text-gray-600 dark:text-slate-400">
                        View and manage all investor investment records
                    </p>
                </div>

                <button
                    onClick={fetchInvestments}
                    className="flex items-center gap-2 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-sm text-gray-700 dark:text-white transition hover:bg-gray-50 dark:hover:bg-slate-700"
                >
                    <Icon
                        path={mdiRefresh}
                        size={0.8}
                    />
                    Refresh
                </button>

            </div>

            {/* Loading */}
            {loading && (
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="animate-pulse rounded-3xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6"
                        >
                            <div className="mb-4 h-5 w-40 rounded bg-gray-200 dark:bg-slate-700"></div>
                            <div className="space-y-3">
                                <div className="h-4 rounded bg-gray-200 dark:bg-slate-700"></div>
                                <div className="h-4 rounded bg-gray-200 dark:bg-slate-700"></div>
                                <div className="h-4 rounded bg-gray-200 dark:bg-slate-700"></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Empty State */}
            {!loading && investments.length === 0 && (
                <div className="flex min-h-75 flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900">
                    <div className="mb-4 rounded-full bg-gray-100 dark:bg-slate-800 p-5">
                        <Icon
                            path={mdiWallet}
                            size={1.5}
                            className="text-gray-500 dark:text-slate-400"
                        />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        No Investments Found
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-slate-400">
                        No investment records available right now
                    </p>
                </div>
            )}

            {/* Investment Cards */}
            {!loading && investments.length > 0 && (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {investments.map((item, index) => (
                        <div
                            key={index}
                            className="group rounded-3xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 dark:hover:border-cyan-500/40"
                        >
                            {/* Amount */}
                            <div className="mb-4 rounded-2xl bg-gray-100 dark:bg-slate-800 p-4">
                                <p className="text-xs uppercase tracking-wide text-gray-600 dark:text-slate-400">
                                    Investment Amount
                                </p>
                                <h3 className="mt-2 text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                                    ₹{Number(item?.amount || 0).toLocaleString()}
                                </h3>
                            </div>

                            {/* Details */}
                            <div className="space-y-4">
                                {/* ROI */}
                                <div className="flex items-center justify-between rounded-xl bg-gray-100 dark:bg-slate-800 px-4 py-3">
                                    <div className="flex items-center gap-2 text-gray-700 dark:text-slate-300">
                                        <Icon path={mdiPercent} size={0.8} />
                                        ROI
                                    </div>
                                    <span className="font-semibold text-cyan-600 dark:text-cyan-400">
                                        {item?.roiPercent}%
                                    </span>
                                </div>

                                {/* Duration */}
                                <div className="flex items-center justify-between rounded-xl bg-gray-100 dark:bg-slate-800 px-4 py-3">
                                    <div className="flex items-center gap-2 text-gray-700 dark:text-slate-300">
                                        <Icon path={mdiCalendarMonth} size={0.8} />
                                        Duration
                                    </div>
                                    <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                                        {item?.durationMonths} Months
                                    </span>
                                </div>

                                {/* Expected Return */}
                                <div className="flex items-center justify-between rounded-xl bg-gray-100 dark:bg-slate-800 px-4 py-3">
                                    <div className="flex items-center gap-2 text-gray-700 dark:text-slate-300">
                                        <Icon path={mdiCashMultiple} size={0.8} />
                                        Expected Return
                                    </div>
                                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                                        ₹{Number(item?.expectedReturn || 0).toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            {/* Remarks */}
                            {item?.remarks && (
                                <div className="mt-4 rounded-2xl border border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-800/50 p-4">
                                    <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-slate-500">
                                        Remarks
                                    </p>
                                    <p className="mt-2 text-sm text-gray-700 dark:text-slate-300">
                                        {item?.remarks}
                                    </p>
                                </div>
                            )}

                            {/* Footer */}
                            <div className="mt-5 flex items-center justify-between">
                                <span className="rounded-full bg-emerald-100 dark:bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                                    {item?.status}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-slate-500">
                                    {new Date(item?.createdAt).toLocaleDateString('en-IN', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric',
                                    })}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}