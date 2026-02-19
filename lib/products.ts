export interface Product {
  id: string
  name: string
  price: number
  oldPrice?: number
  images: string[]
  category: string
  sizes: string[]
  isNew?: boolean
  isSale?: boolean
  description: string
  material?: string
  color?: string
}

export const products: Product[] = [
  {
    id: "1",
    name: "Oversized Hoodie Essential",
    price: 289,
    images: ["/product-1-front.jpg", "/product-1-back.jpg", "/product-1-side.jpg"],
    category: "Худи",
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
    description: "Оверсайз худи из плотного хлопка с минималистичным дизайном. Идеальный баланс комфорта и стиля.",
    material: "100% хлопок, 320 г/м2",
    color: "Черный",
  },
  {
    id: "2",
    name: "Minimal Tee White",
    price: 129,
    oldPrice: 159,
    images: ["/product-2-front.jpg", "/product-2-back.jpg", "/product-2-side.jpg"],
    category: "Футболки",
    sizes: ["S", "M", "L", "XL", "XXL"],
    isSale: true,
    description: "Базовая белая футболка из органического хлопка. Плотная ткань, идеальная посадка.",
    material: "100% органический хлопок, 200 г/м2",
    color: "Белый",
  },
  {
    id: "3",
    name: "Cargo Pants Utility",
    price: 399,
    images: ["/product-3-front.jpg", "/product-3-back.jpg", "/product-3-side.jpg"],
    category: "Брюки",
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
    description: "Карго брюки с функциональными карманами и стропами. Тактический стиль для городской среды.",
    material: "Хлопок/нейлон, рипстоп",
    color: "Черный",
  },
  {
    id: "4",
    name: "Bomber Jacket Shadow",
    price: 549,
    images: ["/product-4-front.jpg", "/product-4-back.jpg", "/product-4-side.jpg"],
    category: "Куртки",
    sizes: ["M", "L", "XL"],
    description: "Бомбер из технической ткани с утеплением. Минималистичный силуэт, максимальная функциональность.",
    material: "Полиэстер, утеплитель Thinsulate",
    color: "Темно-серый",
  },
  {
    id: "5",
    name: "Graphic Sweatshirt Art",
    price: 249,
    oldPrice: 319,
    images: ["/product-5-front.jpg", "/product-5-back.jpg", "/product-5-side.jpg"],
    category: "Свитшоты",
    sizes: ["S", "M", "L", "XL"],
    isSale: true,
    description: "Свитшот с авторским принтом. Лимитированная коллекция, уникальный дизайн.",
    material: "80% хлопок, 20% полиэстер, 280 г/м2",
    color: "Черный",
  },
  {
    id: "6",
    name: "Utility Vest Tactical",
    price: 369,
    images: ["/product-6-front.jpg", "/product-6-back.jpg", "/product-6-side.jpg"],
    category: "Жилеты",
    sizes: ["M", "L", "XL"],
    isNew: true,
    description: "Утилитарный жилет с множеством карманов и фурнитурой. Стиль милитари в городском контексте.",
    material: "Нейлон, водоотталкивающая пропитка",
    color: "Оливковый",
  },
  {
    id: "7",
    name: "Relaxed Joggers Black",
    price: 219,
    images: ["/product-7-front.jpg", "/product-7-back.jpg", "/product-7-side.jpg"],
    category: "Брюки",
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
    description: "Джоггеры свободного кроя из мягкого трикотажа. Эластичные манжеты и пояс на шнурке.",
    material: "95% хлопок, 5% эластан, 300 г/м2",
    color: "Черный",
  },
  {
    id: "8",
    name: "Windbreaker Tech",
    price: 479,
    oldPrice: 599,
    images: ["/product-8-front.jpg", "/product-8-back.jpg", "/product-8-side.jpg"],
    category: "Куртки",
    sizes: ["S", "M", "L", "XL"],
    isSale: true,
    description: "Ветровка из технической ткани с влагозащитой. Легкая, компактная, функциональная.",
    material: "100% полиэстер, мембрана 5000мм",
    color: "Темно-серый",
  },
  {
    id: "9",
    name: "Longsleeve Logo Tee",
    price: 159,
    images: ["/product-9-front.jpg", "/product-9-back.jpg", "/product-9-side.jpg"],
    category: "Футболки",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Лонгслив с минималистичным лого на груди. Плотная ткань, оверсайз посадка.",
    material: "100% хлопок, 220 г/м2",
    color: "Черный",
  },
  {
    id: "10",
    name: "Cropped Hoodie Grey",
    price: 269,
    images: ["/product-10-front.jpg", "/product-10-back.jpg", "/product-10-side.jpg"],
    category: "Худи",
    sizes: ["S", "M", "L"],
    isNew: true,
    description: "Укороченная худи из мягкого хлопка. Современный силуэт, утяжки по низу.",
    material: "100% хлопок, 320 г/м2",
    color: "Серый",
  },
  {
    id: "11",
    name: "Wide Leg Trousers",
    price: 349,
    images: ["/product-11-front.jpg", "/product-11-back.jpg", "/product-11-side.jpg"],
    category: "Брюки",
    sizes: ["S", "M", "L", "XL"],
    description: "Широкие брюки со складками. Элегантный крой в минималистичном стиле.",
    material: "Полиэстер/вискоза",
    color: "Черный",
  },
  {
    id: "12",
    name: "Puffer Vest Essential",
    price: 419,
    oldPrice: 499,
    images: ["/product-12-front.jpg", "/product-12-back.jpg", "/product-12-side.jpg"],
    category: "Жилеты",
    sizes: ["M", "L", "XL"],
    isSale: true,
    description: "Дутый жилет с синтетическим утеплителем. Водоотталкивающее покрытие, легкий вес.",
    material: "Нейлон, утеплитель синтепух",
    color: "Черный",
  },
]

export const categories = ["Все", "Худи", "Футболки", "Брюки", "Куртки", "Свитшоты", "Жилеты"]

export function formatPrice(price: number): string {
  return price.toFixed(2) + " BYN"
}
