import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  boxReturnUrl,
  isAllowedReturnTo,
  isJumpHost,
  loginIntentFromSearch,
} from "./box-auth-jump.ts";

describe("box auth jump return_to", () => {
  it("allows grokbox.local and loopback callbacks", () => {
    assert.equal(isAllowedReturnTo("http://grokbox.local/api/auth/callback"), true);
    assert.equal(
      isAllowedReturnTo("http://grokbox.local:8080/api/auth/callback"),
      true,
    );
    assert.equal(isAllowedReturnTo("http://127.0.0.1/api/auth/callback"), true);
    assert.equal(
      isAllowedReturnTo("http://localhost:8080/api/auth/callback"),
      true,
    );
  });

  it("rejects open redirects", () => {
    assert.equal(
      isAllowedReturnTo("https://evil.example/api/auth/callback"),
      false,
    );
    assert.equal(
      isAllowedReturnTo("http://192.168.1.10/api/auth/callback"),
      false,
    );
    assert.equal(isAllowedReturnTo("http://grokbox.local/"), false);
    assert.equal(
      isAllowedReturnTo("http://grokbox.local/api/auth/callback/../x"),
      false,
    );
    assert.equal(isAllowedReturnTo("javascript:alert(1)"), false);
  });

  it("treats grokbox.org as the jump host", () => {
    assert.equal(isJumpHost("grokbox.org"), true);
    assert.equal(isJumpHost("www.grokbox.org"), true);
    assert.equal(isJumpHost("grokbox.local"), false);
  });

  it("returns to the box with the token in the fragment", () => {
    const url = boxReturnUrl(
      "http://grokbox.local/api/auth/callback",
      "header.payload.sig",
      "abc",
    );
    assert.ok(url);
    const parsed = new URL(url);
    assert.equal(parsed.search, "");
    assert.equal(parsed.pathname, "/api/auth/callback");
    const hash = new URLSearchParams(parsed.hash.slice(1));
    assert.equal(hash.get("id_token"), "header.payload.sig");
    assert.equal(hash.get("state"), "abc");
  });

  it("does not build a return URL for an open redirect", () => {
    assert.equal(
      boxReturnUrl("https://evil.example/api/auth/callback", "t", "s"),
      null,
    );
  });
});

describe("login intent", () => {
  it("starts admin sign-in with a bare /login", () => {
    assert.deepEqual(loginIntentFromSearch(""), { kind: "admin" });
    assert.deepEqual(loginIntentFromSearch("?"), { kind: "admin" });
  });

  it("keeps the grokbox.local hop when return_to is valid", () => {
    assert.deepEqual(
      loginIntentFromSearch(
        "?return_to=http://grokbox.local/api/auth/callback&state=abc",
      ),
      {
        kind: "box",
        returnTo: "http://grokbox.local/api/auth/callback",
        boxState: "abc",
      },
    );
  });

  it("treats Auth0 callbacks as callbacks", () => {
    assert.equal(loginIntentFromSearch("?code=x&state=y").kind, "callback");
  });

  it("rejects a spoofed hop instead of falling through to admin", () => {
    assert.equal(
      loginIntentFromSearch(
        "?return_to=https://evil.example/api/auth/callback&state=abc",
      ).kind,
      "invalid",
    );
  });
});
