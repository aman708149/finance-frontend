'use client'

import React, { useState } from 'react'
import { CompletePartnerSignup, SendOtpForPartnerSignup, VerifyOtpForPartnerSignup } from './service'
import { useRouter } from "next/navigation";

export default function Page() {

  const router = useRouter();


  const [step, setStep] = useState(1)

  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const sendOtp = async () => {
    try {

      setLoading(true)

      const res = await SendOtpForPartnerSignup({ email })

      setMessage(res.data.message)
      setStep(2)

    } catch (err: any) {
      setMessage(err?.response?.data?.message || 'Error sending OTP')
    } finally {
      setLoading(false)
    }
  }

  const verifyOtp = async () => {
    try {

      setLoading(true)

      const res = await VerifyOtpForPartnerSignup({
        email,
        otp,
      })

      setMessage(res.data.message)
      setStep(3)

    } catch (err: any) {
      setMessage(err?.response?.data?.message || 'OTP verification failed')
    } finally {
      setLoading(false)
    }
  }

  const completeSignup = async () => {
    try {
      setLoading(true);

      const res = await CompletePartnerSignup({
        email,
        password,
        fullName,
      });

      setMessage(res.data.message);

      // redirect after success
      router.push("/partner");

    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">

      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6 text-black">
          Partner Signup
        </h2>

        {message && (
          <p className="text-center text-blue-600 text-sm mb-4">
            {message}
          </p>
        )}

        {step === 1 && (
          <div className="space-y-4">

            <input
              type="email"
              placeholder="Enter Email"
              className="w-full border p-3 rounded text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={sendOtp}
              className="w-full bg-blue-600 text-white p-3 rounded"
            >
              {loading ? 'Sending...' : 'Send OTP'}
            </button>

          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">

            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full border p-3 rounded text-black"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button
              onClick={verifyOtp}
              className="w-full bg-green-600 text-white p-3 rounded"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>

          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">

            <input
              type="text"
              placeholder="Full Name"
              className="w-full border p-3 rounded text-black"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border p-3 rounded text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={completeSignup}
              className="w-full bg-purple-600 text-white p-3 rounded"
            >
              {loading ? 'Creating...' : 'Complete Signup'}
            </button>

          </div>
        )}

        {step === 4 && (
          <div className="text-center text-green-600 font-semibold">
            Signup Successful 🎉
          </div>
        )}

        <div className='justify-end'>
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="text-sm text-blue-600 hover:underline hover:cursor-pointer"
          >
            Login
          </button>
        </div>

      </div>

    </div>
  )
}