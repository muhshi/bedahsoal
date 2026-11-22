import { describe, it, expect } from "vitest";
import { handlers, auth, signIn, signOut } from "@/auth";

describe("Auth.js v5 Configuration", () => {
  it("should properly export route handlers and helper functions", () => {
    expect(handlers).toBeDefined();
    expect(typeof handlers.GET).toBe("function");
    expect(typeof handlers.POST).toBe("function");
    expect(typeof auth).toBe("function");
    expect(typeof signIn).toBe("function");
    expect(typeof signOut).toBe("function");
  });
});
