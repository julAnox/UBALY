"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ShoppingBag,
  Send,
  Check,
  CreditCard,
  Banknote,
  Smartphone,
  MapPin,
  Truck,
  Package,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";

function SuccessOverlay({ messenger }: { messenger: string }) {
  const [showCheck, setShowCheck] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowCheck(true), 300);
    const t2 = setTimeout(() => setShowContent(true), 800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center px-6">
      <div className="flex flex-col items-center text-center">
        <div
          className={`w-20 h-20 rounded-full border-2 border-foreground/20 flex items-center justify-center mb-8 transition-all duration-500 ${
            showCheck
              ? "scale-100 opacity-100 border-foreground"
              : "scale-75 opacity-0"
          }`}
        >
          <Check
            className={`h-8 w-8 text-foreground transition-all duration-400 ${
              showCheck ? "scale-100 opacity-100" : "scale-0 opacity-0"
            }`}
            style={{ transitionDelay: "200ms", transitionDuration: "400ms" }}
          />
        </div>

        <div
          className={`transition-all duration-700 ease-out ${
            showContent
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-5"
          }`}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 tracking-tight text-balance">
            {"Заказ оформлен"}
          </h1>
          <p className="text-sm text-muted-foreground mb-2 max-w-md leading-relaxed">
            {"Мы свяжемся с вами в ближайшее время через "}
            {messenger === "telegram" ? "Telegram" : "Instagram"}
            {" для подтверждения деталей и оплаты."}
          </p>
          <p className="text-xs text-muted-foreground/50 mb-10">
            {"Обычно отвечаем в течение 1-2 часов"}
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-10 py-3.5 bg-foreground text-background text-xs uppercase tracking-[0.2em] font-medium hover:bg-foreground/90 transition-colors duration-300"
          >
            {"На главную"}
          </Link>
        </div>
      </div>
    </div>
  );
}

function SendingOverlay() {
  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center gap-6">
      <div className="w-10 h-10 flex items-center justify-center">
        <Send className="h-6 w-6 text-foreground animate-pulse" />
      </div>
      <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground animate-pulse">
        {"Отправка заказа..."}
      </p>
    </div>
  );
}

const paymentMethods = [
  { id: "card", label: "Перевод на карту", icon: CreditCard },
  { id: "cash", label: "Наличные", icon: Banknote },
  { id: "online", label: "Онлайн-оплата", icon: Smartphone },
] as const;

const deliveryRegions = [
  { id: "minsk", label: "По Минску", icon: MapPin },
  { id: "belarus", label: "По Республике Беларусь", icon: Truck },
  { id: "russia", label: "По России", icon: Package },
] as const;

function FormField({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  touched,
  placeholder,
  type = "text",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  error?: string;
  touched?: boolean;
  placeholder: string;
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`bg-secondary text-foreground text-sm px-4 py-3 border placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground transition-colors ${
          error && touched ? "border-destructive" : "border-border"
        }`}
      />
      {error && touched && (
        <span className="text-[11px] text-destructive">{error}</span>
      )}
    </div>
  );
}

function CheckoutForm() {
  const { items, totalPrice, clearCart } = useCart();
  const [phase, setPhase] = useState<"form" | "sending" | "success">("form");
  const [hydrated, setHydrated] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    patronymic: "",
    phone: "",
    messenger: "telegram",
    messengerHandle: "",
    deliveryRegion: "" as "" | "minsk" | "belarus" | "russia",
    deliveryMethod: "" as "" | "pickup" | "yandex" | "europochta" | "cdek",
    deliveryAddress: "",
    europochtaBranch: "",
    payment: "card",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setHydrated(true);
  }, []);

  const validate = useCallback(() => {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = "Введите имя";
    if (!form.lastName.trim()) e.lastName = "Введите фамилию";
    if (!form.phone.trim()) e.phone = "Введите номер телефона";
    else if (!/^[\d\s\-+()]{7,}$/.test(form.phone.trim()))
      e.phone = "Некорректный номер";
    if (!form.messengerHandle.trim())
      e.messengerHandle =
        form.messenger === "telegram"
          ? "Введите Telegram ID"
          : "Введите Instagram";

    if (!form.deliveryRegion) e.deliveryRegion = "Выберите регион доставки";
    if (form.deliveryRegion && !form.deliveryMethod)
      e.deliveryMethod = "Выберите способ доставки";

    if (form.deliveryRegion === "minsk" && form.deliveryMethod === "yandex") {
      if (!form.deliveryAddress.trim())
        e.deliveryAddress = "Введите адрес доставки";
    }
    if (
      form.deliveryRegion === "belarus" &&
      form.deliveryMethod === "europochta"
    ) {
      if (!form.europochtaBranch.trim())
        e.europochtaBranch = "Введите номер отделения";
      if (!form.deliveryAddress.trim())
        e.deliveryAddress = "Введите адрес доставки";
    }
    if (form.deliveryRegion === "russia" && form.deliveryMethod === "cdek") {
      if (!form.deliveryAddress.trim())
        e.deliveryAddress = "Введите адрес СДЕК";
    }

    return e;
  }, [form]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const allTouched: Record<string, boolean> = {};
      Object.keys(newErrors).forEach((k) => (allTouched[k] = true));
      setTouched((prev) => ({ ...prev, ...allTouched }));
      return;
    }
    setErrors({});
    setPhase("sending");

    try {
      console.log("[v0] Raw items from cart:", JSON.stringify(items));

      const orderItems = items.map((item) => {
        const orderItem = {
          name: item.product.title,
          size: item.size || "",
          quantity: item.quantity,
          price: item.product.price,
        };
        console.log(
          "[v0] Item mapping - product:",
          item.product.title,
          "size field:",
          item.size,
          "final size:",
          orderItem.size,
        );
        return orderItem;
      });

      console.log("[v0] Final order items:", orderItems);

      const orderPayload = {
        name: form.firstName,
        surname: form.lastName,
        patronymic: form.patronymic,
        phone: form.phone,
        contact_method: form.messenger,
        contact_id: form.messengerHandle,
        delivery_region: form.deliveryRegion,
        delivery_method: form.deliveryMethod,
        delivery_address: form.deliveryAddress,
        europochta_branch: form.europochtaBranch,
        payment_method: form.payment,
        items: orderItems,
        total: totalPrice,
      };

      console.log("[v0] Submitting order:", orderPayload);

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.log("[v0] API error response:", errorData);
        throw new Error(errorData.error || "Failed to submit order");
      }

      const successData = await res.json();
      console.log("[v0] Order created successfully:", successData);
      clearCart();
      setPhase("success");
    } catch (err) {
      console.error("[v0] Order submit error:", err);
      setPhase("form");
      setErrors({ submit: "Ошибка при отправке заказа. Попробуйте ещё раз." });
    }
  };

  const handleChange = (field: string, value: string) => {
    setForm((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === "deliveryRegion") {
        updated.deliveryMethod = "" as "";
        updated.deliveryAddress = "";
        updated.europochtaBranch = "";
        if (value === "belarus") updated.deliveryMethod = "europochta";
        if (value === "russia") updated.deliveryMethod = "cdek";
      }
      if (field === "deliveryMethod") {
        updated.deliveryAddress = "";
        updated.europochtaBranch = "";
      }
      return updated;
    });
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const newErrors = validate();
    if (newErrors[field]) {
      setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
    }
  };

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
      </div>
    );
  }

  if (items.length === 0 && phase === "form") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center">
        <ShoppingBag className="h-16 w-16 text-muted-foreground/20 mb-6" />
        <h1 className="text-2xl font-bold text-foreground mb-2">
          {"Корзина пуста"}
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          {"Добавьте товары из каталога, чтобы оформить заказ"}
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3 border border-foreground text-foreground text-xs uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors duration-300"
        >
          <ArrowLeft className="h-4 w-4" />
          {"Вернуться в каталог"}
        </Link>
      </div>
    );
  }

  if (phase === "sending") return <SendingOverlay />;
  if (phase === "success") return <SuccessOverlay messenger={form.messenger} />;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border px-6 lg:px-12 py-4 flex items-center justify-between relative">
        <Link
          href="/"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-xs uppercase tracking-[0.15em] z-10"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">{"Назад"}</span>
        </Link>
        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <Image
            src="/images/logo.png"
            alt="UBALY"
            width={100}
            height={32}
            className="h-8 w-auto"
          />
        </Link>
        <div className="w-20" />
      </header>

      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-10 lg:py-16">
        {/* Title */}
        <div className="mb-10">
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-2">
            {"Оформление заказа"}
          </p>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-foreground">
            {"Заполните форму"}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 flex flex-col gap-8"
            noValidate
          >
            <fieldset className="flex flex-col gap-5">
              <legend className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
                {"Личные данные"}
              </legend>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  id="firstName"
                  label="Имя *"
                  value={form.firstName}
                  onChange={(v) => handleChange("firstName", v)}
                  onBlur={() => handleBlur("firstName")}
                  error={errors.firstName}
                  touched={touched.firstName}
                  placeholder="Иван"
                />
                <FormField
                  id="lastName"
                  label="Фамилия *"
                  value={form.lastName}
                  onChange={(v) => handleChange("lastName", v)}
                  onBlur={() => handleBlur("lastName")}
                  error={errors.lastName}
                  touched={touched.lastName}
                  placeholder="Иванов"
                />
              </div>

              <FormField
                id="patronymic"
                label="Отчество"
                value={form.patronymic}
                onChange={(v) => handleChange("patronymic", v)}
                onBlur={() => handleBlur("patronymic")}
                placeholder="Иванович"
              />

              <FormField
                id="phone"
                label="Номер телефона *"
                type="tel"
                value={form.phone}
                onChange={(v) => handleChange("phone", v)}
                onBlur={() => handleBlur("phone")}
                error={errors.phone}
                touched={touched.phone}
                placeholder="+375 (29) 123-45-67"
              />
            </fieldset>

            <fieldset className="flex flex-col gap-4">
              <legend className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
                {"Способ связи"}
              </legend>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleChange("messenger", "telegram")}
                  className={`flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-[0.15em] border transition-colors duration-200 ${
                    form.messenger === "telegram"
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted-foreground hover:border-foreground/50 hover:text-foreground"
                  }`}
                >
                  <Send className="h-3.5 w-3.5" />
                  Telegram
                </button>
                <button
                  type="button"
                  onClick={() => handleChange("messenger", "instagram")}
                  className={`flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-[0.15em] border transition-colors duration-200 ${
                    form.messenger === "instagram"
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted-foreground hover:border-foreground/50 hover:text-foreground"
                  }`}
                >
                  <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="17.5" cy="6.5" r="1" />
                  </svg>
                  Instagram
                </button>
              </div>

              <FormField
                id="messengerHandle"
                label={
                  form.messenger === "telegram"
                    ? "Telegram ID / username *"
                    : "Instagram username *"
                }
                value={form.messengerHandle}
                onChange={(v) => handleChange("messengerHandle", v)}
                onBlur={() => handleBlur("messengerHandle")}
                error={errors.messengerHandle}
                touched={touched.messengerHandle}
                placeholder={
                  form.messenger === "telegram"
                    ? "@username"
                    : "@your_instagram"
                }
              />
            </fieldset>

            <fieldset className="flex flex-col gap-4">
              <legend className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
                {"Регион доставки *"}
              </legend>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {deliveryRegions.map((region) => {
                  const Icon = region.icon;
                  const active = form.deliveryRegion === region.id;
                  return (
                    <button
                      key={region.id}
                      type="button"
                      onClick={() => handleChange("deliveryRegion", region.id)}
                      className={`relative flex flex-col items-center gap-2.5 px-4 py-5 border transition-colors duration-200 group ${
                        active
                          ? "border-foreground bg-foreground/5"
                          : "border-border hover:border-foreground/40"
                      }`}
                    >
                      {active && (
                        <div className="absolute top-2 right-2 w-4 h-4 bg-foreground rounded-full flex items-center justify-center">
                          <Check className="h-2.5 w-2.5 text-background" />
                        </div>
                      )}
                      <Icon
                        className={`h-5 w-5 transition-colors ${
                          active
                            ? "text-foreground"
                            : "text-muted-foreground group-hover:text-foreground"
                        }`}
                      />
                      <span
                        className={`text-[11px] uppercase tracking-[0.1em] transition-colors text-center leading-tight ${
                          active
                            ? "text-foreground font-medium"
                            : "text-muted-foreground group-hover:text-foreground"
                        }`}
                      >
                        {region.label}
                      </span>
                    </button>
                  );
                })}
              </div>
              {errors.deliveryRegion && touched.deliveryRegion && (
                <span className="text-[11px] text-destructive">
                  {errors.deliveryRegion}
                </span>
              )}

              {/* --- Minsk delivery methods --- */}
              {form.deliveryRegion === "minsk" && (
                <div className="flex flex-col gap-4 mt-2">
                  <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                    {"Способ доставки *"}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={() => handleChange("deliveryMethod", "pickup")}
                      className={`flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-[0.15em] border transition-colors duration-200 ${
                        form.deliveryMethod === "pickup"
                          ? "border-foreground bg-foreground text-background"
                          : "border-border text-muted-foreground hover:border-foreground/50 hover:text-foreground"
                      }`}
                    >
                      <MapPin className="h-3.5 w-3.5" />
                      {"Самовывоз"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleChange("deliveryMethod", "yandex")}
                      className={`flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-[0.15em] border transition-colors duration-200 ${
                        form.deliveryMethod === "yandex"
                          ? "border-foreground bg-foreground text-background"
                          : "border-border text-muted-foreground hover:border-foreground/50 hover:text-foreground"
                      }`}
                    >
                      <Truck className="h-3.5 w-3.5" />
                      {"Яндекс Доставка"}
                    </button>
                  </div>
                  {errors.deliveryMethod && touched.deliveryMethod && (
                    <span className="text-[11px] text-destructive">
                      {errors.deliveryMethod}
                    </span>
                  )}

                  {form.deliveryMethod === "yandex" && (
                    <FormField
                      id="deliveryAddress"
                      label="Адрес доставки *"
                      value={form.deliveryAddress}
                      onChange={(v) => handleChange("deliveryAddress", v)}
                      onBlur={() => handleBlur("deliveryAddress")}
                      error={errors.deliveryAddress}
                      touched={touched.deliveryAddress}
                      placeholder="г. Минск, ул. Примерная, д. 1, кв. 1"
                    />
                  )}
                </div>
              )}

              {/* --- Belarus delivery (Europochta only) --- */}
              {form.deliveryRegion === "belarus" && (
                <div className="flex flex-col gap-4 mt-2">
                  <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border border-border">
                    <Truck className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-foreground font-medium uppercase tracking-[0.1em]">
                      {"Европочта"}
                    </span>
                  </div>

                  <FormField
                    id="europochtaBranch"
                    label="Номер отделения *"
                    value={form.europochtaBranch}
                    onChange={(v) => handleChange("europochtaBranch", v)}
                    onBlur={() => handleBlur("europochtaBranch")}
                    error={errors.europochtaBranch}
                    touched={touched.europochtaBranch}
                    placeholder="Например: 123"
                  />

                  <FormField
                    id="deliveryAddress"
                    label="Адрес доставки *"
                    value={form.deliveryAddress}
                    onChange={(v) => handleChange("deliveryAddress", v)}
                    onBlur={() => handleBlur("deliveryAddress")}
                    error={errors.deliveryAddress}
                    touched={touched.deliveryAddress}
                    placeholder="г. Гомель, ул. Примерная, д. 1"
                  />
                </div>
              )}

              {/* --- Russia delivery (CDEK only) --- */}
              {form.deliveryRegion === "russia" && (
                <div className="flex flex-col gap-4 mt-2">
                  <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border border-border">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-foreground font-medium uppercase tracking-[0.1em]">
                      {"СДЕК"}
                    </span>
                  </div>

                  <FormField
                    id="deliveryAddress"
                    label="Адрес СДЕК *"
                    value={form.deliveryAddress}
                    onChange={(v) => handleChange("deliveryAddress", v)}
                    onBlur={() => handleBlur("deliveryAddress")}
                    error={errors.deliveryAddress}
                    touched={touched.deliveryAddress}
                    placeholder="г. Москва, пункт выдачи СДЕК, ул. Примерная, д. 1"
                  />
                </div>
              )}
            </fieldset>

            <fieldset className="flex flex-col gap-4">
              <legend className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
                {"Способ оплаты"}
              </legend>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {paymentMethods.map((pm) => {
                  const Icon = pm.icon;
                  const active = form.payment === pm.id;
                  return (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => handleChange("payment", pm.id)}
                      className={`relative flex flex-col items-center gap-2.5 px-4 py-5 border transition-colors duration-200 group ${
                        active
                          ? "border-foreground bg-foreground/5"
                          : "border-border hover:border-foreground/40"
                      }`}
                    >
                      {active && (
                        <div className="absolute top-2 right-2 w-4 h-4 bg-foreground rounded-full flex items-center justify-center">
                          <Check className="h-2.5 w-2.5 text-background" />
                        </div>
                      )}
                      <Icon
                        className={`h-5 w-5 transition-colors ${
                          active
                            ? "text-foreground"
                            : "text-muted-foreground group-hover:text-foreground"
                        }`}
                      />
                      <span
                        className={`text-[11px] uppercase tracking-[0.1em] transition-colors ${
                          active
                            ? "text-foreground font-medium"
                            : "text-muted-foreground group-hover:text-foreground"
                        }`}
                      >
                        {pm.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* Info */}
            <div className="bg-secondary/50 border border-border px-4 py-3">
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                {
                  "После оформления мы свяжемся с вами через выбранный мессенджер для подтверждения деталей, обсуждения доставки и оплаты. Среднее время ответа — 1-2 часа."
                }
              </p>
            </div>

            {/* Submit error */}
            {errors.submit && (
              <div className="bg-destructive/10 border border-destructive/30 px-4 py-3">
                <p className="text-[11px] text-destructive">{errors.submit}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="group relative w-full py-4 bg-foreground text-background text-xs uppercase tracking-[0.2em] font-medium overflow-hidden transition-colors duration-300 hover:bg-foreground/90"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Send className="h-3.5 w-3.5" />
                {"Отправить заказ"}
              </span>
            </button>
          </form>

          <div className="lg:col-span-2">
            <div className="sticky top-8">
              <h3 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-5">
                {"Ваш заказ"} ({items.length})
              </h3>

              <div className="flex flex-col mb-6">
                {items.map((item, idx) => {
                  if (idx === 0)
                    console.log("[v0] First item in summary:", item);
                  return (
                    <div
                      key={`${item.product.id}-${item.size}`}
                      className={`flex gap-3 py-3 ${
                        idx < items.length - 1 ? "border-b border-border" : ""
                      }`}
                    >
                      <div className="relative w-14 h-[72px] flex-shrink-0 bg-secondary overflow-hidden">
                        <Image
                          src={
                            item.product.image1 ||
                            "https://via.placeholder.com/400x500?text=Product"
                          }
                          alt={item.product.title || "Product"}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <h4 className="text-xs font-medium text-foreground truncate">
                            {item.product.title || item.product.name}
                          </h4>
                          <p className="text-[10px] text-muted-foreground mt-0.5">
                            {"Размер: "}
                            {item.size || "-"}
                            {" / Кол-во: "}
                            {item.quantity}
                          </p>
                        </div>
                        <p className="text-xs font-medium text-foreground">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-border pt-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {"Доставка"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {"Обсуждается отдельно"}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="text-xs uppercase tracking-[0.15em] text-foreground font-medium">
                    {"Итого"}
                  </span>
                  <span className="text-lg font-bold text-foreground">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return <CheckoutForm />;
}
