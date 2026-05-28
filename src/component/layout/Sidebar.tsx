"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

// ✅ define enum here OR import it
export enum Role {
  SUPER_ADMIN = "super_admin",
  PARTNER = "partner",
  INVESTER = "invester",
}

// ✅ FIX: define function here
const getMenuByRole = (role: string) => {
  switch (role) {
    case Role.SUPER_ADMIN:
      return [
        { name: "Dashboard", path: "/admin" },
        {
          name: "Investor",
          children: [

            {
              name: "Total Investors",
              path: "/admin/investor/investorlist",
            },
            {
              name: "Total InvestMentDetails",
              path: "/admin/investmentsDetails",
            },
          ],
        },
        { name: "Reports", path: "/admin/reports" },
        { name: "Users", path: "/admin/users" },
      ];

    case Role.PARTNER:
      return [
        { name: "Dashboard", path: "/partner" },

        {
          name: "Investor",
          children: [
            {
              name: "Add Investor",
              path: "/partner/investor/addInvester",
            },
            {
              name: "Total Investors",
              path: "/partner/investor/investorlist",
            },
            {
              name: "Total InvestMentDetails",
              path: "/partner/investmentsDetails",
            },
          ],
        },

        { name: "Reports", path: "/partner/reports" },
      ];

    case Role.INVESTER:
      return [
        { name: "Dashboard", path: "/investor" },
        { name: "Add Investments", path: "/investor/addInvestments" },
        { name: "My Investments", path: "/investor/investmentsDetails" },
      ];

    default:
      return [];
  }
};

export default function Sidebar({ open }: { open: boolean }) {
  const pathname = usePathname();
  const [menu, setMenu] = useState<any[]>([]);
  const [openDropdown, setOpenDropdown] =
    useState<string | null>(null);

  useEffect(() => {
    const role = sessionStorage.getItem("role");
    const menuByRole = getMenuByRole(role || "");
    setMenu(menuByRole);
  }, []);

  return (
    <aside
      className={`bg-slate-900 text-white transition-all duration-300 ${open ? "w-64" : "w-16"
        }`}
    >
      <div className="p-4 font-bold text-lg">FP</div>

      <nav className="space-y-2 px-2">
        {menu.map((item, index) => {

          // dropdown menu
          if (item.children) {
            const isOpen =
              openDropdown === item.name;

            return (
              <div key={index}>

                {/* Parent */}
                <button
                  onClick={() =>
                    setOpenDropdown(
                      isOpen ? null : item.name
                    )
                  }
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-700 bg-slate-800"
                >
                  <span>
                    {open
                      ? item.name
                      : item.name.charAt(0)}
                  </span>

                  {open && (
                    isOpen ? (
                      <ChevronDown size={18} />
                    ) : (
                      <ChevronRight size={18} />
                    )
                  )}
                </button>

                {/* Child Menu */}
                {isOpen && (
                  <div className="ml-4 mt-2 space-y-1">

                    {item.children.map((sub: any) => (
                      <Link
                        key={sub.path}
                        href={sub.path}
                        className={`block p-2 rounded-lg text-sm ${pathname === sub.path
                          ? "bg-blue-600"
                          : "hover:bg-slate-700"
                          }`}
                      >
                        {open
                          ? sub.name
                          : sub.name.charAt(0)}
                      </Link>
                    ))}

                  </div>
                )}
              </div>
            );
          }

          // normal menu
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`block p-3 rounded-lg ${pathname.startsWith(item.path)
                ? "bg-blue-600"
                : "hover:bg-slate-700"
                }`}
            >
              {open
                ? item.name
                : item.name.charAt(0)}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}