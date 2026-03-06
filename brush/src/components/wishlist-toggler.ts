import type { WishlistStore } from "../stores";

export default function () {
  Alpine.data("WishlistToggler", (handle: string) => ({
    wishlistStore: {} as WishlistStore,
    handle: handle as string,
    init() {
      this.wishlistStore = this.$store.wishlistStore as WishlistStore;
    },

    addToWishlist() {
      this.wishlistStore.productHandles.push(this.handle);
      this.push();
    },

    removeFromWishlist() {
      this.wishlistStore.productHandles = this.wishlistStore.productHandles.filter((h) => h !== this.handle);
      this.push();
    },

    isInWishlist() {
      return this.wishlistStore.productHandles.includes(this.handle);
    },

    push() {
      this.$dispatch("wishlist:push");
    },
  }));
}
