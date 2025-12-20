import Cookies from "js-cookie";

const COOKIE_NAME = "brush_version";
const SCRIPT_IDENTIFIER = 'script[src*="brush.js"]';

const getBrushVersion = (): string | null => {
  const script = document.querySelector<HTMLScriptElement>(SCRIPT_IDENTIFIER);
  if (!script) return null;

  try {
    const version = new URL(script.src, window.location.origin).searchParams.get("v");
    return version || null;
  } catch {
    return null;
  }
};

const checkAppVersion = (): void => {
  const version = getBrushVersion();
  if (!version) return;

  const previousVersion = Cookies.get(COOKIE_NAME);
  const isNew = version !== previousVersion;

  // Ensure Brush.App exists before assignment
  (window as any).Brush = (window as any).Brush || {};
  (window as any).Brush.App = (window as any).Brush.App || {};
  (window as any).Brush.App.version = { id: version, isNew };

  if (isNew) Cookies.set(COOKIE_NAME, version);
};

export default {
  checkAppVersion,
  version: {
    id: "",
    isNew: true,
  },
};
