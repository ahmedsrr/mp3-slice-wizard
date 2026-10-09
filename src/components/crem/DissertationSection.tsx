import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ArrowDown, ArrowUp, CheckCircle2, ChevronDown, Eye, PenLine, Shuffle, XCircle } from "lucide-react";
import { citations, connecteurs, grille, subjects, type Subject } from "@/data/dissertation";
import { introRoles, intros } from "@/data/dissertationExtra";
import { useLocalText, useProgress } from "@/lib/progress";
import { Timer } from "./Timer";
import { toast } from "sonner";

const shuffle = <T,>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);
const randomSubject = () => subjects[Math.floor(Math.random() * subjects.length)];

function SubjectDetail({ s, onWrite }: { s: Subject; onWrite: () => void }) {
  const [showPlan, setShowPlan] = useState(false);
  return (
    <Card>
      <CardHeader className="p-4 sm:p-6">
        <div className="flex flex-wrap gap-2">
          <Badge>{s.type}</Badge>
          <Badge variant="outline">{s.theme}</Badge>
        </div>
        <CardTitle className="font-serif text-lg sm:text-xl leading-snug pt-2">{s.sujet}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-4 pt-0 sm:p-6 sm:pt-0">
        <p className="text-sm text-muted-foreground">
          Au brouillon (10 min) : définis les mots clés, formule une problématique et construis ton plan. Ensuite seulement, compare avec la proposition.
        </p>
        {showPlan && (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-1">Mots clés</h4>
              <ul className="list-disc list-inside text-sm space-y-1">
                {s.motsCles.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg bg-primary/10 p-3 text-sm">
              <span className="font-semibold">Problématique possible : </span>
              {s.problematique}
            </div>
            {s.plan.map((p) => (
              <div key={p.titre}>
                <h5 className="font-semibold">{p.titre}</h5>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-0.5">
                  {p.idees.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button variant="outline" onClick={() => setShowPlan((v) => !v)}>
            <Eye className="h-4 w-4 mr-1" /> {showPlan ? "Masquer" : "Voir"} la proposition
          </Button>
          <Button onClick={onWrite}>
            <PenLine className="h-4 w-4 mr-1" /> Rédiger ce sujet
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

const modes = [
  { id: "intro", label: "Introduction", minutes: 20, hint: "Amorce, sujet posé, problématique, annonce du plan (8 à 12 lignes)." },
  { id: "plan", label: "Plan détaillé", minutes: 45, hint: "Problématique + parties, sous-parties, arguments et exemples en style télégraphique." },
  { id: "copie", label: "Copie complète", minutes: 180, hint: "Introduction, développement, conclusion." },
] as const;

function Boite() {
  return (
    <Collapsible>
      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border bg-card px-4 py-3 text-sm font-medium">
        Boîte à outils : connecteurs et citations <ChevronDown className="h-4 w-4" />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-4 pt-3">
        {connecteurs.map((c) => (
          <div key={c.role}>
            <p className="text-xs font-semibold uppercase text-muted-foreground mb-1">{c.role}</p>
            <div className="flex flex-wrap gap-1.5">
              {c.words.map((w) => (
                <Badge key={w} variant="secondary" className="font-normal">
                  {w}
                </Badge>
              ))}
            </div>
          </div>
        ))}
        <div className="space-y-2">
          {citations.map((c) => (
            <blockquote key={c.text} className="border-l-4 border-primary pl-3 text-sm">
              <p className="font-serif italic">« {c.text} »</p>
              <footer className="text-xs text-muted-foreground">— {c.author}</footer>
            </blockquote>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export function Atelier({ subject, initialMode = "copie" }: { subject: Subject; initialMode?: (typeof modes)[number]["id"] }) {
  const [modeId, setModeId] = useState<(typeof modes)[number]["id"]>(initialMode);
  const mode = modes.find((m) => m.id === modeId)!;
  const [text, setText] = useLocalText(`crem-diss-${subject.id}${modeId === "copie" ? "" : `-${modeId}`}`);
  const [checked, setChecked] = useState<boolean[]>(() => grille.map(() => false));
  const { update } = useProgress();
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
      <div className="min-w-0 space-y-4">
        <div className="grid grid-cols-3 gap-2">
          {modes.map((m) => (
            <Button key={m.id} size="sm" variant={m.id === modeId ? "default" : "outline"} onClick={() => setModeId(m.id)} className="h-auto whitespace-normal py-2">
              {m.label}
              <span className="ml-1 hidden opacity-70 sm:inline">· {m.minutes >= 60 ? `${m.minutes / 60} h` : `${m.minutes} min`}</span>
            </Button>
          ))}
        </div>
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <CardDescription>{mode.hint}</CardDescription>
              <Timer key={modeId} minutes={mode.minutes} onEnd={() => toast("Temps écoulé ! Pose ton stylo et relis-toi.")} />
            </div>
            <CardTitle className="font-serif text-base sm:text-lg leading-snug">{subject.sujet}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 p-4 pt-0 sm:p-6 sm:pt-0">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={mode.id === "plan" ? "Problématique :\nI. …\n  1) …\n  2) …\nII. …" : "Commence ici…"}
              className="min-h-[300px] sm:min-h-[420px] font-serif text-base sm:text-[1.05rem] leading-7"
            />
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
              <span>{words} mots</span>
              {mode.id === "copie" && (
                <Button
                  size="sm"
                  onClick={() => {
                    update((p) => ({
                      ...p,
                      dissertations: [
                        ...p.dissertations.filter((d) => d.id !== subject.id),
                        { id: subject.id, subject: subject.sujet, words, date: new Date().toISOString() },
                      ],
                    }));
                    toast.success("Copie enregistrée dans ta progression");
                  }}
                  disabled={words < 50}
                >
                  Enregistrer ma copie
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
        <Boite />
      </div>
      <Card className="lg:self-start">
        <CardHeader className="p-4 pb-2 sm:p-6 sm:pb-2">
          <CardTitle className="text-base">Grille d'auto-évaluation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 p-4 sm:p-6">
          {grille.map((g, i) => (
            <label key={g} className="flex items-start gap-2 text-sm cursor-pointer">
              <Checkbox checked={checked[i]} onCheckedChange={(v) => setChecked((c) => c.map((x, j) => (j === i ? v === true : x)))} className="mt-0.5" />
              <span>{g}</span>
            </label>
          ))}
          <p className="text-sm font-medium pt-2">
            {checked.filter(Boolean).length} / {grille.length} critères validés
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function OrdreIntro() {
  const [order, setOrder] = useState(() => shuffle(intros));
  const [idx, setIdx] = useState(0);
  const intro = order[idx % order.length];
  const subject = subjects.find((s) => s.id === intro.subjectId)!;
  const [items, setItems] = useState(() => shuffle([0, 1, 2, 3]));
  const [checked, setChecked] = useState(false);
  const { record } = useProgress();
  const ok = items.every((v, i) => v === i);

  const move = (i: number, d: -1 | 1) => {
    const j = i + d;
    if (checked || j < 0 || j >= items.length) return;
    setItems((cur) => {
      const n = [...cur];
      [n[i], n[j]] = [n[j], n[i]];
      return n;
    });
  };

  return (
    <Card>
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-lg">Remets l'introduction dans l'ordre</CardTitle>
        <CardDescription className="font-serif text-base text-foreground">{subject.sujet}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 p-4 pt-0 sm:p-6 sm:pt-0">
        {items.map((v, i) => (
          <div
            key={v}
            className={`flex items-start gap-2 rounded-lg border p-3 ${checked ? (v === i ? "border-success bg-success/10" : "border-destructive bg-destructive/10") : "bg-card"}`}
          >
            <div className="flex shrink-0 flex-col">
              <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => move(i, -1)} disabled={checked || i === 0} aria-label="Monter">
                <ArrowUp className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => move(i, 1)} disabled={checked || i === items.length - 1} aria-label="Descendre">
                <ArrowDown className="h-4 w-4" />
              </Button>
            </div>
            <div className="min-w-0 text-sm sm:text-base">
              {checked && <p className="text-xs font-semibold uppercase text-muted-foreground">{introRoles[v]}</p>}
              <p className="font-serif">{intro.parts[v]}</p>
            </div>
          </div>
        ))}
        {!checked ? (
          <Button className="w-full sm:w-auto" onClick={() => { setChecked(true); record("langue", "Introductions", ok); }}>
            Vérifier
          </Button>
        ) : (
          <div className="space-y-3">
            <p className={`flex items-center gap-2 font-medium ${ok ? "text-success" : "text-destructive"}`}>
              {ok ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
              {ok ? "Ordre correct !" : "Ordre attendu : amorce → sujet posé → problématique → annonce du plan."}
            </p>
            <Button
              className="w-full sm:w-auto"
              onClick={() => {
                if ((idx + 1) % order.length === 0) setOrder(shuffle(intros));
                setIdx((x) => x + 1);
                setItems(shuffle([0, 1, 2, 3]));
                setChecked(false);
              }}
            >
              Introduction suivante
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

const planTypes: Subject["type"][] = ["Dialectique", "Analytique", "Thématique"];
const planExplain: Record<Subject["type"], string> = {
  Dialectique: "Le sujet appelle un débat (« Discutez », « Partagez-vous… ? », question fermée) : thèse, antithèse, synthèse.",
  Analytique: "Le sujet porte sur un problème (phénomène, fléau) : constat ou causes, conséquences, solutions.",
  Thématique: "Le sujet demande d'expliquer ou d'énumérer des rôles, des aspects : une partie par aspect.",
};

function QuelPlan() {
  const order = useMemo(() => shuffle(subjects), []);
  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState<Subject["type"] | null>(null);
  const { progress, record } = useProgress();
  const s = order[idx % order.length];
  const score = progress.langue["Type de plan"];

  return (
    <Card>
      <CardHeader className="p-4 sm:p-6">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-lg">Quel type de plan ?</CardTitle>
          {score && <span className="text-sm text-muted-foreground">{score.ok}/{score.total}</span>}
        </div>
        <CardDescription className="font-serif text-base text-foreground">{s.sujet}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 p-4 pt-0 sm:p-6 sm:pt-0">
        <div className="grid gap-2 sm:grid-cols-3">
          {planTypes.map((t) => {
            const state = chosen === null ? "" : t === s.type ? "border-success bg-success/10" : t === chosen ? "border-destructive bg-destructive/10" : "opacity-60";
            return (
              <button
                key={t}
                className={`rounded-lg border px-4 py-3 text-left transition-colors hover:bg-muted ${state}`}
                onClick={() => {
                  if (chosen) return;
                  setChosen(t);
                  record("langue", "Type de plan", t === s.type);
                }}
              >
                {t}
              </button>
            );
          })}
        </div>
        {chosen && (
          <div className="space-y-3">
            <p className="rounded-md bg-muted p-3 text-sm">
              <strong>{s.type}.</strong> {planExplain[s.type]}
              <br />
              <span className="text-muted-foreground">Plan proposé : {s.plan.map((p) => p.titre).join(" · ")}</span>
            </p>
            <p className="text-xs text-muted-foreground">Certains sujets acceptent plusieurs plans : l'essentiel est de répondre à la problématique.</p>
            <Button className="w-full sm:w-auto" onClick={() => { setIdx((i) => i + 1); setChosen(null); }}>
              Sujet suivant
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function DissertationSection() {
  const [tab, setTab] = useState("sujets");
  const [subjectId, setSubjectId] = useState(subjects[0].id);
  const [theme, setTheme] = useState("Tous");
  const themes = ["Tous", ...new Set(subjects.map((s) => s.theme))];
  const list = theme === "Tous" ? subjects : subjects.filter((s) => s.theme === theme);
  const subject = subjects.find((s) => s.id === subjectId)!;
  const { progress } = useProgress();

  return (
    <Tabs value={tab} onValueChange={setTab} className="space-y-6">
      <TabsList className="grid h-auto w-full grid-cols-2 sm:inline-flex sm:w-auto">
        <TabsTrigger value="sujets" className="whitespace-normal">Sujets ({subjects.length})</TabsTrigger>
        <TabsTrigger value="atelier" className="whitespace-normal">Rédiger</TabsTrigger>
        <TabsTrigger value="intro" className="whitespace-normal">Ordre de l'intro</TabsTrigger>
        <TabsTrigger value="plan" className="whitespace-normal">Type de plan</TabsTrigger>
      </TabsList>

      <TabsContent value="sujets" className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row">
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="rounded-md border bg-card px-3 py-2 text-sm sm:w-64"
            aria-label="Thème"
          >
            {themes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <Button variant="secondary" onClick={() => setSubjectId(randomSubject().id)}>
            <Shuffle className="h-4 w-4 mr-1" /> Sujet au hasard
          </Button>
        </div>
        <select
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
          className="w-full rounded-md border bg-card px-3 py-2.5 text-sm lg:hidden"
          aria-label="Sujet"
        >
          {list.map((s) => (
            <option key={s.id} value={s.id}>
              {progress.dissertations.some((d) => d.id === s.id) ? "✓ " : ""}
              {s.sujet.length > 90 ? `${s.sujet.slice(0, 90)}…` : s.sujet}
            </option>
          ))}
        </select>
        <div className="grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)]">
          <div className="hidden max-h-[70vh] space-y-2 overflow-auto pr-1 lg:block">
            {list.map((s) => {
              const done = progress.dissertations.some((d) => d.id === s.id);
              return (
                <button
                  key={s.id}
                  onClick={() => setSubjectId(s.id)}
                  className={`w-full rounded-lg border p-3 text-left text-sm transition-colors ${
                    s.id === subjectId ? "border-primary bg-primary/10" : "hover:bg-muted"
                  }`}
                >
                  <div className="line-clamp-2">{s.sujet}</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {s.type} · {s.theme} {done && "· ✓ rédigé"}
                  </div>
                </button>
              );
            })}
          </div>
          <SubjectDetail
            key={subject.id}
            s={subject}
            onWrite={() => {
              setTab("atelier");
              window.scrollTo({ top: 0 });
            }}
          />
        </div>
      </TabsContent>

      <TabsContent value="atelier">
        <Atelier key={subject.id} subject={subject} />
      </TabsContent>

      <TabsContent value="intro">
        <OrdreIntro />
      </TabsContent>

      <TabsContent value="plan">
        <QuelPlan />
      </TabsContent>
    </Tabs>
  );
}
