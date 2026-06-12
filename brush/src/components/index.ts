import ProductsDownloads from "./products-downloads";
import TaxesIncludedExcluded from "./taxes";
import WishlistList from "./wishlist-list";
import WishlistService from "./wishlist-service";
import WishlistToggler from "./wishlist-toggler";

export function registerAlpineComponents() {
  ProductsDownloads();
  TaxesIncludedExcluded();
  WishlistList();
  WishlistService();
  WishlistToggler();
}
