"use client";

import { useState } from "react";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/hooks/use-products";
import { useCart } from "@/lib/cart-context";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "BYN",
  }).format(price);
};

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showSizes, setShowSizes] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  console.log(
    "[v0] ProductCard - Product:",
    product.title,
    "Sizes:",
    product.sizes,
  );

  const images = [product.image1, product.image2, product.image3];
  const hasMultipleImages = images.length > 1;

  const handleAddToCart = () => {
    if (!product.sizes || product.sizes.length === 0) {
      addItem(product, "");
      return;
    }

    if (!showSizes) {
      setShowSizes(true);
      return;
    }

    if (selectedSize) {
      addItem(product, selectedSize);
      setShowSizes(false);
      setSelectedSize(null);
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="group relative flex flex-col">
      {/* Image container */}
      <div className="relative aspect-square overflow-hidden bg-secondary mb-2">
        {/* Main image (always loaded) */}
        <img
          src={images[0]}
          alt={product.title}
          className={`w-full h-full object-cover transition-all duration-500 ${
            currentImageIndex === 0 ? "opacity-100" : "opacity-0"
          } ${imageLoaded ? "scale-100" : "scale-105"} group-hover:scale-105`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onLoad={() => setImageLoaded(true)}
        />

        {/* Additional images (lazy loaded, only render when navigated) */}
        {hasMultipleImages && currentImageIndex > 0 && (
          <img
            src={images[currentImageIndex]}
            alt={`${product.title} - photo ${currentImageIndex + 1}`}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}

        {/* Image navigation arrows */}
        {hasMultipleImages && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 bg-background/70 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background/90"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-3.5 w-3.5 text-foreground" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 bg-background/70 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background/90"
              aria-label="Next photo"
            >
              <ChevronRight className="h-3.5 w-3.5 text-foreground" />
            </button>
          </>
        )}

        {/* Image dots indicator */}
        {hasMultipleImages && (
          <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentImageIndex
                    ? "bg-foreground w-4"
                    : "bg-foreground/40 hover:bg-foreground/60 w-1.5"
                }`}
                aria-label={`Photo ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {/* Badges are not available in new API, but can be added later */}
        </div>

        {/* Quick add overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-background/90 backdrop-blur-sm z-20">
          {showSizes && product.sizes && product.sizes.length > 0 ? (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1.5 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1.5 text-[11px] uppercase tracking-wider border transition-all duration-200 ${
                      selectedSize === size
                        ? "border-foreground bg-foreground text-background"
                        : "border-border text-foreground hover:border-foreground"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className="w-full py-2 bg-foreground text-background text-[11px] uppercase tracking-[0.15em] hover:bg-foreground/90 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {"В корзину"}
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 py-2 text-[11px] uppercase tracking-[0.15em] text-foreground hover:text-muted-foreground transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              {product.sizes && product.sizes.length > 0
                ? "Выбрать размер"
                : "В корзину"}
            </button>
          )}
        </div>
      </div>

      {/* Product info */}
      <div className="flex flex-col gap-0.5">
        <span className="text-[8px] uppercase tracking-[0.1em] text-muted-foreground">
          {product.category}
        </span>
        <h3 className="text-xs font-medium text-foreground leading-tight line-clamp-2">
          {product.title}
        </h3>
        <div className="flex items-center gap-1">
          <span className="text-xs font-medium text-foreground">
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
    </div>
  );
}
