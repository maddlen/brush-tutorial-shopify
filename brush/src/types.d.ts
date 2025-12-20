declare global {
  const Alpine: import("alpinejs").Alpine;
  interface Window {
    Alpine;
  }
}

export {};
