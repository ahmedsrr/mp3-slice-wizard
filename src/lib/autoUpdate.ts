import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

/** Nom du bundle JS actuellement chargé (ex. /assets/index-AbC123.js). */
const currentBundle = () =>
  document.querySelector<HTMLScriptElement>('script[type="module"][src*="/assets/"]')?.getAttribute("src") ?? null;

async function latestBundle(): Promise<string | null> {
  try {
    const res = await fetch(`/?v=${Date.now()}`, { cache: "no-store" });
    const html = await res.text();
    return html.match(/<script[^>]+type="module"[^>]+src="([^"]*\/assets\/[^"]+\.js)"/)?.[1] ?? null;
  } catch {
    return null;
  }
}

/**
 * Détecte qu'une nouvelle version a été déployée (onglet resté ouvert, page restaurée par le navigateur…)
 * et recharge l'application au prochain changement de page, pour ne jamais afficher une version périmée.
 */
export function useAutoUpdate() {
  const { pathname } = useLocation();
  const stale = useRef(false);
  const first = useRef(true);

  useEffect(() => {
    const mine = currentBundle();
    if (!mine) return; // serveur de développement : rien à faire

    const check = async () => {
      if (stale.current) return;
      const latest = await latestBundle();
      if (latest && latest !== mine) {
        stale.current = true;
        toast("Nouvelle version disponible", {
          description: "L'application va se mettre à jour.",
          action: { label: "Actualiser", onClick: () => window.location.reload() },
          duration: 10000,
        });
      }
    };

    const onVisible = () => document.visibilityState === "visible" && check();
    const onShow = (e: PageTransitionEvent) => e.persisted && check(); // page restaurée depuis le cache
    check();
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("pageshow", onShow);
    const id = window.setInterval(check, 5 * 60 * 1000);
    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("pageshow", onShow);
      window.clearInterval(id);
    };
  }, []);

  // Changement de page avec une version périmée : on charge directement la nouvelle version.
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (stale.current) window.location.assign(pathname);
  }, [pathname]);
}
