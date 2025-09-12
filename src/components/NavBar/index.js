"use client";
import { navList } from "./routes";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo_black from "@public/favicon.ico";
import '@styles/navbar.scss'

// 移除多余的缩进，确保组件定义正确
export default function Navbar() {
  const pathname = usePathname();
  const [avtive, setActive] = useState(false);
  
  // 导航item
  const navItem = (obj) => {
    return (
      <Link
        className={`nav_item nav_list ${pathname !== "/" && pathname === obj?.href ? "nav_item_active" : ""}`}
        key={obj?.key}
        href={obj?.href}
        onClick={() => setActive(false)}
      >
        <span className="nav_item_title">{obj?.title}</span>
      </Link>
    );
  };
  
  return (
    <>
      <div className="nav" id="layout_nav">
        <div className="nav_left">
          <Link href="/">
            {/* 修复className语法错误 */}
            <Image
              className="logo"
              alt="about"
              src={logo_black}
              priority={true}
            />
          </Link>
        </div>
        <div className="nav_right">
            {navList?.map((v) => navItem(v))}
        </div>
        {/* 其他被注释的代码保持不变 */}
      </div>
    </>
  );
}