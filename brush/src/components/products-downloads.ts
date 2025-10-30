export default function () {
  Alpine.data("ProductsDownloads", () => ({
    login() {
      return Brush.Referrals.makeLoginRedirectUrl();
    },
  }));
}
