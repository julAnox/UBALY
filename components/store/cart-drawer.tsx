"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { X, Minus, Plus, ShoppingBag } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { formatPrice } from "@/lib/products"

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalPrice, clearCart } = useCart()
  const router = useRouter()

  const handleCheckout = () => {
    setIsOpen(false)
    router.push("/checkout")
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/60 backdrop-blur-sm z-50 animate-backdrop-in"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-background border-l border-border z-50 flex flex-col animate-drawer-in"
        role="dialog"
        aria-label="Cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-5 w-5 text-foreground" />
            <h2 className="text-sm font-medium uppercase tracking-[0.15em] text-foreground">
              {"Корзина"}
            </h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-6">
              <ShoppingBag className="h-12 w-12 text-muted-foreground/30 mb-4" />
              <p className="text-sm text-muted-foreground mb-1">{"Корзина пуста"}</p>
              <p className="text-xs text-muted-foreground/60">
                {"Добавьте товары из каталога"}
              </p>
            </div>
          ) : (
            <div className="px-6 py-4 flex flex-col gap-4">
              {items.map((item, index) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="flex gap-4 py-4 border-b border-border last:border-0 animate-fade-up"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-24 flex-shrink-0 bg-secondary overflow-hidden">
                    <Image
                      src={item.product.image1 || 'https://via.placeholder.com/400x500?text=Product'}
                      alt={item.product.title || 'Product'}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <h3 className="text-sm font-medium text-foreground truncate">
                        {item.product.title || item.product.name}
                      </h3>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {"Размер: "}
                        {item.size}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity controls */}
                      <div className="flex items-center border border-border">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.size,
                              item.quantity - 1
                            )
                          }
                          className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-3 text-xs font-medium text-foreground min-w-[24px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.size,
                              item.quantity + 1
                            )
                          }
                          className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <p className="text-sm font-medium text-foreground">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.product.id, item.size)}
                    className="self-start text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={`Remove ${item.product.name}`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border px-6 py-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                {"Итого"}
              </span>
              <span className="text-lg font-bold text-foreground">
                {formatPrice(totalPrice)}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full py-3.5 bg-foreground text-background text-xs uppercase tracking-[0.2em] font-medium hover:bg-foreground/90 transition-all duration-300 hover:tracking-[0.3em]"
            >
              {"Оформить заказ"}
            </button>
            <button
              onClick={clearCart}
              className="w-full py-2 text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-[0.15em]"
            >
              {"Очистить корзину"}
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
