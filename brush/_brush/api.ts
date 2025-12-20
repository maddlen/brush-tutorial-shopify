const defaultHeaders: Record<string, string> = {
  "Content-Type": "application/json",
  "X-App-Country": Shopify.country,
  "X-App-Locale": Shopify.locale,
  "X-App-Currency": Shopify.currency.active,
  "X-App-Theme": String(Shopify.theme.id),
};

const APP_PREFIX = "apps/brush/";

export async function ggtFetch<T = any>(input: string, init?: RequestInit): Promise<T> {
  const headers = {
    ...defaultHeaders,
    ...(init?.headers || {}),
  };

  input = `${Shopify.routes.root}${APP_PREFIX}${input.replace(APP_PREFIX, "").replace(/^\//, "")}`;

  const response = await fetch(input, {
    ...init,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const contentType = response.headers.get("Content-Type") || "";

  if (contentType.includes("application/json")) {
    return response.json();
  } else if (contentType.includes("application/pdf")) {
    return response.blob() as T; // returns a Blob for PDF
  } else {
    // fallback to text for other types
    return response.text() as T;
  }
}

window.ggtFetch = ggtFetch;
