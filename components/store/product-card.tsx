"use client";

import { useState } from "react";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/hooks/use-products";
import { useCart } from "@/lib/cart-context";
import { getAllImages, getFirstImage } from "@/lib/image-utils";

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "BYN",
  }).format(price);
};

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showSizes, setShowSizes] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  const images = getAllImages(product.images);
  const hasMultipleImages = images.length > 1;

  console.log(
    "[v0] Product:",
    product.title,
    "Images array:",
    images,
    "Images field:",
    product.images,
  );

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
      <div className="relative aspect-square overflow-hidden bg-gray-100 mb-2 rounded">
        <img
          src={getFirstImage(product.images || product.image1)}
          alt={product.title}
          className={`w-full h-full object-cover transition-all duration-500 ${
            currentImageIndex === 0 ? "opacity-100" : "opacity-0"
          } ${imageLoaded ? "scale-100" : "scale-105"} group-hover:scale-105`}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.src = "https://via.placeholder.com/400x500?text=Product";
          }}
        />

        {hasMultipleImages &&
          currentImageIndex > 0 &&
          images[currentImageIndex] && (
            <img
              src={images[currentImageIndex]}
              alt={`${product.title} - ${currentImageIndex + 1}`}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          )}

        {hasMultipleImages && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 bg-white/70 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/90 rounded"
            >
              <ChevronLeft className="h-3.5 w-3.5 text-gray-900" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 bg-white/70 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/90 rounded"
            >
              <ChevronRight className="h-3.5 w-3.5 text-gray-900" />
            </button>
          </>
        )}

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
                    ? "bg-gray-900 w-4"
                    : "bg-gray-400 hover:bg-gray-600 w-1.5"
                }`}
              />
            ))}
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/90 backdrop-blur-sm z-20 rounded-t">
          {showSizes && product.sizes && product.sizes.length > 0 ? (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1.5 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1.5 text-xs uppercase tracking-wider border rounded transition-all duration-200 ${
                      selectedSize === size
                        ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-300 text-gray-900 hover:border-gray-900"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className="w-full py-2 bg-gray-900 text-white text-xs uppercase tracking-wider hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed rounded"
              >
                В корзину
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs uppercase tracking-wider text-gray-900 hover:text-gray-600 transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              {product.sizes && product.sizes.length > 0
                ? "Выбрать размер"
                : "В корзину"}
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-0.5">
        <span className="text-xs uppercase tracking-wider text-gray-600">
          {product.category}
        </span>
        <h3 className="text-sm font-medium text-gray-900 leading-tight line-clamp-2">
          {product.title}
        </h3>
        <span className="text-sm font-medium text-gray-900">
          {formatPrice(product.price)}
        </span>
      </div>
    </div>
  );
}
