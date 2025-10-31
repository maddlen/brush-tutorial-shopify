export default function () {
  Alpine.data("ProductsDownloads", () => ({
    login() {
      return Brush.Referrals.makeLoginRedirectUrl();
    },

    downloadProductPdf(productId: number) {
      const button = this.$el as HTMLButtonElement;
      button.disabled = true;
      window.location.href = `/apps/brush/product-download/${productId}`;
    },
  }));
}
