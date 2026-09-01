import { i as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as mc } from "../_libs/auth0__auth0-spa-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-Bb1S9LQE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Public Auth0 SPA client used by grokbox. Not a secret. */
var AUTH0_DOMAIN = "grokbox.us.auth0.com";
var AUTH0_CLIENT_ID = "titd12pdpLdyQo1SpSFhHEH2glDoeIZq";
var JUMP_HOSTS = /* @__PURE__ */ new Set(["grokbox.org", "www.grokbox.org"]);
var LOOPBACK_HOSTS = /* @__PURE__ */ new Set([
	"localhost",
	"127.0.0.1",
	"[::1]",
	"::1"
]);
var BOX_HOSTS = /* @__PURE__ */ new Set(["grokbox.local", ...LOOPBACK_HOSTS]);
function isJumpHost(hostname) {
	const host = hostname.toLowerCase();
	return JUMP_HOSTS.has(host) || LOOPBACK_HOSTS.has(host);
}
function isAllowedReturnTo(value) {
	if (!value) return false;
	let url;
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
function postForm(action, fields) {
	const form = document.createElement("form");
	form.method = "POST";
	form.action = action;
	form.acceptCharset = "UTF-8";
	for (const [name, value] of Object.entries(fields)) {
		const input = document.createElement("input");
		input.type = "hidden";
		input.name = name;
		input.value = value;
		form.appendChild(input);
	}
	document.body.appendChild(form);
	form.submit();
}
function BoxAuthJumpPage() {
	const [message, setMessage] = (0, import_react.useState)("Signing in…");
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		(async () => {
			const params = new URLSearchParams(window.location.search);
			const isCallback = params.has("code");
			const returnTo = params.get("return_to");
			const boxState = params.get("state");
			if (!window.isSecureContext || !isJumpHost(window.location.hostname)) {
				if (!cancelled) setMessage("This page is the grokbox.local sign-in hop.");
				return;
			}
			if (!isCallback && (!isAllowedReturnTo(returnTo) || !boxState)) {
				if (!cancelled) setMessage("Sign-in must start from grokbox.local.");
				return;
			}
			const client = await mc({
				domain: AUTH0_DOMAIN,
				clientId: AUTH0_CLIENT_ID,
				authorizationParams: {
					redirect_uri: window.location.origin + window.location.pathname,
					scope: "openid profile email",
					connection: "google-oauth2",
					prompt: "select_account"
				}
			});
			if (cancelled) return;
			if (isCallback) {
				const appState = (await client.handleRedirectCallback()).appState;
				const token = (await client.getIdTokenClaims())?.__raw;
				window.history.replaceState({}, "", window.location.pathname);
				if (!token || !isAllowedReturnTo(appState?.returnTo) || !appState?.boxState) {
					if (!cancelled) setMessage("Sign-in did not return to grokbox.local.");
					return;
				}
				postForm(appState.returnTo, {
					id_token: token,
					state: appState.boxState
				});
				return;
			}
			if (!isAllowedReturnTo(returnTo) || !boxState) {
				if (!cancelled) setMessage("Sign-in must start from grokbox.local.");
				return;
			}
			await client.loginWithRedirect({
				appState: {
					returnTo,
					boxState
				},
				authorizationParams: {
					connection: "google-oauth2",
					prompt: "select_account"
				}
			});
		})().catch((error) => {
			if (!cancelled) setMessage(error instanceof Error ? error.message : "Unable to sign in.");
		});
		return () => {
			cancelled = true;
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative flex min-h-dvh flex-col items-center justify-center bg-bg px-5 text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "hero-glow",
			"aria-hidden": "true"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative z-10 flex flex-col items-center gap-4 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/logo.svg",
					alt: "",
					width: 48,
					height: 48,
					className: "brand-mark size-12"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-brand text-lg font-semibold tracking-tight",
					children: "grokbox"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: message
				}),
				message !== "Signing in…" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mt-2 text-sm text-muted underline underline-offset-4 hover:text-fg",
					children: "Back"
				}) : null
			]
		})]
	});
}
//#endregion
export { BoxAuthJumpPage as component };
