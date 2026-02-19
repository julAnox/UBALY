"use client"

import { Header } from "@/components/store/header"
import { Hero } from "@/components/store/hero"
import { Marquee } from "@/components/store/marquee"
import { Catalog } from "@/components/store/catalog"
import { Lookbook } from "@/components/store/lookbook"
import { Features } from "@/components/store/features"
import { Footer } from "@/components/store/footer"
import { CartDrawer } from "@/components/store/cart-drawer"

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Catalog />
        <Features />
        <Lookbook />
        <Marquee />
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}
