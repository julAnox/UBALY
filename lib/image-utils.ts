export function getFirstImage(
  imageData: any,
  fallback: string = "https://via.placeholder.com/400x500?text=Product",
): string {
  if (!imageData) return fallback;

  if (typeof imageData === "string") {
    if (imageData.trim() === "") return fallback;

    try {
      const parsed = JSON.parse(imageData);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed[0];
      }
      return imageData;
    } catch {
      return imageData;
    }
  }

  if (Array.isArray(imageData) && imageData.length > 0) {
    return imageData[0];
  }

  if (
    typeof imageData === "object" &&
    imageData.images &&
    Array.isArray(imageData.images)
  ) {
    return imageData.images[0] || fallback;
  }

  return fallback;
}

export function getAllImages(imageData: any): string[] {
  if (!imageData) return [];

  if (typeof imageData === "string") {
    if (imageData.trim() === "") return [];

    try {
      const parsed = JSON.parse(imageData);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      return [imageData];
    } catch {
      return [imageData];
    }
  }

  if (Array.isArray(imageData)) {
    return imageData;
  }

  if (
    typeof imageData === "object" &&
    imageData.images &&
    Array.isArray(imageData.images)
  ) {
    return imageData.images;
  }

  return [];
}
