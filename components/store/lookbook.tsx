"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export function Lookbook() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 })

  return (
    <section id="lookbook" className="px-6 lg:px-12 py-20 lg:py-32" ref={ref}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
        {/* Left - Text */}
        <div
          className={`flex flex-col justify-center lg:pr-12 transition-all duration-800 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          }`}
          style={{ transitionDuration: "800ms" }}
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">
            {"О бренде"}
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-foreground mb-6 text-balance leading-tight">
            {"Не следуй трендам — создавай их"}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-lg">
            {"UBALY — это белорусский стритвир бренд, созданный для тех, кто живет по своим правилам. Мы верим, что одежда — это не просто ткань, а способ заявить о себе миру."}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-lg">
            {"Каждая коллекция — лимитированная серия. Мы используем плотный хлопок, техничные ткани и качественную фурнитуру. Все изделия отшиваются малыми партиями в Беларуси с вниманием к каждой детали."}
          </p>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8 mb-8">
            <div>
              <p className="text-2xl lg:text-3xl font-bold text-foreground">500+</p>
              <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mt-1">
                {"Уникальных дизайнов"}
              </p>
            </div>
            <div className="hidden sm:block w-px h-12 bg-border" />
            <div className="h-px sm:hidden bg-border" />
            <div>
              <p className="text-2xl lg:text-3xl font-bold text-foreground">3K+</p>
              <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mt-1">
                {"Довольных клиентов"}
              </p>
            </div>
            <div className="hidden sm:block w-px h-12 bg-border" />
            <div className="h-px sm:hidden bg-border" />
            <div>
              <p className="text-2xl lg:text-3xl font-bold text-foreground">100%</p>
              <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mt-1">
                {"Качество"}
              </p>
            </div>
          </div>

          {/* CTA */}
          <a
            href="#catalog"
            className="inline-flex items-center self-start px-8 py-3 border border-foreground text-foreground text-xs uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-all duration-300"
          >
            {"Смотреть каталог"}
          </a>
        </div>

        {/* Right - Image */}
        <div
          className={`relative aspect-[3/4] lg:aspect-auto overflow-hidden transition-all duration-800 ${
            isVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-10 scale-[0.97]"
          }`}
          style={{ transitionDuration: "900ms", transitionDelay: "200ms" }}
        >
          <img
            src="/lookbook.jpg"
            alt="UBALY lookbook"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
