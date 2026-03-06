import WishlistList from "./wishlist-list";
import WishlistService from "./wishlist-service";
import WishlistToggler from "./wishlist-toggler";

export function registerAlpineComponents() {
  WishlistList();
  WishlistService();
  WishlistToggler();
}
