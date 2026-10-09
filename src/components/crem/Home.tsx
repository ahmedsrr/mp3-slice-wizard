import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress as Bar } from "@/components/ui/progress";
import { Calculator, CalendarClock, FileText, PenLine, Info } from "lucide-react";
import { useProgress } from "@/lib/progress";
import { tsqTexts } from "@/data/tsq";
import { subjects } from "@/data/dissertation";

const sum = (r: Record<string, { ok: number; total: number }>) =>
  Object.values(r).reduce((a, s) => ({ ok: a.ok + s.ok, total: a.total + s.total }), { ok: 0, total: 0 });

const semaine = [
  { jour: "Lundi", tache: "Maths : 1 fiche + 15 exercices" },
  { jour: "Mardi", tache: "TSQ : 1 texte complet chronométré" },
  { jour: "Mercredi", tache: "Dissertation : analyse de 3 sujets + plans détaillés" },
  { jour: "Jeudi", tache: "Maths : entraînement mélangé (30 min) + langue (20 questions)" },
  { jour: "Vendredi", tache: "Dissertation : rédaction complète en 3 h" },
  { jour: "Samedi", tache: "Examen blanc maths ou TSQ" },
  { jour: "Dimanche", tache: "Repos + relecture des fiches et des citations" },
];

export function Home() {
  const { progress, update, reset } = useProgress();
  const m = sum(progress.maths);
  const l = sum(progress.langue);
  const days = progress.examDate ? Math.ceil((new Date(progress.examDate).getTime() - Date.now()) / 86400000) : null;

  const stats = [
    { label: "Maths", icon: Calculator, to: "/maths", value: m.total ? `${Math.round((m.ok / m.total) * 100)} %` : "—", sub: `${m.ok}/${m.total} exercices réussis`, pct: m.total ? (m.ok / m.total) * 100 : 0 },
    { label: "TSQ", icon: FileText, to: "/tsq", value: `${progress.tsqDone.length}/${tsqTexts.length}`, sub: `textes travaillés · langue ${l.ok}/${l.total}`, pct: (progress.tsqDone.length / tsqTexts.length) * 100 },
    { label: "Dissertation", icon: PenLine, to: "/dissertation", value: `${progress.dissertations.length}/${subjects.length}`, sub: "copies rédigées", pct: (progress.dissertations.length / subjects.length) * 100 },
  ];

  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-gradient-to-br from-primary to-primary/70 p-6 sm:p-10 text-primary-foreground">
        <p className="text-sm uppercase tracking-widest opacity-80">Concours de recrutement d'élèves-maîtres</p>
        <h1 className="mt-2 text-3xl sm:text-5xl font-bold font-serif">Réussir le CREM 2026</h1>
        <p className="mt-3 max-w-2xl opacity-90">
          Fiches, exercices illimités et épreuves blanches pour les mathématiques, le texte suivi de questions et la dissertation.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button asChild variant="secondary">
            <Link to="/examen">Lancer un examen blanc</Link>
          </Button>
          <div className="flex items-center gap-2 rounded-lg bg-primary-foreground/15 px-3 py-1.5">
            <CalendarClock className="h-4 w-4" />
            <label htmlFor="exam-date" className="text-sm">Date de mon épreuve :</label>
            <Input
              id="exam-date"
              type="date"
              value={progress.examDate ?? ""}
              onChange={(e) => update((p) => ({ ...p, examDate: e.target.value || undefined }))}
              className="h-8 w-40 border-0 bg-primary-foreground text-foreground"
            />
            {days !== null && days >= 0 && <span className="text-sm font-semibold">J-{days}</span>}
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Link key={s.label} to={s.to}>
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2">
                  <s.icon className="h-4 w-4" /> {s.label}
                </CardDescription>
                <CardTitle className="text-3xl tabular-nums">{s.value}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Bar value={s.pct} />
                <p className="text-xs text-muted-foreground">{s.sub}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" /> Ce qu'il faut savoir sur les épreuves
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed">
            <div>
              <h4 className="font-semibold">Présélection (20 août 2026)</h4>
              <p className="text-muted-foreground">
                Nouveauté 2026 : la dictée est supprimée. Pour l'option Français, épreuve mixte de 2 h 30 notée sur 40 : une partie français
                (repérer et corriger des erreurs, grammaire, orthographe, conjugaison) sur 20 et une partie mathématiques (opérations et petits
                problèmes) sur 20, au niveau CM1/CM2.
              </p>
            </div>
            <div>
              <h4 className="font-semibold">Admissibilité (épreuves écrites)</h4>
              <p className="text-muted-foreground">
                D'après les sessions précédentes : une <strong>dissertation</strong> en français (3 h) et un contrôle des connaissances à enseigner
                regroupant le <strong>texte suivi de questions</strong>, les <strong>mathématiques</strong> (opérations et problèmes) et la
                découverte du monde (histoire, géographie, sciences). Le niveau attendu est celui du programme de l'élémentaire, exigé avec la
                rigueur d'un futur maître : rédaction soignée, démarches justifiées, zéro faute.
              </p>
            </div>
            <div>
              <h4 className="font-semibold">Admission</h4>
              <p className="text-muted-foreground">Entretien oral : expression, motivation, culture générale.</p>
            </div>
            <p className="rounded-md border border-warning/40 bg-warning/10 p-3 text-xs">
              Le format exact (durées, coefficients) peut évoluer d'une session à l'autre. Vérifie toujours l'arrêté et les communiqués officiels
              sur crem.education.sn et education.sn.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Plan de révision hebdomadaire</CardTitle>
            <CardDescription>Environ 1 h 30 par jour, à adapter à ton emploi du temps.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="divide-y">
              {semaine.map((s) => (
                <li key={s.jour} className="flex gap-4 py-2 text-sm">
                  <span className="w-20 shrink-0 font-semibold">{s.jour}</span>
                  <span className="text-muted-foreground">{s.tache}</span>
                </li>
              ))}
            </ul>
            <Button
              variant="ghost"
              size="sm"
              className="mt-4 text-muted-foreground"
              onClick={() => {
                if (confirm("Effacer toute ta progression enregistrée sur cet appareil ?")) reset();
              }}
            >
              Réinitialiser ma progression
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
