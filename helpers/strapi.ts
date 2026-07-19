const BASE = process.env.NEXT_PUBLIC_STRAPI_BASE_URL;

export function strapiFetch(path: string, init: RequestInit = {}) {
  return fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      ...(init.headers ?? {}),
    },
  });
}
