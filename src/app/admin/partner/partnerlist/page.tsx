"use client";

import React, {
  useEffect,
  useState,
} from "react";

import {
  getAllPartnerOnboardings,
  getPartnerOnboardingByUserId,
  updatePartnerOnboarding,
  verifyPartner,
} from "./service";

export default function Page() {
  const [partners, setPartners] = useState<any[]>([]);
  const [selectedPartner, setSelectedPartner] =
    useState<any>(null);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [verifying, setVerifying] =
    useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const res =
        await getAllPartnerOnboardings(
          1,
          100,
          search
        );

      setPartners(res?.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePartnerClick = async (
    userId: string
  ) => {
    try {
      setLoading(true);

      const res =
        await getPartnerOnboardingByUserId(
          userId
        );

      setSelectedPartner(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      await updatePartnerOnboarding(
        selectedPartner.userId,
        selectedPartner
      );

      alert(
        "Partner details updated successfully"
      );

      fetchPartners();
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleVerify = async () => {
    try {
      setVerifying(true);

      await verifyPartner(
        selectedPartner.userId
      );

      setSelectedPartner({
        ...selectedPartner,
        isVerified: true,
      });

      alert(
        "Partner verified successfully"
      );

      fetchPartners();
    } catch (error) {
      console.error(error);
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 lg:p-6">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Partner Onboarding Review
        </h1>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Review, edit and verify partner
          onboarding details
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT SIDE */}
        <div className="lg:col-span-4 bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700">

          <div className="p-4 border-b border-gray-200 dark:border-gray-700">

            <h2 className="font-semibold text-gray-900 dark:text-white mb-3">
              Partner List
            </h2>

            <input
              type="text"
              placeholder="Search partner..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
                w-full
                p-3
                rounded-lg
                border
                border-gray-300
                dark:border-gray-600
                bg-white
                dark:bg-gray-700
                text-gray-900
                dark:text-white
              "
            />
          </div>

          <div className="max-h-175 overflow-y-auto">

            {partners.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No Partners Found
              </div>
            ) : (
              partners.map((partner) => (
                <button
                  key={partner.userId}
                  onClick={() =>
                    handlePartnerClick(
                      partner.userId
                    )
                  }
                  className="
                    w-full
                    text-left
                    p-4
                    border-b
                    border-gray-200
                    dark:border-gray-700
                    hover:bg-gray-50
                    dark:hover:bg-gray-700
                    transition
                  "
                >
                  <div className="flex justify-between items-center">

                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {partner.fullName}
                      </p>

                      <p className="text-xs text-gray-500">
                        {partner.email}
                      </p>
                    </div>

                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        partner.isVerified
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {partner.isVerified
                        ? "Verified"
                        : "Pending"}
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="lg:col-span-8">

          {!selectedPartner ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-10 text-center text-gray-500">
              Select a partner to view details
            </div>
          ) : loading ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-10">
              Loading...
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700">

              <div className="p-6 border-b border-gray-200 dark:border-gray-700">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Partner Details
                  </h2>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium w-fit ${
                      selectedPartner.isVerified
                        ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400"
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400"
                    }`}
                  >
                    {selectedPartner.isVerified
                      ? "Verified"
                      : "Pending Verification"}
                  </span>
                </div>
              </div>

              <div className="p-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <Input
                    label="Full Name"
                    value={
                      selectedPartner.fullName
                    }
                    onChange={(e) =>
                      setSelectedPartner({
                        ...selectedPartner,
                        fullName:
                          e.target.value,
                      })
                    }
                  />

                  <Input
                    label="Email"
                    value={
                      selectedPartner.email
                    }
                    onChange={(e) =>
                      setSelectedPartner({
                        ...selectedPartner,
                        email:
                          e.target.value,
                      })
                    }
                  />

                  <Input
                    label="Mobile Number"
                    value={
                      selectedPartner.mobileNumber
                    }
                    onChange={(e) =>
                      setSelectedPartner({
                        ...selectedPartner,
                        mobileNumber:
                          e.target.value,
                      })
                    }
                  />

                  <Input
                    label="Address"
                    value={
                      selectedPartner.address
                    }
                    onChange={(e) =>
                      setSelectedPartner({
                        ...selectedPartner,
                        address:
                          e.target.value,
                      })
                    }
                  />

                  <Input
                    label="City"
                    value={
                      selectedPartner.city
                    }
                    onChange={(e) =>
                      setSelectedPartner({
                        ...selectedPartner,
                        city:
                          e.target.value,
                      })
                    }
                  />

                  <Input
                    label="State"
                    value={
                      selectedPartner.state
                    }
                    onChange={(e) =>
                      setSelectedPartner({
                        ...selectedPartner,
                        state:
                          e.target.value,
                      })
                    }
                  />

                  <Input
                    label="Pincode"
                    value={
                      selectedPartner.pincode
                    }
                    onChange={(e) =>
                      setSelectedPartner({
                        ...selectedPartner,
                        pincode:
                          e.target.value,
                      })
                    }
                  />

                  <Input
                    label="Account Holder Name"
                    value={
                      selectedPartner.accountHolderName
                    }
                    onChange={(e) =>
                      setSelectedPartner({
                        ...selectedPartner,
                        accountHolderName:
                          e.target.value,
                      })
                    }
                  />

                  <Input
                    label="Bank Name"
                    value={
                      selectedPartner.bankName
                    }
                    onChange={(e) =>
                      setSelectedPartner({
                        ...selectedPartner,
                        bankName:
                          e.target.value,
                      })
                    }
                  />

                  <Input
                    label="Account Number"
                    value={
                      selectedPartner.accountNumber
                    }
                    onChange={(e) =>
                      setSelectedPartner({
                        ...selectedPartner,
                        accountNumber:
                          e.target.value,
                      })
                    }
                  />

                  <Input
                    label="IFSC Code"
                    value={
                      selectedPartner.ifscCode
                    }
                    onChange={(e) =>
                      setSelectedPartner({
                        ...selectedPartner,
                        ifscCode:
                          e.target.value,
                      })
                    }
                  />

                  <Input
                    label="Branch Name"
                    value={
                      selectedPartner.branchName
                    }
                    onChange={(e) =>
                      setSelectedPartner({
                        ...selectedPartner,
                        branchName:
                          e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">

                <div className="flex flex-col sm:flex-row justify-end gap-3">

                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="
                      px-6
                      py-3
                      rounded-lg
                      bg-blue-600
                      hover:bg-blue-700
                      text-white
                      font-medium
                    "
                  >
                    {saving
                      ? "Saving..."
                      : "Save Changes"}
                  </button>

                  {!selectedPartner.isVerified && (
                    <button
                      onClick={
                        handleVerify
                      }
                      disabled={
                        verifying
                      }
                      className="
                        px-6
                        py-3
                        rounded-lg
                        bg-green-600
                        hover:bg-green-700
                        text-white
                        font-medium
                      "
                    >
                      {verifying
                        ? "Verifying..."
                        : "Verify Partner"}
                    </button>
                  )}
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}) {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-gray-600 dark:text-gray-300">
        {label}
      </label>

      <input
        value={value || ""}
        onChange={onChange}
        className="
          w-full
          p-3
          rounded-lg
          border
          border-gray-300
          dark:border-gray-600
          bg-white
          dark:bg-gray-700
          text-gray-900
          dark:text-white
          focus:ring-2
          focus:ring-blue-500
        "
      />
    </div>
  );
}