import type { WishlistStore } from "../stores";

export default function () {
  Alpine.data("WishlistService", (customerId: number = 0) => ({
    wishlistStore: {} as WishlistStore,

    init() {
      this.wishlistStore = this.$store.wishlistStore as WishlistStore;
      this.listen();
      this.handleCustomer();
    },

    listen() {
      document.addEventListener("wishlist:customer:updated", () => this.onCustomerChanged());
      document.addEventListener("wishlist:push", () => this.push());
    },

    handleCustomer() {
      const customerHasChanged = customerId !== this.wishlistStore.customerId;
      this.wishlistStore.customerId = customerId || 0;
      if (customerHasChanged) this.$dispatch("wishlist:customer:updated");
    },

    onCustomerChanged() {
      this.wishlistStore.customerId === 0 ? (this.wishlistStore.productHandles = []) : this.sync();
    },

    async sync() {
      await this.pull();
      this.push();
    },

    async pull() {
      const response: string[] = await ggtFetch("wishlist");
      const merged = [...this.wishlistStore.productHandles, ...response];
      this.wishlistStore.productHandles = [...new Set(merged)];
    },

    push() {
      if (this.wishlistStore.customerId === 0) return;
      ggtFetch("wishlist", {
        method: "POST",
        body: JSON.stringify({ handles: this.wishlistStore.productHandles }),
      });
    },
  }));
}
