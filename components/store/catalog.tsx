"use client";

import { useState } from "react";
import { useProducts } from "@/hooks/use-products";
import { ProductCard } from "./product-card";

const PRODUCTS_PER_PAGE = 6;
const CATEGORIES = ["Все", "hoodie", "longsleeves", "shirts"];
const CATEGORY_LABELS: Record<string, string> = {
  Все: "Все",
  hoodie: "Худи",
  longsleeves: "Лонгсливы",
  shirts: "Футболки",
};

export function Catalog() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [currentPage, setCurrentPage] = useState(1);
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
    const catalogSection = document.getElementById("catalog");
    if (catalogSection) {
      const headerHeight = 80;
      const top = catalogSection.offsetTop - headerHeight;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section id="catalog" className="px-4 lg:px-6 py-12 lg:py-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
              Каталог
            </h2>
          </div>

          <div className="flex items-center gap-0 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 text-xs uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
          </div>
        )}

        {!isLoading && (
          <>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6 mb-8">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-xs uppercase tracking-wider border border-gray-300 text-gray-900 hover:border-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Назад
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-2 text-xs uppercase tracking-wider border transition-colors ${
                        page === currentPage
                          ? "border-gray-900 bg-gray-900 text-white"
                          : "border-gray-300 text-gray-900 hover:border-gray-900"
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}

                <button
                  onClick={() =>
                    handlePageChange(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-xs uppercase tracking-wider border border-gray-300 text-gray-900 hover:border-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Далее
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
