import { apiFetch } from "@/core/common/fetch";

export function fetchProducts() {
  return apiFetch("/api/product");
}

export function fetchProduct(id) {
  return apiFetch(`/api/product/${id}`);
}

export function addToCart({ id, colorCode, storageCode }) {
  return apiFetch("/api/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, colorCode, storageCode }),
  });
}
