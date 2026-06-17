import { describe, it, expect, vi, beforeEach } from "vitest";
import { axiosInstance } from "../utils/axios";
import { fetchData } from "./fetch";

vi.mock("../utils/axios", () => ({
  axiosInstance: { request: vi.fn() },
}));

describe("fetchData", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns response.data on success", async () => {
    // given
    const data = { id: "1", brand: "Apple" };
    axiosInstance.request.mockResolvedValue({ data });

    // when
    const result = await fetchData({ url: "/api/product", method: "GET" });

    // then
    expect(result).toEqual(data);
  });

  it("calls axiosInstance.request with the correct parameters", async () => {
    // given
    axiosInstance.request.mockResolvedValue({ data: {} });

    // when
    await fetchData({
      url: "/api/cart",
      method: "POST",
      body: { id: "1" },
      headers: { Authorization: "Bearer token" },
    });

    // then
    expect(axiosInstance.request).toHaveBeenCalledWith({
      method: "POST",
      url: "/api/cart",
      data: { id: "1" },
      headers: { Authorization: "Bearer token" },
    });
  });

  it("returns undefined when the request fails", async () => {
    // given
    axiosInstance.request.mockRejectedValue(new Error("Network error"));
    vi.spyOn(console, "error").mockImplementation(() => {});

    // when
    const result = await fetchData({ url: "/api/product", method: "GET" });

    // then
    expect(result).toBeUndefined();
  });

  it("logs the error message when the request fails", async () => {
    // given
    const error = new Error("Network error");
    axiosInstance.request.mockRejectedValue(error);
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    // when
    await fetchData({ url: "/api/product", method: "GET" });

    // then
    expect(consoleSpy).toHaveBeenCalledWith("Fetch error: Network error");
  });
});
