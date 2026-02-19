"use client"

import { useState, useEffect } from "react"
import { ArrowDown } from "lucide-react"

export function Hero() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 50)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background image */}
      <img
        src="/hero.jpg"
        alt="UBALY collection"
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1.2s] ease-out ${
          loaded ? "scale-100 opacity-100" : "scale-105 opacity-0"
        }`}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-foreground/50" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        <p
          className={`text-xs uppercase tracking-[0.4em] text-background/70 mb-6 transition-all duration-600 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "300ms", transitionDuration: "600ms" }}
        >
          {"Коллекция 2026"}
        </p>
        <h2
          className={`text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-background text-balance leading-none mb-6 transition-all duration-800 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "500ms", transitionDuration: "800ms" }}
        >
          {"Определяй"}
          <br />
          {"свой стиль"}
        </h2>
        <p
          className={`text-sm md:text-base text-background/70 max-w-md leading-relaxed mb-10 transition-all duration-600 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "700ms", transitionDuration: "600ms" }}
        >
          {"Премиальный стритвир для тех, кто создает стиль, а не следует ему"}
        </p>
        <a
          href="#catalog"
          className={`inline-flex items-center gap-2 px-8 py-3 border border-background text-background text-xs uppercase tracking-[0.2em] hover:bg-background hover:text-foreground transition-all duration-300 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "900ms", transitionDuration: "600ms" }}
        >
          {"Смотреть каталог"}
        </a>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 transition-all duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "1100ms" }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-background/70">Scroll</span>
        <ArrowDown className="h-4 w-4 text-background/70 animate-bounce" />
      </div>
    </section>
  )
}
