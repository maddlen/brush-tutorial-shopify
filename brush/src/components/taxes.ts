import type { TaxesStore } from "../types";

function debounce<T extends (...args: any[]) => void>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  }) as T;
}

export default function () {
  Alpine.data("TaxesIncludedExcluded", () => ({
    priceSelector: "span.price-item",
    store: {} as TaxesStore,

    async init() {
      this.store = this.$store.taxesStore as TaxesStore;
      await this.loadRates();
      this.observe();
    },

    observe() {
      const observer = new MutationObserver(
        debounce(() => {
          observer.disconnect();
          requestAnimationFrame(() => {
            this.enrichPrices();
            observer.observe(document.body, { childList: true, subtree: true, attributes: true });
          });
        }, 120)
      );

      observer.observe(document.body, { childList: true, subtree: true, attributes: true });
    },

    async loadRates() {
      if (!this.store.rates.find((rate) => rate.country === Shopify.country)) {
        const { rate } = await ggtFetch("/apps/brush/tax-rate");
        this.store.rates.push({ country: Shopify.country, rate });
      }
    },

    enrichPrices() {
      const rate = this.store.rates.find((rateData) => rateData.country === Shopify.country);
      if (!rate || rate.rate === 0) return;

      document.querySelectorAll(this.priceSelector).forEach((priceBoxIncl) => {
        const container = priceBoxIncl.parentElement;
        if (!container) return;

        // Check if we already have an "excl tax" element
        const existingExcl = container.querySelector(".price-excl-tax");
        if (existingExcl) return; // skip if already enriched

        // Extract prices
        const priceIncl = Number(priceBoxIncl.textContent?.replace(/\D/g, "")) / 100;
        const priceExcl = priceIncl / (1 + rate.rate);

        // Create excl. tax price box
        const priceBoxExcl = priceBoxIncl.cloneNode() as HTMLElement;
        priceBoxIncl.textContent = this.formatPrice(priceIncl);
        priceBoxExcl.textContent = ` (${this.formatPrice(priceExcl)} ${$t("products.product.price.excl_tax")})`;
        priceBoxExcl.classList.add("price-excl-tax");

        container.append(priceBoxIncl, priceBoxExcl);
      });
    },

    formatPrice(price: number) {
      return Brush.i18n.formatPrice(price);
    },
  }));
}
