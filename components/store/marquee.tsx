"use client"

export function Marquee() {
  const text = "UBALY \u00B7 STREETWEAR \u00B7 PREMIUM QUALITY \u00B7 LIMITED EDITION \u00B7 MINSK \u00B7 "

  return (
    <div className="overflow-hidden border-y border-border py-4 hover:border-foreground/20 transition-colors duration-500">
      <div
        className="flex whitespace-nowrap"
        style={{ animation: "marquee 30s linear infinite" }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="text-xs uppercase tracking-[0.3em] text-muted-foreground mx-4"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  )
}
