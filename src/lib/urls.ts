/**
 * Prepends Astro's configured BASE_URL safely so internal routes and public
 * assets work identically on GitHub Pages project URLs (/repo-name/...) and
 * root custom domains (https://www.flyerscycling.org/...).
 */
/** True for links that leave the site (http/https). */
export function isExternalUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

export function withBase(path: string, baseUrl: string = import.meta.env.BASE_URL || '/'): string {
  if (!path) return baseUrl;
  if (/^(https?:|mailto:|tel:|#)/i.test(path)) {
    return path;
  }

  const normalizedBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  if (normalizedPath === '/') {
    return `${normalizedBase}/`;
  }

  return `${normalizedBase}${normalizedPath}`;
}

/**
 * True when a link is still a placeholder: empty, or a bare site root like https://www.zeffy.com/
 * that was never swapped for the club's real form. Pages show a fallback instead of linking there.
 */
export function isPlaceholderUrl(url: string | undefined): boolean {
  if (!url || !url.trim()) return true;
  try {
    const { pathname, search, hash } = new URL(url);
    return (pathname === '/' || pathname === '') && !search && !hash;
  } catch {
    return true;
  }
}
