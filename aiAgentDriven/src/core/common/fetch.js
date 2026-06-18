export async function apiFetch(path, options = {}) {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}${path}`,
    options
  );
  return response.json();
}
