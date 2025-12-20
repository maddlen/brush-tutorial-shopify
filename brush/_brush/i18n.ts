import i18next from "i18next";

const STORAGE_PREFIX = "brush-i18n";

const init = async (): Promise<void> => {
  const { locale } = Shopify;
  const key = `${STORAGE_PREFIX}-${locale}`;
  let translations: Record<string, any> = {};

  try {
    const cached = localStorage.getItem(key);
    if (!Brush.App.version.isNew && cached) {
      translations = JSON.parse(cached);
    } else {
      const response = await ggtFetch("i18n");
      translations = typeof response === "string" ? JSON.parse(response) : response || {};
      localStorage.setItem(key, JSON.stringify(translations));
    }
  } catch (error) {
    console.error("Failed to load translations:", error);
    translations = {};
  }

  await i18next.init({
    lng: locale,
    resources: { [locale]: { translation: translations } },
  });

  window.$t = i18next.t.bind(i18next);
};

const formatPrice = (value: number): string => {
  const { locale, country, currency } = Shopify;
  return new Intl.NumberFormat(`${locale}-${country}`, {
    style: "currency",
    currency: currency.active,
  }).format(value);
};

export default { init, formatPrice };
