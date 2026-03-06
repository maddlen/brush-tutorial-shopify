export type WishlistStore = {
  productHandles: string[];
  customerId: number;
};

export function registerAlpineStores() {
  return {
    wishlistStore: Brush.Persistor.initStore("wishlistStore", {
      productHandles: [],
      customerId: 0,
    } as WishlistStore),
  };
}
