"use client";
import { navList } from "./routes";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo_black from "@public/favicon.ico";
import '@styles/navbar.scss'

// 移除多余的缩进，确保组件定义正确
export default function Navbar() {
  const pathname = usePathname();
  const [avtive, setActive] = useState(false);
  const [isFrosted, setIsFrosted] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollYRef = useRef(0);
  const tickingRef = useRef(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY || 0;

      if (!tickingRef.current) {
        window.requestAnimationFrame(() => {
          const atTop = currentY <= 2;
          setIsFrosted(!atTop);

          const lastY = lastScrollYRef.current;
          const isScrollingDown = currentY > lastY;

          // 添加阈值，避免微小滚动抖动
          const threshold = 6;
          if (Math.abs(currentY - lastY) > threshold) {
            setIsHidden(isScrollingDown && !atTop);
            lastScrollYRef.current = currentY;
          }

          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };

    lastScrollYRef.current = window.scrollY || 0;
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
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
      <div className={`nav ${isFrosted ? "nav--frosted" : "nav--transparent"} ${isHidden ? "nav--hidden" : ""}`} id="layout_nav">
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