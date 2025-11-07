export function registerAlpineStores() {
  return {
    taxesStore: Brush.Persistor.initStore("taxesStore", { rates: [] }),
    // Add stores here
  };
}
