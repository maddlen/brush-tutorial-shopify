declare global {
  const Alpine: import("alpinejs").Alpine;
  interface Window {
    Alpine;
  }
}

export type TaxesStore = {
  rates: {
    country: string;
    rate: number;
  }[];
};

export {};
