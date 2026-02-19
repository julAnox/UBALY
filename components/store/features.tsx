"use client"

import { Truck, Shield, RefreshCw, MessageCircle } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const features = [
  {
    icon: Truck,
    title: "Доставка по Беларуси",
    description:
      "Бесплатная доставка по Минску при заказе от 200 BYN. Отправка в течение 1-2 рабочих дней. Доставка курьером или почтой по всей Беларуси.",
  },
  {
    icon: Shield,
    title: "Гарантия качества",
    description:
      "Все изделия проходят строгий контроль качества. Используем только премиальные материалы и фурнитуру.",
  },
  {
    icon: RefreshCw,
    title: "Обмен и возврат",
    description:
      "14 дней на обмен или возврат товара. Если вещь не подошла по размеру — обменяем бесплатно.",
  },
  {
    icon: MessageCircle,
    title: "Поддержка 24/7",
    description:
      "Свяжитесь с нами в Telegram или Instagram. Поможем подобрать размер и ответим на любые вопросы.",
  },
]

export function Features() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 })

  return (
    <section ref={ref} className="px-6 lg:px-12 py-20 lg:py-28 border-y border-border">
      <div
        className={`mb-12 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">
          {"Почему мы"}
        </p>
        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground text-balance">
          {"Больше, чем просто одежда"}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className={`flex flex-col gap-4 group transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: isVisible ? `${200 + index * 120}ms` : "0ms" }}
          >
            <div className="w-12 h-12 border border-border flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all duration-300">
              <feature.icon className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-medium text-foreground uppercase tracking-[0.1em]">
              {feature.title}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
