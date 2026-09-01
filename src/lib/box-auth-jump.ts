/** Public Auth0 SPA client used by grokbox. Not a secret. */
const viteEnv =
  (import.meta as { env?: Record<string, string | undefined> }).env ?? {};

export const AUTH0_DOMAIN =
  viteEnv.VITE_AUTH0_DOMAIN || "grokbox.us.auth0.com";
export const AUTH0_CLIENT_ID =
  viteEnv.VITE_AUTH0_CLIENT_ID || "titd12pdpLdyQo1SpSFhHEH2glDoeIZq";

const JUMP_HOSTS = new Set(["grokbox.org", "www.grokbox.org"]);
const LOOPBACK_HOSTS = new Set(["localhost", "127.0.0.1", "[::1]", "::1"]);
const BOX_HOSTS = new Set(["grokbox.local", ...LOOPBACK_HOSTS]);

export function isJumpHost(hostname: string): boolean {
  const host = hostname.toLowerCase();
  return JUMP_HOSTS.has(host) || LOOPBACK_HOSTS.has(host);
}

export function isAllowedReturnTo(
  value: string | null | undefined,
): value is string {
  if (!value) return false;

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return false;
  }

  if (url.username || url.password || url.hash) return false;
  if (url.protocol !== "http:" && url.protocol !== "https:") return false;
  if (url.pathname !== "/api/auth/callback") return false;
  return BOX_HOSTS.has(url.hostname.toLowerCase());
}

/** HTTPS grokbox.org cannot POST to http://grokbox.local (Chrome insecure-form interstitial). Land on the box with the token in the fragment instead. */
export function boxReturnUrl(
  returnTo: string | null | undefined,
  idToken: string | null | undefined,
  boxState: string | null | undefined,
): string | null {
  if (!isAllowedReturnTo(returnTo) || !idToken || !boxState) {
    return null;
  }

  const url = new URL(returnTo);
  url.hash = new URLSearchParams({
    id_token: idToken,
    state: boxState,
  }).toString();
  return url.toString();
}
