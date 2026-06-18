import "@testing-library/jest-dom";

class LocalStorageMock {
  #store = {};

  getItem(key) {
    return this.#store[key] ?? null;
  }

  setItem(key, value) {
    this.#store[key] = String(value);
  }

  removeItem(key) {
    delete this.#store[key];
  }

  clear() {
    this.#store = {};
  }

  get length() {
    return Object.keys(this.#store).length;
  }

  key(index) {
    return Object.keys(this.#store)[index] ?? null;
  }
}

// Node 22 experimental localStorage conflicts with jsdom
globalThis.localStorage = new LocalStorageMock();
