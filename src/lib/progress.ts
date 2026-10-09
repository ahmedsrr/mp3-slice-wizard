import { useCallback, useEffect, useState } from "react";

const KEY = "crem-progress-v1";

export type Score = { ok: number; total: number };

export type Progress = {
  maths: Record<string, Score>;
  langue: Record<string, Score>;
  tsqDone: string[];
  dissertations: { id: string; subject: string; words: number; date: string }[];
  examDate?: string;
};

const empty: Progress = { maths: {}, langue: {}, tsqDone: [], dissertations: [] };

function read(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...empty, ...JSON.parse(raw) } : empty;
  } catch {
    return empty;
  }
}

function write(p: Progress) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* stockage indisponible : on continue sans sauvegarde */
  }
  window.dispatchEvent(new Event("crem-progress"));
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(read);

  useEffect(() => {
    const sync = () => setProgress(read());
    window.addEventListener("crem-progress", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("crem-progress", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const update = useCallback((fn: (p: Progress) => Progress) => write(fn(read())), []);

  const record = useCallback(
    (area: "maths" | "langue", key: string, ok: boolean) =>
      update((p) => {
        const cur = p[area][key] ?? { ok: 0, total: 0 };
        return { ...p, [area]: { ...p[area], [key]: { ok: cur.ok + (ok ? 1 : 0), total: cur.total + 1 } } };
      }),
    [update],
  );

  const reset = useCallback(() => write(empty), []);

  return { progress, update, record, reset };
}

export function useLocalText(key: string, initial = "") {
  const [value, setValue] = useState<string>(() => {
    try {
      return localStorage.getItem(key) ?? initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* ignore */
    }
  }, [key, value]);
  return [value, setValue] as const;
}

export const fmt = (n: number, digits = 2) =>
  n.toLocaleString("fr-FR", { maximumFractionDigits: digits });

export function parseAnswer(s: string): number | null {
  const cleaned = s.replace(/[\s\u00a0\u202f]/g, "").replace(",", ".").replace(/[^\d.-]/g, "");
  if (!cleaned) return null;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

export const isClose = (a: number, b: number) => Math.abs(a - b) <= Math.max(0.011, Math.abs(b) * 1e-4);

/** Lit une heure saisie « 14h30 », « 14:30 », « 14 h 05 » ou « 9h » → minutes depuis minuit. */
export function parseTime(s: string): number | null {
  const m = s.trim().toLowerCase().match(/^(\d{1,2})\s*(?:h|:)\s*(\d{0,2})\s*(?:min)?$/);
  if (!m) return null;
  const h = Number(m[1]), min = m[2] ? Number(m[2]) : 0;
  return h < 24 && min < 60 ? h * 60 + min : null;
}
