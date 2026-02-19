"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import logo from "../../public/logo.png";

export function Header() {
  const { totalItems, setIsOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-4 lg:px-12">
        {/* Mobile menu button */}
        <button
          className={`lg:hidden transition-colors duration-300 ${
            scrolled ? "text-foreground" : "text-white"
          }`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>

        {/* Nav links - desktop */}
        <nav className="hidden lg:flex items-center gap-8">
          <a
            href="#catalog"
            className={`text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${
              scrolled
                ? "text-muted-foreground hover:text-foreground"
                : "text-white hover:text-gray-200"
            }`}
          >
            {"Каталог"}
          </a>
          <a
            href="#lookbook"
            className={`text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${
              scrolled
                ? "text-muted-foreground hover:text-foreground"
                : "text-white hover:text-gray-200"
            }`}
          >
            {"Лукбук"}
          </a>
          <a
            href="#about"
            className={`text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${
              scrolled
                ? "text-muted-foreground hover:text-foreground"
                : "text-white hover:text-gray-200"
            }`}
          >
            {"О нас"}
          </a>
        </nav>

        {/* Logo */}
        <a href="/" className="absolute left-1/2 -translate-x-1/2">
          <Image
            src={logo}
            alt="UBALY"
            width={100}
            height={32}
            className="h-15 w-auto"
            priority
          />
        </a>

        {/* Cart */}
        <button
          onClick={() => setIsOpen(true)}
          className={`relative flex items-center gap-2 transition-colors duration-300 ${
            scrolled
              ? "text-foreground hover:text-muted-foreground"
              : "text-white hover:text-gray-200"
          }`}
          aria-label={`Cart, ${totalItems} items`}
        >
          <ShoppingBag className="h-5 w-5" />
          {totalItems > 0 && (
            <span
              className={`absolute -top-1.5 -right-2 h-4 w-4 rounded-full text-[10px] flex items-center justify-center font-medium animate-scale-in ${
                scrolled
                  ? "bg-foreground text-background"
                  : "bg-white text-foreground"
              }`}
            >
              {totalItems}
            </span>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden border-t border-border bg-background overflow-hidden transition-all duration-400 ${
          mobileMenuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ transitionDuration: "400ms" }}
      >
        <nav className="px-6 py-6 flex flex-col gap-4">
          <a
            href="#catalog"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
          >
            {"Каталог"}
          </a>
          <a
            href="#lookbook"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
          >
            {"Лукбук"}
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
          >
            {"О нас"}
          </a>
        </nav>
      </div>
    </header>
  );
}
