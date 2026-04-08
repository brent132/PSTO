"use client";
import { useEffect, useRef, useState } from "react";

export function useStickyActive<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [isStickyActive, setIsStickyActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const initialTop = el.offsetTop;
    const handleScroll = () => {
      setIsStickyActive(window.scrollY >= initialTop);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return { ref, isStickyActive };
}
