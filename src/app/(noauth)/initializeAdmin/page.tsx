"use client";

import React, { useState } from "react";
import service from "./service";

export default function InitializeAdminPage() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    email: "",
    emailOtp: "",
    prefix: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // STEP 1 -> SEND OTP
  const handleSendOtp = async () => {
    try {
      setLoading(true);

      const res = await service.registerOtp({
        email: formData.email,
      });

      setMessage(res.message || "OTP sent successfully");
      setStep(2);
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // STEP 2 -> CREATE ADMIN
  const handleSignup = async () => {
    try {
      setLoading(true);

      const res = await service.signupAdmin({
        email: formData.email,
        emailOtp: formData.emailOtp,
        prefix: formData.prefix,
      });

      setMessage(res.message || "Admin initialized successfully");
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center text-black mb-2">
          Initialize Super Admin
        </h1>

        <p className="text-sm text-gray-500 text-center mb-8">
          Setup your first system administrator
        </p>

        {/* EMAIL */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-black mb-2">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter admin email"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* OTP + PREFIX */}
        {step === 2 && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-black mb-2">
                OTP
              </label>

              <input
                type="text"
                name="emailOtp"
                value={formData.emailOtp}
                onChange={handleChange}
                placeholder="Enter OTP"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-black mb-2">
                Prefix
              </label>

              <input
                type="text"
                name="prefix"
                value={formData.prefix}
                onChange={handleChange}
                placeholder="EX: ADM"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        )}

        {/* BUTTON */}
        {step === 1 ? (
          <button
            onClick={handleSendOtp}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-medium"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        ) : (
          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 transition text-white py-3 rounded-lg font-medium"
          >
            {loading ? "Initializing..." : "Initialize Admin"}
          </button>
        )}

        {/* MESSAGE */}
        {message && (
          <div className="mt-4 text-center text-sm text-gray-700">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}