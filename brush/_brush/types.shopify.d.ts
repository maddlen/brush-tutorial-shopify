// Inspired from https://gist.githubusercontent.com/panoply/6ef8e72ea5107f0b450983ab419c1018/raw/b34134c8adb26469e071fc7c0dd8cec4c5a4527e/shopify-types.d.ts

type Primitive = null | undefined | string | number | boolean | symbol | bigint;
type LiteralUnion<LiteralType, BaseType extends Primitive> = LiteralType | (BaseType & Record<never, never>);

export interface Shopify {
  PaymentButton: {
    init(): any;
  };
  autoloadFeatures(param: any): any;
  /**
   * Only show in Theme previews, it's a class instance, yuck.
   */
  PreviewBarInjector(): {
    /**
     * This is already invoked at runtime
     */
    init(): void;
    hideIframe(): void;
    postMessageBuffer(argument: any): any;
    postTrekkieData(param: any): any;
    sendPostMessage(param1: any, param2: any): any;
    postMessageHandler(param1: any, param2: any, param3: any, param4: any): any;
    teardown(): void;
  };
  /**
   * Set to `true` when active in theme editor
   */
  designMode?: boolean;
  /**
   * Related to web-pixels management
   */
  analytics: {
    /**
     * Store reference of some sort, see `publish` method.
     */
    replayQueue: Array<[any, any, any]>;
    /**
     * Inserts entries into the `replayQueue`
     */
    publish(...param: any[]): void;
  };
  /**
   * Routes reference
   */
  routes: {
    /**
     * The root path, typically `/` unless you are using sub-folder
     * markets then it would be something like `/en-us/` etc
     */
    root: string;
  };
  /**
   * Reference to CDN hostname, typically: `cdn.shopify.com`
   */
  cdnHost: string;
  /**
   * Currency Reference
   */
  currency: {
    /**
     * The current active current code, eg: `USD`, `SEK` etc
     */
    active: string;
    /**
     * The exchange rate
     */
    rate: string;
  };
  /**
   * The current 2 Letter ISO Country code, eg: `US` or `CA` or `NL` etc
   */
  country: string;
  /**
   * Customer Privacy Methods
   */
  customerPrivacy: {
    getRegulation(): any;
    getShopPrefs(): any;
    getTrackingConsent(): any;
    isRegulationEnforced(): any;
    /**
     * Check if a cookie consent banner should be displayed (via visitor IP address)
     *
     * > This is `true` if consent isn't already set and the visitor is in a region showing consent.
     *
     * @see https://shopify.dev/docs/api/consent-tracking#regions-showing-consent-banners).
     */
    shouldShowBanner(): boolean;
    /**
     * Check if the visitor is in a region showing data sale opt outs.
     *
     * > This is `true` if the visitor is from a region that requires data sale opt-outs.
     *
     * @see https://shopify.dev/docs/api/consent-tracking#regions-showing-data-sale-opt-out
     */
    saleOfDataRegion(): boolean;
    /**
     * Record customer consent, use the setTrackingConsent method:
     */
    setTrackingConsent(
      consent: {
        /**
         * Cookies to understand how customers interact with the site.
         */
        analytics?: boolean;
        /**
         * Cookies to provide ads and marketing communications based on customer interests.
         */
        marketing?: boolean;
        /**
         * Cookies that remember customer preferences, such as country or language,
         * to personalize visits to the website.
         */
        preferences?: boolean;
        /**
         * Opts the customer out of data sharing / sales.
         */
        sale_of_data?: boolean;
      },
      callback?: (error?: any) => void
    ): void;
    /**
     * Check the current users consent.
     *
     * **Return Values**
     *
     * - `yes` - _The current visitor has actively granted consent._
     * - `no` - _The current visitor has actively denied consent._
     * - `''`- _The current visitor has not yet granted or denied consent_
     *
     */
    currentVisitorConsent(): {
      marketing?: LiteralUnion<"yes" | "no" | "", string>;
      analytics?: LiteralUnion<"yes" | "no" | "", string>;
      preferences?: LiteralUnion<"yes" | "no" | "", string>;
      sale_of_data?: LiteralUnion<"yes" | "no" | "", string>;
      gpc?: LiteralUnion<"yes" | "no" | "", string>;
    };
    /**
     * Permission to remember preferences such as language, currency, size, etc.
     */
    preferencesProcessingAllowed(): boolean;
    /**
     *  Permission to store information about how the storefront was used and
     * interactions made on the storefront.
     */
    analyticsProcessingAllowed(): boolean;
    /**
     * Permission to collect and process data for marketing, attribution and
     * targeted advertising from the merchant.
     */
    firstPartyMarketingAllowed(): boolean;
    /**
     *  Permission to collect and share data with third parties to perform
     * marketing, attribution and targeted advertising.
     */
    thirdPartyMarketingAllowed(): boolean;
    userCanBeTracked(): any;
    userDataCanBeSold(): any;
    /**
     * @deprecated
     */
    setTrackingConsent(consent: boolean, callback?: (error?: any) => void): any;
    /**
     * Use `customerPrivacy.shouldShowBanner()`
     *
     * @deprecated
     */
    shouldShowGDPRBanner(): any;
  };
  /**
   * The second argument to loadFeatures is a callback that indicates that
   * the API has loaded. When invoked without an error, the API is globally
   * available at window.Shopify.customerPrivacy.
   */
  loadFeatures(
    params: Array<{
      name: LiteralUnion<"consent-tracking-api", string>;
      version: LiteralUnion<"0.1", string>;
    }>,
    callback: (error: Error) => void
  ): any;
  /**
   * Two letter language code
   */
  locale: string;
  /**
   * The `myshopify.com` store domain
   */
  shop: string;
  modules: boolean;
  /**
   * Theme Information
   */
  theme: {
    handle: string;
    id: number;
    name: string;
    role: "published" | "unpublished";
    style: {
      id: number;
      handle: string;
    };
    theme_store_id: null | number;
  };
}

interface BOOMR {
  /**
   * Timestamp, eg: `new Date().getTime()`
   */
  snippetStart: number;
  snippetExecuted: boolean;
  snippetVersion: number;
  /**
   * The application rederer, typically: `storefront-renderer`
   */
  application: string;
  /**
   * The name of the Theme
   */
  themeName: string;
  /**
   * The theme version
   */
  themeVersion: string;
  /**
   * Shop ID
   */
  shopId: number;
  /**
   * Theme ID
   */
  themeId: number;
  /**
   * Theme render region
   */
  renderRegion: string;
  /**
   * External scripting reference, typically:
   * `https://cdn.shopify.com/shopifycloud/boomerang/shopify-boomerang-1.0.0.min.js`
   */
  url: string;
}

interface ShopifyAnalytics {
  /**
   * Holds some references, not just `currency` - Seems to change between navigations.
   */
  meta: {
    currency: string;
  };
  /**
   * Related to Google Analytics, fuck knows what.
   */
  merchantGoogleAnalytics(): void;
  /**
   * Seems to be what is used to publish to dashboard
   */
  lib: {
    /**
     * Likely an action reference, something like `Viewed Product Category`
     * as the first parameter and the 2nd being an object describing the action.
     */
    track(action: string, data: object): any;
    /**
     * Similar to `track`
     */
    page(action: string, data: object): any;
  };
}

declare global {
  interface WindowEventMap {
    /**
     * The Customer Privacy API publishes document events when
     * consent change. Use this listener to react to changes in consent over time.
     */
    visitorConsentCollected: CustomEvent<{
      detail: {
        /**
         *  Permission to collect and process data for marketing,
         * attribution and targeted advertising from the merchant.
         */
        firstPartyMarketingAllowed: boolean;
        /**
         * Permission to collect and share data with third parties to
         * perform marketing, attribution and targeted advertising.
         */
        thirdPartyMarketingAllowed: boolean;
        /**
         * Permission to store information about how the storefront was used and
         * interactions made on the storefront.
         */
        analyticsAllowed: boolean;
        /**
         * Permission to remember preferences such as language, currency, size, e
         */
        preferencesAllowed: boolean;
      };
    }>;

    /**
     * Shopify Theme Editor section select event
     */
    "shopify:section:select": CustomEvent<{
      detail: {
        sectionId: string;
      };
    }>;
    /**
     * Shopify Theme Editor section select event
     */
    "shopify:section:deselect": CustomEvent<{
      detail: {
        sectionId: string;
      };
    }>;
  }

  export interface Window {
    /**
     * Shopify BOOMR
     */
    BOOMR: BOOMR;
    /**
     * Shopify Analytics
     */
    ShopifyAnalytics: ShopifyAnalytics;
    /**
     * Shopify context
     */
    Shopify: Shopify;
  }

  /**
   * Shopify context
   */
  const Shopify: Window["Shopify"];
  /**
   * Shopify BOOMR
   */
  const BOOMR: Window["BOOMR"];
}
