"use client";

import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";
import { getFirstImage } from "@/lib/image-utils";

export function CartDrawer() {
  const {
    items,
    isOpen,
    setIsOpen,
    removeItem,
    updateQuantity,
    totalPrice,
    clearCart,
  } = useCart();

  const handleCheckout = () => {
    setIsOpen(false);
    window.location.href = "/checkout";
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <aside
        className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white border-l border-gray-200 z-50 flex flex-col"
        role="dialog"
        aria-label="Cart"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-5 w-5" />
            <h2 className="text-sm font-medium uppercase tracking-wider">
              Корзина
            </h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-6">
              <ShoppingBag className="h-12 w-12 text-gray-300 mb-4" />
              <p className="text-sm text-gray-600 mb-1">Корзина пуста</p>
              <p className="text-xs text-gray-500">
                Добавьте товары из каталога
              </p>
            </div>
          ) : (
            <div className="px-6 py-4 flex flex-col gap-4">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="flex gap-4 py-4 border-b border-gray-200 last:border-0"
                >
                  <div className="relative w-20 h-24 flex-shrink-0 bg-gray-100 overflow-hidden rounded">
                    <img
                      src={getFirstImage(
                        item.product.images || item.product.image1,
                      )}
                      alt={item.product.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.src =
                          "https://via.placeholder.com/80x100?text=Product";
                      }}
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {item.product.title}
                      </h3>
                      <p className="text-xs text-gray-600 mt-0.5">
                        Размер: {item.size}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-gray-300 rounded">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.size,
                              item.quantity - 1,
                            )
                          }
                          className="p-1.5 text-gray-600 hover:text-gray-900"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-3 text-xs font-medium text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.size,
                              item.quantity + 1,
                            )
                          }
                          className="p-1.5 text-gray-600 hover:text-gray-900"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <p className="text-sm font-medium text-gray-900">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => removeItem(item.product.id, item.size)}
                    className="self-start text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-200 px-6 py-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-gray-600">
                Итого
              </span>
              <span className="text-lg font-bold text-gray-900">
                {formatPrice(totalPrice)}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full py-3 bg-gray-900 text-white text-xs uppercase tracking-wider font-medium hover:bg-gray-800 transition-colors rounded"
            >
              Оформить заказ
            </button>
            <button
              onClick={clearCart}
              className="w-full py-2 text-xs text-gray-600 hover:text-gray-900 uppercase tracking-wider"
            >
              Очистить корзину
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
