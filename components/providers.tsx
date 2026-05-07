"use client";

import {
  useCallback,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  adminRoleLabels,
  isRouteAllowed,
  roleTerritories,
  type AdminRole,
} from "@/lib/mock/admin-shell";

type AuthContextValue = {
  isAuthenticated: boolean;
  isRouteAllowed: (pathname: string) => boolean;
  isReadOnly: boolean;
  isSessionExpiring: boolean;
  isSessionLocked: boolean;
  refreshSession: () => void;
  role: AdminRole;
  setRole: (role: AdminRole) => void;
  signIn: (role?: AdminRole) => void;
  signOut: () => void;
};

type Toast = {
  id: number;
  message: string;
  tone: "default" | "info" | "success" | "warning" | "danger";
};

type ToastContextValue = {
  pushToast: (toast: Omit<Toast, "id">) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const ToastContext = createContext<ToastContextValue | null>(null);

function ToastViewport({ toasts }: { toasts: Toast[] }) {
  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-50 grid w-full max-w-sm gap-2">
      {toasts.map((toast) => (
        <div
          className={[
            "pointer-events-auto rounded-2xl border bg-panel px-4 py-3 shadow-floating",
            toast.tone === "success" ? "border-success/25" : "",
            toast.tone === "warning" ? "border-warning/25" : "",
            toast.tone === "danger" ? "border-danger/25" : "",
            toast.tone === "default" || toast.tone === "info" ? "border-line" : "",
          ].join(" ")}
          key={toast.id}
        >
          <div className="text-[12px] font-semibold text-ink">
            {toast.tone === "default" ? "Notice" : adminToneLabel(toast.tone)}
          </div>
          <p className="mt-1 text-[12px] leading-5 text-body">{toast.message}</p>
        </div>
      ))}
    </div>
  );
}

function adminToneLabel(tone: Toast["tone"]) {
  if (tone === "success") return "Saved";
  if (tone === "info") return "Info";
  if (tone === "warning") return "Attention";
  if (tone === "danger") return "Action blocked";
  return "Notice";
}

export function Providers({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<AdminRole>(() => {
    if (typeof window === "undefined") {
      return "operations-admin";
    }

    const storedRole = window.localStorage.getItem("servygo-admin-role") as AdminRole | null;
    return storedRole && storedRole in adminRoleLabels ? storedRole : "operations-admin";
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.localStorage.getItem("servygo-admin-auth") === "true";
  });
  const [lastActivityAt, setLastActivityAt] = useState(() => Date.now());
  const [isSessionExpiring, setIsSessionExpiring] = useState(false);
  const [isSessionLocked, setIsSessionLocked] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const setRole = useCallback((nextRole: AdminRole) => {
    setRoleState(nextRole);
    window.localStorage.setItem("servygo-admin-role", nextRole);
    setToasts((current) => [
      ...current,
      {
        id: Date.now(),
        message: `Viewing the interface as ${adminRoleLabels[nextRole]} (${roleTerritories[nextRole]}).`,
        tone: "success",
      },
    ]);
  }, []);

  const signIn = useCallback((nextRole?: AdminRole) => {
    const activeRole = nextRole ?? role;
    if (nextRole) {
      setRoleState(nextRole);
      window.localStorage.setItem("servygo-admin-role", nextRole);
    }

    setIsAuthenticated(true);
    setIsSessionExpiring(false);
    setIsSessionLocked(false);
    setLastActivityAt(Date.now());
    window.localStorage.setItem("servygo-admin-auth", "true");
    setToasts((current) => [
      ...current,
      {
        id: Date.now(),
        message: `Signed in as ${adminRoleLabels[activeRole]}. Mock session is now active.`,
        tone: "success",
      },
    ]);
  }, [role]);

  const signOut = useCallback(() => {
    setIsAuthenticated(false);
    setIsSessionExpiring(false);
    setIsSessionLocked(false);
    window.localStorage.setItem("servygo-admin-auth", "false");
    setToasts((current) => [
      ...current,
      {
        id: Date.now(),
        message: "Signed out of the mock admin session.",
        tone: "default",
      },
    ]);
  }, []);

  const refreshSession = useCallback(() => {
    setIsSessionExpiring(false);
    setIsSessionLocked(false);
    setLastActivityAt(Date.now());
    setToasts((current) => [
      ...current,
      {
        id: Date.now(),
        message: "Session extended. Sensitive actions stay available.",
        tone: "success",
      },
    ]);
  }, []);

  const pushToast = (toast: Omit<Toast, "id">) => {
    setToasts((current) => [...current, { ...toast, id: Date.now() + Math.random() }]);
  };

  useEffect(() => {
    if (toasts.length === 0) return;
    const timer = window.setTimeout(() => {
      setToasts((current) => current.slice(1));
    }, 2800);
    return () => window.clearTimeout(timer);
  }, [toasts]);

  useEffect(() => {
    if (!isAuthenticated || isSessionLocked) return;

    const markActivity = () => setLastActivityAt(Date.now());
    window.addEventListener("pointerdown", markActivity);
    window.addEventListener("keydown", markActivity);
    window.addEventListener("touchstart", markActivity);

    return () => {
      window.removeEventListener("pointerdown", markActivity);
      window.removeEventListener("keydown", markActivity);
      window.removeEventListener("touchstart", markActivity);
    };
  }, [isAuthenticated, isSessionLocked]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const warningTimer = window.setTimeout(() => {
      setIsSessionExpiring(true);
    }, 70_000);

    const lockTimer = window.setTimeout(() => {
      setIsSessionExpiring(true);
      setIsSessionLocked(true);
    }, 100_000);

    return () => {
      window.clearTimeout(warningTimer);
      window.clearTimeout(lockTimer);
    };
  }, [isAuthenticated, lastActivityAt]);

  const authValue = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated,
      isRouteAllowed: (pathname: string) => isRouteAllowed(pathname, role),
      isReadOnly: role === "read-only-admin",
      isSessionExpiring,
      isSessionLocked,
      refreshSession,
      role,
      setRole,
      signIn,
      signOut,
    }),
    [isAuthenticated, isSessionExpiring, isSessionLocked, refreshSession, role, setRole, signIn, signOut],
  );

  const toastValue = useMemo<ToastContextValue>(() => ({ pushToast }), []);

  return (
    <AuthContext.Provider value={authValue}>
      <ToastContext.Provider value={toastValue}>
        {children}
        <ToastViewport toasts={toasts} />
      </ToastContext.Provider>
    </AuthContext.Provider>
  );
}

export function useMockAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useMockAuth must be used within Providers");
  }
  return context;
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within Providers");
  }
  return context;
}
