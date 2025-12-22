"use client";

import { HEADER_MENUS } from "@/lib/ApiPath";
import client from "@/lib/apollo-client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon, solidIcons } from "@/icons/icons";

const Header = () => {
  const [mainMenus, setMainMenus] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const pathname = usePathname();

  const iconMap = [
    { name: "Home", Icon: solidIcons.faHouse, slug: "/" },
    { name: "About us", Icon: solidIcons.faInfo, slug: "/about" },
    { name: "Gallery", Icon: solidIcons.faImage, slug: "/gallery" },
    { name: "Products", Icon: solidIcons.faRecycle, slug: "/products" },
    { name: "Contact Us", Icon: solidIcons.faPhone, slug: "/contact-us" },
  ];


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Fetch Menus
  const fetchMenuData = async () => {
    try {
      const res = await client.query({ query: HEADER_MENUS });
      const allMenus = res.data.menus.nodes[0].menuItems.nodes;
      const menuMap = {};

      allMenus.forEach((item) => {
        const iconItem = iconMap.find(
          (i) => i.name.toLowerCase() === item.label.toLowerCase()
        );

        menuMap[item.id] = {
          ...item,
          Icon: iconItem ? iconItem.Icon : solidIcons.faCircle,
          children: [],
        };
      });

      const tree = [];
      allMenus.forEach((item) => {
        if (item.parentId) {
          const parent = menuMap[item.parentId];
          if (parent) {
            const child = menuMap[item.id];
            const parentPath = parent.path?.replace(/\/$/, "");
            const childPath = child.path?.replace(/^\//, "");
            child.fullPath = `${parentPath}/${childPath}`;
            parent.children.push(child);
          }
        } else {
          tree.push(menuMap[item.id]);
        }
      });

      setMainMenus(tree);
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };



const isMenuActive = (menu) => {
  console.log("menu",menu);
  
  const cleanPath = pathname.replace(/\/$/, "");
  const parentPath = (menu.path || "").replace(/\/$/, "");
  console.log("cleanPath",cleanPath);
  

  //  If the current page is exactly the parent
  if (cleanPath === parentPath){

    console.log("cleanPath",cleanPath);
   console.log("parentPath",parentPath);
return true;
  } 

  // ✅ If the current page matches ANY submenu path
  if (menu.children?.some((sub) => cleanPath === sub.fullPath)) return true;

  return false;
};

  useEffect(() => {
    fetchMenuData();
  }, []);

  return (
    <div
      className={`headerCvr w-full fixed top-0 left-0 z-50 bg-[#f2f2f2] px-5 py-1 flex items-center justify-center transition-all duration-500
        ${isScrolled ? "h-[80px] shadow-md" : "h-[150px]"}
      `}
    >
      <div className="header w-[65%] flex items-center justify-between h-full">
        
        {/* LOGO */}
        <div className="logo h-full flex items-center p-1 transition-all duration-500">
          <Link href="/">
            <img
              className={`${isScrolled ? "h-[60px]" : "h-[99%]"} transition-all duration-500`}
              src="https://dev.tolirwa.com/wp-content/themes/sreyas/logo.png"
              alt="Logo"
            />
          </Link>
        </div>

        {/* Menus */}
        <div className="hidden md:flex flex-col justify-between w-[60%] h-full">

          {/*  Hide call on scroll */}
          {!isScrolled && (
            <div className="flex justify-end h-[50%] pe-4 transition-all duration-500">
              <div className="phone w-[40%] h-[50%] flex items-center justify-center p-6 bg-[#ef3713] border-4 border-white shadow-lg rounded-md text-white">
                <a href="tel:+250788515964">Call : +250 78851 5964</a>
              </div>
            </div>
          )}

          <ul className={`flex h-[50%] items-center justify-end pe-4 relative transition-all duration-300 ${isScrolled ? "mt-5" : ""}`}>
            {mainMenus.map((menu) => (
              <li
                key={menu.id}
                className={`relative group flex flex-col items-center px-5 py-3 text-[#4d4d4d]
                    hover:bg-[#ef3713] hover:text-white transition-all duration-300
                    ${isMenuActive(menu) ? "bg-[#ef3713] text-white" : ""}
                `}
              >
              
                <Link href={menu.path} className="text-[13px] flex flex-col items-center justify-center">
                  <FontAwesomeIcon icon={menu.Icon}  className="text-xl mb-1" aria-hidden="true"/>
                  {menu.label}
                </Link>

                {menu.children?.length > 0 && (
                  <ul className="absolute hidden group-hover:block bg-[#ef3713] text-white top-full left-0 w-[200px] shadow-lg z-50">
                    {menu.children.map((sub) => (
                      <li
                        key={sub.id}
                        className="p-3 hover:bg-[#ef3713] text-sm border-y border-[#11010133]"
                      >
                        <Link href={sub.fullPath}>{sub.label}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden text-3xl text-[#ef3713]" aria-label="Open menu" onClick={() => {
            setMenuOpen(!menuOpen);
            setOpenSubmenu(null);}}>
          <FontAwesomeIcon icon={solidIcons.faBars} />
        </button>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {menuOpen && (
        <div className="fixed top-[70px] left-0 w-full h-screen bg-[#f2f2f2] z-40 md:hidden overflow-y-auto">
        
          <div className="w-full bg-[#ef3713] text-white text-center py-4 text-lg font-semibold">
            <a href="tel:+250788515964">Call : +250 78851 5964</a>
          </div>
          <ul className="p-5 flex flex-col gap-4">
            {mainMenus.map((menu) => (
              <li key={menu.id}>
                <div className="flex justify-between items-center py-3 border-b">
                  <Link href={menu.path || "#"} onClick={() => setMenuOpen(false)}>
                    {menu.label}
                  </Link>

                  {menu.children.length > 0 && (
                    <FontAwesomeIcon
                      icon={
                        openSubmenu === menu.id
                          ? solidIcons.faChevronUp
                          : solidIcons.faChevronDown
                      }
                      className="cursor-pointer text-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenSubmenu(openSubmenu === menu.id ? null : menu.id);
                      }}
                      aria-hidden="true"
                    />
                  )}
                </div>

                {openSubmenu === menu.id && (
                  <ul className="pl-5 bg-gray-50">
                    {menu.children.map((sub) => (
                      <li key={sub.id} className="py-2 text-sm">
                        <Link href={sub.fullPath} onClick={() => setMenuOpen(false)}>
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
