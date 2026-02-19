import useSWR from 'swr'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export interface Product {
  id: number
  title: string
  category: string
  price: number
  image1: string
  image2: string
  image3: string
  description: string
}

export function useProducts() {
  const { data, error, isLoading } = useSWR<Product[]>(
    `${API_URL}/api/products/`,
    fetcher
  )

  return {
    products: data || [],
    isLoading,
    error,
  }
}

export function useProductsByCategory(category: string | null) {
  const url = category && category !== 'Все'
    ? `${API_URL}/api/products/by_category/?category=${category}`
    : `${API_URL}/api/products/`

  const { data, error, isLoading } = useSWR<Product[]>(
    url,
    fetcher
  )

  return {
    products: data || [],
    isLoading,
    error,
  }
}
