"use client";

import { useState } from "react";
import { useProducts } from "@/hooks/use-products";
import { ProductCard } from "./product-card";
import { Pagination } from "./pagination";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const PRODUCTS_PER_PAGE = 6;
const CATEGORIES = ["Все", "clothing", "accessories", "footwear"];
const CATEGORY_LABELS: Record<string, string> = {
  Все: "Все",
  clothing: "Одежда",
  accessories: "Аксессуары",
  footwear: "Обувь",
};

export function Catalog() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [currentPage, setCurrentPage] = useState(1);
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.02 });
  const { products, isLoading } = useProducts();

  const filteredProducts =
    activeCategory === "Все"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to catalog section
    const catalogSection = document.getElementById("catalog");
    if (catalogSection) {
      const headerHeight = 80;
      const top = catalogSection.offsetTop - headerHeight;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section
      id="catalog"
      className="px-4 lg:px-6 py-12 lg:py-20"
      ref={sectionRef}
    >
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div
          className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">
              {"Каталог"}
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
              {"Новая коллекция"}
            </h2>
          </div>

          {/* Category filters */}
          <div className="flex items-center gap-1 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 text-[11px] uppercase tracking-[0.15em] transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
          </div>
        )}

        {/* Product grid */}
        {!isLoading && (
          <>
            <div className="grid grid-cols-2 gap-3 lg:gap-60">
              {currentProducts.map((product, index) => (
                <div
                  key={product.id}
                  className={`transition-all duration-600 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{
                    transitionDelay: isVisible
                      ? `${Math.min(index * 80, 400)}ms`
                      : "0ms",
                    transitionDuration: "600ms",
                  }}
                >
                  <ProductCard product={product} index={index} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
}
