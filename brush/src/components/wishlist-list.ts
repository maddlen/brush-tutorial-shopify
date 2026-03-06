import type { WishlistStore } from "../stores";
import type { Product } from "../wishlist";

export default function () {
  Alpine.data("WishlistList", () => ({
    wishlistStore: {} as WishlistStore,
    products: [] as Product[],
    loading: true,

    async init() {
      this.wishlistStore = this.$store.wishlistStore as WishlistStore;
      await this.fetchProducts();
      this.$watch("wishlistStore.productHandles", () => this.fetchProducts());
    },

    async fetchProducts() {
      this.loading = true;
      this.products = [];
      await Promise.all(
        this.wishlistStore.productHandles.map(async (handle: string) => {
          const product = await (await fetch(`${window.Shopify.routes.root}products/${handle}.js`)).json();
          this.products.push(product);
        }),
      );
      this.loading = false;
    },
  }));
}
