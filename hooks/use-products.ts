import useSWR from "swr";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data)) {
        const transformed = data.map((product) => ({
          ...product,
          images: Array.isArray(product.images)
            ? product.images.map((img: string) =>
                img.startsWith("http") ? img : `${API_URL}${img}`,
              )
            : [],
        }));
        console.log("[v0] Fetcher - Raw data:", data);
        console.log("[v0] Fetcher - Transformed:", transformed);
        return transformed;
      }
      return data;
    });

export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  images?: string[];
  image1?: string;
  image2?: string;
  image3?: string;
  description: string;
  sizes?: string[];
}

export function useProducts() {
  const { data, error, isLoading } = useSWR<Product[]>(
    `${API_URL}/api/products/`,
    fetcher,
  );

  return {
    products: data || [],
    isLoading,
    error,
  };
}

export function useProductsByCategory(category: string | null) {
  const url =
    category && category !== "Все"
      ? `${API_URL}/api/products/by_category/?category=${category}`
      : `${API_URL}/api/products/`;

  const { data, error, isLoading } = useSWR<Product[]>(url, fetcher);

  return {
    products: data || [],
    isLoading,
    error,
  };
}
