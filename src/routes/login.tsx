import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { createAuth0Client } from "@auth0/auth0-spa-js";
import {
  AUTH0_CLIENT_ID,
  AUTH0_DOMAIN,
  boxReturnUrl,
  isJumpHost,
  loginIntentFromSearch,
} from "@/lib/box-auth-jump";

export const Route = createFileRoute("/login")({
  ssr: false,
  component: BoxAuthJumpPage,
});

type JumpState = {
  returnTo: string;
  boxState: string;
};

type AdminState = {
  admin: true;
};

function BoxAuthJumpPage() {
  const [message, setMessage] = useState("Signing in…");

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      const intent = loginIntentFromSearch(window.location.search);

      if (!window.isSecureContext) {
        if (!cancelled) {
          setMessage("Sign-in needs a secure origin.");
        }
        return;
      }

      if (intent.kind === "box" && !isJumpHost(window.location.hostname)) {
        if (!cancelled) {
          setMessage("This page is the grokbox.local sign-in hop.");
        }
        return;
      }

      if (intent.kind === "invalid") {
        if (!cancelled) {
          setMessage("Sign-in must start from grokbox.local.");
        }
        return;
      }

      const client = await createAuth0Client({
        domain: AUTH0_DOMAIN,
        clientId: AUTH0_CLIENT_ID,
        authorizationParams: {
          redirect_uri: window.location.origin + window.location.pathname,
          scope: "openid profile email",
          connection: "google-oauth2",
          prompt: "select_account",
        },
      });

      if (cancelled) return;

      if (intent.kind === "callback") {
        const result = await client.handleRedirectCallback();
        const appState = result.appState as JumpState | AdminState | undefined;
        const token = (await client.getIdTokenClaims())?.__raw;
        window.history.replaceState({}, "", window.location.pathname);

        const dest = boxReturnUrl(
          appState && "returnTo" in appState ? appState.returnTo : undefined,
          token,
          appState && "boxState" in appState ? appState.boxState : undefined,
        );
        if (dest) {
          window.location.replace(dest);
          return;
        }

        if (token) {
          window.location.replace("/");
          return;
        }

        if (!cancelled) {
          setMessage("Unable to sign in.");
        }
        return;
      }

      if (intent.kind === "box") {
        await client.loginWithRedirect({
          appState: {
            returnTo: intent.returnTo,
            boxState: intent.boxState,
          } satisfies JumpState,
          authorizationParams: {
            connection: "google-oauth2",
            prompt: "select_account",
          },
        });
        return;
      }

      await client.loginWithRedirect({
        appState: { admin: true } satisfies AdminState,
        authorizationParams: {
          connection: "google-oauth2",
          prompt: "select_account",
        },
      });
    })().catch((error: unknown) => {
      if (!cancelled) {
        setMessage(
          error instanceof Error ? error.message : "Unable to sign in.",
        );
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center bg-bg px-5 text-fg">
      <div className="hero-glow" aria-hidden="true" />
      <div className="relative z-10 flex flex-col items-center gap-4 text-center">
        <img
          src="/logo.svg"
          alt=""
          width={48}
          height={48}
          className="brand-mark size-12"
        />
        <p className="font-brand text-lg font-semibold tracking-tight">
          grokbox
        </p>
        <p className="text-sm text-muted">{message}</p>
        {message !== "Signing in…" ? (
          <Link
            to="/"
            className="mt-2 text-sm text-muted underline underline-offset-4 hover:text-fg"
          >
            Back
          </Link>
        ) : null}
      </div>
    </main>
  );
}
