import Cookies from "js-cookie";

const makeLoginRedirectUrl = (path = ""): string => {
  const currentUrl = new URL(window.location.href);
  const basePath = Shopify.routes.root.replace(/\/$/, "");
  const returnPath = path || `${currentUrl.pathname}${currentUrl.search}`.replace(basePath, "");
  const returnTo = `${basePath}/${returnPath}/?country=${Shopify.country}`.replace(/\/{2,}/g, "/");

  return `${currentUrl.origin}/customer_authentication/login?return_to=${encodeURIComponent(returnTo)}&locale=${Shopify.locale}`;
};

class Referrer {
  cookieName = "brush_referrer";

  get(clear: boolean = true): string {
    const v = Cookies.get(this.cookieName) || Shopify.routes.root;
    if (clear) this.clear();
    return v;
  }

  set(url?: string): void {
    url = url || window.location.href;
    Cookies.set(this.cookieName, url);
  }

  clear(): void {
    Cookies.remove(this.cookieName);
  }
}

export default {
  makeLoginRedirectUrl,
  referrer: new Referrer(),
};
