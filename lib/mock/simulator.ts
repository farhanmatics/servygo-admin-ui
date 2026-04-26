export type MockFailureMode = "none" | "network-error" | "permission-denied";

export async function withMockDelay(ms = 450) {
  await new Promise<void>((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}

export function maybeThrowMockFailure(mode: MockFailureMode) {
  if (mode === "network-error") {
    throw new Error("Mock network error: retry the operation.");
  }

  if (mode === "permission-denied") {
    throw new Error("Mock permission error: operation blocked by policy.");
  }
}
