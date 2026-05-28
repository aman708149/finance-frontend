"use client";

import { FiMenu } from "react-icons/fi";

export default function Navbar({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) {
  const handleLogout = () => {
    sessionStorage.clear();

    document.cookie = "accessToken=; path=/; max-age=0";
    document.cookie = "role=; path=/; max-age=0";

    window.location.href = "/login";
  };

  return (
    <header className="h-16 bg-gray-700 shadow flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="text-2xl text-white hover:cursor-pointer"
        >
          <FiMenu />
        </button>

        <h1 className="font-semibold text-lg text-white">
          Finance Dashboard
        </h1>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </header>
  );
}