import { ggtFetch as ggtFetchFn } from "./api";
import BrushObj from "../_brush";

declare global {
  const ggtFetch: typeof ggtFetchFn;
  const Brush: typeof BrushObj;
  const $t: typeof i18next.t;

  interface Window {
    ggtFetch: typeof ggtFetchFn;
    Brush: typeof BrushObj;
    $t: typeof i18next.t;
  }
}
