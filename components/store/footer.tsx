"use client";

import Image from "next/image";
import logo from "../../public/logo.png";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export function Footer() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.05 });

  return (
    <footer id="about" className="border-t border-border" ref={ref}>
      <div className="px-6 lg:px-12 py-16 lg:py-20">
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Brand */}
          <div className="lg:col-span-1">
            <Image
              src={logo}
              alt="UBALY"
              width={100}
              height={32}
              className="h-8 w-auto mb-4"
            />
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs mb-4">
              {
                "Премиальный стритвир бренд из Беларуси. Создаем одежду, которая отражает индивидуальность и свободу самовыражения."
              }
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
              {"Все цены указаны в BYN. Доставка по всей Беларуси."}
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4">
              {"Магазин"}
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a
                  href="#catalog"
                  className="text-xs text-foreground hover:text-muted-foreground transition-colors"
                >
                  {"Каталог"}
                </a>
              </li>
              <li>
                <a
                  href="#catalog"
                  className="text-xs text-foreground hover:text-muted-foreground transition-colors"
                >
                  {"Новинки"}
                </a>
              </li>
              <li>
                <a
                  href="#catalog"
                  className="text-xs text-foreground hover:text-muted-foreground transition-colors"
                >
                  {"Распродажа"}
                </a>
              </li>
              <li>
                <a
                  href="#lookbook"
                  className="text-xs text-foreground hover:text-muted-foreground transition-colors"
                >
                  {"О бренде"}
                </a>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4">
              {"Информация"}
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a
                  href="#"
                  className="text-xs text-foreground hover:text-muted-foreground transition-colors"
                >
                  {"Доставка и оплата"}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-xs text-foreground hover:text-muted-foreground transition-colors"
                >
                  {"Возврат и обмен"}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4">
              {"Рассылка"}
            </h4>
            <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
              {
                "Подпишитесь на эксклюзивные новости и ранний доступ к новым коллекциям."
              }
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://t.me/ubaly_clothes"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Telegram
              </a>
              <a
                href="https://www.instagram.com/ubalyy/"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://www.tiktok.com/@ubaly_clothes"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                TikTok
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Payment info */}
      <div className="border-t border-border px-6 lg:px-12 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[10px] text-muted-foreground tracking-wider">
            {"Оплата: наличные, онлайн-перевод по картам (VISA/Mastercard)"}
          </p>
          <p className="text-[10px] text-muted-foreground tracking-wider">
            {"Доставка: Белпочта, курьер, самовывоз (Минск)"}
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border px-6 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[10px] text-muted-foreground tracking-wider">
          {"2026 UBALY. Все права защищены."}
        </p>
        <div className="flex items-center flex-col">
          <p className="text-[10px] text-muted-foreground tracking-wider">
            {"ИП ВАКАРЧУК АННА АЛЕКСЕЕВНА"}
          </p>
          <p className="text-[10px] text-muted-foreground tracking-wider">
            {"УНП 491752096"}
          </p>
        </div>
        <p className="text-[10px] text-muted-foreground tracking-wider">
          {"Беларусь, г. Минск"}
        </p>
      </div>
    </footer>
  );
}
