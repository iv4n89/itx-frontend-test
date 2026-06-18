import { describe, it, expect, vi, beforeEach } from "vitest";
import { apiFetch } from "./fetch";

describe("apiFetch", () => {
  beforeEach(() => {
    vi.stubEnv("VITE_API_BASE_URL", "https://test.example.com");
  });

  it("sends the request to the URL built from the env variable", async () => {
    // given
    const mockFetch = vi.fn().mockResolvedValue({ json: async () => ({}) });
    vi.stubGlobal("fetch", mockFetch);

    // when
    await apiFetch("/api/product");

    // then
    expect(mockFetch).toHaveBeenCalledWith(
      "https://test.example.com/api/product",
      {}
    );
  });

  it("returns the parsed JSON body on a successful response", async () => {
    // given
    const data = [{ id: "1", brand: "Apple" }];
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ json: async () => data }));

    // when
    const result = await apiFetch("/api/product");

    // then
    expect(result).toEqual(data);
  });

  it("propagates the error when the network request fails", async () => {
    // given
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Network error")));

    // when / then
    await expect(apiFetch("/api/product")).rejects.toThrow("Network error");
  });
});
