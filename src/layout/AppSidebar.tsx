"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import {
  BoxCubeIcon,
  CalenderIcon,
  ChevronDownIcon,
  GridIcon,
  HorizontaLDots,
  ListIcon,
  PageIcon,
  PieChartIcon,
  PlugInIcon,
  TableIcon,
  UserCircleIcon,
} from "../icons/index";
import SidebarWidget from "./SidebarWidget";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    subItems: [{ name: "Ecommerce", path: "/", pro: false }],
  },
  {
    icon: <CalenderIcon />,
    name: "Calendar",
    path: "/calendar",
  },
  {
    icon: <UserCircleIcon />,
    name: "User Profile",
    path: "/profile",
  },
  {
    name: "Forms",
    icon: <ListIcon />,
    subItems: [{ name: "Form Elements", path: "/form-elements", pro: false }],
  },
  {
    name: "Tables",
    icon: <TableIcon />,
    subItems: [{ name: "Basic Tables", path: "/basic-tables", pro: false }],
  },
  {
    name: "Pages",
    icon: <PageIcon />,
    subItems: [
      { name: "Blank Page", path: "/blank", pro: false },
      { name: "404 Error", path: "/error-404", pro: false },
    ],
  },
  {
    icon: <PageIcon />,
    name: "Quản lý Blog",
    path: "/admin/managerblog",
  },
  {
    icon: <TableIcon />,
    name: "Courses",
    path: "/admin/courses",
  },
  {
    icon: <PageIcon />,
    name: "Quản lý Workshop",
    path: "/admin/workshops",
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  const renderMenuItems = (
    navItems: NavItem[],
    menuType: "main" | "others"
  ) => (
    <ul className="flex flex-col gap-2">
      {navItems.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group relative overflow-hidden transition-all duration-300 ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                  : "text-gray-700 hover:bg-gradient-to-r hover:from-orange-100 hover:to-red-100 hover:text-orange-700"
              } cursor-pointer rounded-xl p-3 flex items-center ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl"></div>
              
              <span
                className={`relative z-10 transition-all duration-300 ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "text-white"
                    : "text-gray-600 group-hover:text-orange-600"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="relative z-10 ml-3 font-medium text-sm">
                  {nav.name}
                </span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200 relative z-10 ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-white"
                      : "text-gray-500 group-hover:text-orange-500"
                  }`}
                />
              )}
              
              {/* Glow effect */}
              {openSubmenu?.type === menuType && openSubmenu?.index === index && (
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl animate-pulse opacity-20"></div>
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                className={`menu-item group relative overflow-hidden transition-all duration-300 ${
                  isActive(nav.path)
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg transform scale-105"
                    : "text-gray-700 hover:bg-gradient-to-r hover:from-orange-100 hover:to-red-100 hover:text-orange-700"
                } rounded-xl p-3 flex items-center ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "lg:justify-start"
                }`}
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl"></div>
                
                <span
                  className={`relative z-10 transition-all duration-300 ${
                    isActive(nav.path)
                      ? "text-white"
                      : "text-gray-600 group-hover:text-orange-600"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="relative z-10 ml-3 font-medium text-sm">
                    {nav.name}
                  </span>
                )}
                
                {/* Active indicator */}
                {isActive(nav.path) && (
                  <div className="absolute right-0 top-0 bottom-0 w-1 bg-white rounded-l-full"></div>
                )}
                
                {/* Glow effect */}
                {isActive(nav.path) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl animate-pulse opacity-20"></div>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-3 relative">
                {/* Connecting line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-300 to-red-300 opacity-30"></div>
                
                {nav.subItems.map((subItem, subIndex) => (
                  <li key={subItem.name} className="relative">
                    <Link
                      href={subItem.path}
                      className={`menu-dropdown-item relative flex items-center p-2 rounded-lg transition-all duration-200 ${
                        isActive(subItem.path)
                          ? "bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 font-medium"
                          : "text-gray-600 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600"
                      }`}
                    >
                      {/* Dot indicator */}
                      <div className={`w-2 h-2 rounded-full mr-3 transition-all duration-200 ${
                        isActive(subItem.path) 
                          ? "bg-gradient-to-r from-orange-500 to-red-500" 
                          : "bg-gray-300 group-hover:bg-orange-400"
                      }`}></div>
                      
                      <span className="text-sm">{subItem.name}</span>
                      
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span className="px-2 py-1 text-xs bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full font-medium">
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span className="px-2 py-1 text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium">
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-4 left-0 bg-white dark:bg-gray-900 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-orange-100 shadow-xl
        ${isExpanded || isMobileOpen
          ? "w-[290px]"
          : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: 'linear-gradient(to bottom, #fff 0%, #fef7f0 100%)'
      }}
    >
      {/* Header */}
      <div
        className={`py-8 flex items-center ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link href="/" className="group">
          {isExpanded || isHovered || isMobileOpen ? (
            <div className="flex items-center gap-3">
              <div className="relative">
                <Image
                  src="/images/logo/logo-icon.svg"
                  alt="Logo"
                  width={40}
                  height={40}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
              <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 font-bold text-2xl">
                DUPSS
              </h2>
            </div>
          ) : (
            <div className="relative">
              <Image
                src="/images/logo/logo-icon.svg"
                alt="Logo"
                width={40}
                height={40}
                className="transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-6">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "MENU"
                ) : (
                  <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                    <HorizontaLDots className="w-4 h-4 text-white" />
                  </div>
                )}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>
          </div>
        </nav>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-orange-50 to-transparent pointer-events-none"></div>
      
      {/* Animated dots */}
      <div className="absolute top-1/2 right-2 space-y-2 opacity-20">
        <div className="w-1 h-1 bg-orange-500 rounded-full animate-pulse"></div>
        <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse delay-300"></div>
        <div className="w-1 h-1 bg-orange-500 rounded-full animate-pulse delay-700"></div>
      </div>
    </aside>
  );
};

export default AppSidebar;