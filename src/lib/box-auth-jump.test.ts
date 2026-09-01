import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { isAllowedReturnTo, isJumpHost } from "./box-auth-jump.ts";

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
});
