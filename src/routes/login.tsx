import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { createAuth0Client } from "@auth0/auth0-spa-js";
import {
  AUTH0_CLIENT_ID,
  AUTH0_DOMAIN,
  isAllowedReturnTo,
  isJumpHost,
} from "@/lib/box-auth-jump";

export const Route = createFileRoute("/login")({
  ssr: false,
  component: BoxAuthJumpPage,
});

type JumpState = {
  returnTo: string;
  boxState: string;
};

function postForm(action: string, fields: Record<string, string>) {
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
  const [message, setMessage] = useState("Signing in…");

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      const params = new URLSearchParams(window.location.search);
      const isCallback = params.has("code");
      const returnTo = params.get("return_to");
      const boxState = params.get("state");

      if (!window.isSecureContext || !isJumpHost(window.location.hostname)) {
        if (!cancelled) {
          setMessage("This page is the grokbox.local sign-in hop.");
        }
        return;
      }

      if (!isCallback && (!isAllowedReturnTo(returnTo) || !boxState)) {
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

      if (isCallback) {
        const result = await client.handleRedirectCallback();
        const appState = result.appState as JumpState | undefined;
        const token = (await client.getIdTokenClaims())?.__raw;
        window.history.replaceState({}, "", window.location.pathname);
        if (
          !token ||
          !isAllowedReturnTo(appState?.returnTo) ||
          !appState?.boxState
        ) {
          if (!cancelled) {
            setMessage("Sign-in did not return to grokbox.local.");
          }
          return;
        }

        postForm(appState.returnTo, {
          id_token: token,
          state: appState.boxState,
        });
        return;
      }

      if (!isAllowedReturnTo(returnTo) || !boxState) {
        if (!cancelled) {
          setMessage("Sign-in must start from grokbox.local.");
        }
        return;
      }

      await client.loginWithRedirect({
        appState: { returnTo, boxState } satisfies JumpState,
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
