"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  User,
  LogOut,
  Settings,
  LayoutDashboard,
  Users,
  TrendingUp,
  FileText,
  UserPlus,
  Wallet,
  Briefcase,
  Moon,
  Sun
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/store/authSlice";
import { RootState } from "@/store";

export enum Role {
  ADMIN = "admin",
  PARTNER = "partner",
  INVESTER = "invester",
}

interface MenuItem {
  name: string;
  path?: string;
  icon?: any;
  children?: MenuItem[];
}

const getMenuByRole = (role: string): MenuItem[] => {
  switch (role) {
    case Role.ADMIN:
      return [
        { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
        {
          name: "Partner",
          icon: Users,
          children: [
            { name: "Total Partner", path: "/admin/partner/partnerlist", icon: Users },
          ],
        },
        {
          name: "Investor",
          icon: Users,
          children: [
            { name: "Total Investors", path: "/admin/investor/investorlist", icon: Users },
            { name: "Total Investment Details", path: "/admin/investmentsDetails", icon: TrendingUp },
          ],
        },
        { name: "Reports", path: "/admin/reports", icon: FileText },
        { name: "Users", path: "/admin/users", icon: User },
      ];

    case Role.PARTNER:
      return [
        { name: "Dashboard", path: "/partner", icon: LayoutDashboard },
        {
          name: "Investor",
          icon: Users,
          children: [
            { name: "Add Investor", path: "/partner/investor/addInvester", icon: UserPlus },
            { name: "Total Investors", path: "/partner/investor/investorlist", icon: Users },
            { name: "Total Investment Details", path: "/partner/investmentsDetails", icon: TrendingUp },
          ],
        },
        { name: "Reports", path: "/partner/reports", icon: FileText },
      ];

    case Role.INVESTER:
      return [
        { name: "Dashboard", path: "/investor", icon: LayoutDashboard },
        { name: "Add Investments", path: "/investor/addInvestments", icon: Wallet },
        { name: "My Investments", path: "/investor/investmentsDetails", icon: Briefcase },
      ];

    default:
      return [];
  }
};

export default function Sidebar({ open }: { open: boolean }) {
  const pathname = usePathname();
  const dispatch = useDispatch();

  const { userId, email, role: userRole } = useSelector((state: RootState) => state.auth);

  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load menu based on Redux role
  useEffect(() => {
    if (userRole) {
      const menuByRole = getMenuByRole(userRole);
      setMenu(menuByRole);
    }
  }, [userRole]);

  // Close mobile sidebar when route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    sessionStorage.removeItem("role");
    window.location.href = "/login";
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (email) {
      return email.charAt(0).toUpperCase();
    }
    return "U";
  };

  // Get role badge color
  const getRoleBadgeColor = () => {
    switch (userRole) {
      case Role.ADMIN:
        return "bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400";
      case Role.PARTNER:
        return "bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400";
      case Role.INVESTER:
        return "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400";
      default:
        return "bg-gray-100 dark:bg-gray-500/20 text-gray-700 dark:text-gray-400";
    }
  };

  // Mobile menu toggle button
  const MobileMenuButton = () => (
    <button
      onClick={() => setIsMobileOpen(!isMobileOpen)}
      className="fixed top-4 left-4 z-50 md:hidden bg-white dark:bg-gray-900 p-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
    >
      {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
    </button>
  );

  // Sidebar content
  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo & Brand */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-sm">FP</span>
          </div>
          {open && (
            <div className="transition-opacity duration-200">
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">FinPlatform</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{userRole}</p>
            </div>
          )}
        </div>
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold shrink-0">
            {getUserInitials()}
          </div>
          {open && (
            <div className="flex-1 min-w-0 transition-opacity duration-200">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {email || "User"}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${getRoleBadgeColor()}`}>
                  {userRole || "Guest"}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {menu.map((item, index) => {
          if (item.children) {
            const isOpen = openDropdown === item.name;

            return (
              <div key={index} className="mb-1">
                <button
                  onClick={() => setOpenDropdown(isOpen ? null : item.name)}
                  className={`
                    w-full flex items-center justify-between
                    px-3 py-2.5 rounded-lg transition-all duration-200
                    hover:bg-gray-100 dark:hover:bg-gray-800
                    text-gray-700 dark:text-gray-300
                    group
                  `}
                >
                  <div className="flex items-center gap-3">
                    {item.icon && <item.icon size={18} className="shrink-0" />}
                    {open && (
                      <span className="text-sm font-medium transition-opacity duration-200">
                        {item.name}
                      </span>
                    )}
                  </div>
                  {open && (
                    isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />
                  )}
                </button>

                {isOpen && open && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.children.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        href={subItem.path || "#"}
                        className={`
                          flex items-center gap-3 px-3 py-2 rounded-lg text-sm
                          transition-all duration-200
                          ${pathname === subItem.path
                            ? "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                          }
                        `}
                      >
                        {subItem.icon && <subItem.icon size={16} className="shrink-0" />}
                        {open && subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={index}
              href={item.path || "#"}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                ${pathname === item.path
                  ? "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }
              `}
            >
              {item.icon && <item.icon size={18} className="shrink-0" />}
              {open && (
                <span className="text-sm font-medium transition-opacity duration-200">
                  {item.name}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-2">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {isDarkMode ? <Sun size={18} className="shrink-0" /> : <Moon size={18} className="shrink-0" />}
          {open && <span className="text-sm">{isDarkMode ? "Light Mode" : "Dark Mode"}</span>}
        </button>

        {/* Settings */}
        <Link
          href="/settings"
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
        >
          <Settings size={18} className="shrink-0" />
          {open && <span className="text-sm">Settings</span>}
        </Link>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors text-red-600 dark:text-red-400"
        >
          <LogOut size={18} className="shrink-0" />
          {open && <span className="text-sm">Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside
        className={`
    bg-white dark:bg-slate-900
    text-gray-800 dark:text-white
    border-r border-gray-200 dark:border-slate-700
    transition-all duration-300
    ${open ? "w-64" : "w-16"}
  `}
      >
        <MobileMenuButton />

        {/* Desktop Sidebar - with open prop for width control */}
        <aside
          className={`
          hidden md:flex flex-col fixed left-0 top-0 h-full
          bg-white dark:bg-gray-900
          border-r border-gray-200 dark:border-gray-800
          transition-all duration-300 z-40
          ${open ? "w-64" : "w-20"}
        `}
        >
          <SidebarContent />
        </aside>

        {/* Mobile Sidebar - always full width when open */}
        {isMobileOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsMobileOpen(false)}
            />
            <aside
              className={`
              fixed top-0 left-0 h-full w-72
              bg-white dark:bg-gray-900
              border-r border-gray-200 dark:border-gray-800
              transition-transform duration-300 z-50
              transform ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
            `}
            >
              <SidebarContent />
            </aside>
          </>
        )}
      </aside>
    </>
  );
}