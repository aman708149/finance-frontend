"use client";

import { FiMenu, FiBell, FiUser, FiChevronDown, FiLogOut, FiSettings, FiHelpCircle } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/store/authSlice";
import ThemeToggle from "../slices/ThemeToggle";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { RootState } from "@/store";

export default function Navbar({ toggleSidebar }: { toggleSidebar: () => void }) {
  const dispatch = useDispatch();
  const { email, role, userId } = useSelector((state: RootState) => state.auth);
  
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New investor added", time: "2 min ago", read: false },
    { id: 2, message: "Investment milestone achieved", time: "1 hour ago", read: false },
    { id: 3, message: "Weekly report ready", time: "3 hours ago", read: true },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    sessionStorage.clear();
    
    // Clear cookies
    document.cookie = "accessToken=; path=/; max-age=0";
    document.cookie = "role=; path=/; max-age=0";
    document.cookie = "refreshToken=; path=/; max-age=0";
    
    window.location.href = "/login";
  };

  const getInitials = () => {
    if (email) {
      return email.charAt(0).toUpperCase();
    }
    return "U";
  };

  const getRoleBadgeColor = () => {
    switch (role) {
      case "admin":
        return "bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400";
      case "partner":
        return "bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400";
      case "invester":
        return "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400";
      default:
        return "bg-gray-100 dark:bg-gray-500/20 text-gray-700 dark:text-gray-400";
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-30 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between px-4 md:px-6 transition-colors duration-200">
      {/* Left Section */}
      <div className="flex items-center gap-3 md:gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all duration-200 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Toggle Sidebar"
        >
          <FiMenu className="text-xl" />
        </button>

        <div className="hidden sm:block">
          <h1 className="font-semibold text-lg md:text-xl bg-linear-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            Finance Dashboard
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 hidden md:block">
            Welcome back, {email?.split('@')[0] || 'User'}
          </p>
        </div>

        {/* Mobile title */}
        <div className="sm:hidden">
          <h1 className="font-semibold text-base text-gray-800 dark:text-white">
            Dashboard
          </h1>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Search Bar - Hidden on mobile */}
        <div className="hidden md:flex items-center relative">
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-1.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 w-64"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Notifications"
          >
            <FiBell className="text-xl" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50 animate-in slide-in-from-top-2 duration-200">
              <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                    No notifications
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-3 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer ${
                        !notif.read ? "bg-blue-50 dark:bg-blue-500/5" : ""
                      }`}
                    >
                      <p className="text-sm text-gray-800 dark:text-gray-200">{notif.message}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notif.time}</p>
                    </div>
                  ))
                )}
              </div>
              <div className="p-2 border-t border-gray-200 dark:border-gray-700">
                <button className="w-full text-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 py-1">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* User Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 md:gap-3 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="User Menu"
          >
            <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
              {getInitials()}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {email?.split('@')[0] || 'User'}
              </p>
              <p className={`text-xs capitalize ${getRoleBadgeColor()}`}>
                {role || 'Guest'}
              </p>
            </div>
            <FiChevronDown className={`hidden md:block text-gray-500 dark:text-gray-400 text-sm transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50 animate-in slide-in-from-top-2 duration-200">
              <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                    {getInitials()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {email || 'User'}
                    </p>
                    <p className={`text-xs capitalize ${getRoleBadgeColor()}`}>
                      {role || 'Guest'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="py-2">
                <Link
                  href="/profile"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => setIsProfileOpen(false)}
                >
                  <FiUser className="text-gray-400" />
                  <span>Profile Settings</span>
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => setIsProfileOpen(false)}
                >
                  <FiSettings className="text-gray-400" />
                  <span>Account Settings</span>
                </Link>
                <Link
                  href="/help"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => setIsProfileOpen(false)}
                >
                  <FiHelpCircle className="text-gray-400" />
                  <span>Help Center</span>
                </Link>
                <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                >
                  <FiLogOut className="text-red-500" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}