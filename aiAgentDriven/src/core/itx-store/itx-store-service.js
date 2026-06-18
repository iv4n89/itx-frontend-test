export function filterProducts(products, query) {
  if (!query) return products;

  const normalized = query.toLowerCase();

  return products.filter(
    ({ brand, model }) =>
      brand.toLowerCase().includes(normalized) ||
      model.toLowerCase().includes(normalized)
  );
}
