import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, PenLine, Quote, Shuffle } from "lucide-react";
import { citations, connecteurs, grille, methodSteps, subjects, timePlan, type Subject } from "@/data/dissertation";
import { useLocalText, useProgress } from "@/lib/progress";
import { Timer } from "./Timer";
import { toast } from "sonner";

function SubjectDetail({ s, onWrite }: { s: Subject; onWrite: () => void }) {
  const [showPlan, setShowPlan] = useState(false);
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap gap-2">
          <Badge>{s.type}</Badge>
          <Badge variant="outline">{s.theme}</Badge>
        </div>
        <CardTitle className="font-serif text-xl leading-snug pt-2">{s.sujet}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold mb-1">Mots clés</h4>
          <ul className="list-disc list-inside text-sm space-y-1">
            {s.motsCles.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg bg-primary/10 p-3">
          <span className="font-semibold">Problématique possible : </span>
          {s.problematique}
        </div>
        {showPlan ? (
          <div className="space-y-3">
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
        ) : (
          <p className="text-sm text-muted-foreground">Essaie d'abord de construire ton propre plan au brouillon (10 min), puis compare.</p>
        )}
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => setShowPlan((v) => !v)}>
            <Eye className="h-4 w-4 mr-1" /> {showPlan ? "Masquer" : "Voir"} le plan proposé
          </Button>
          <Button onClick={onWrite}>
            <PenLine className="h-4 w-4 mr-1" /> Rédiger ce sujet
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function Atelier({ subject, minutes = 180 }: { subject: Subject; minutes?: number }) {
  const [text, setText] = useLocalText(`crem-diss-${subject.id}`);
  const [checked, setChecked] = useState<boolean[]>(() => grille.map(() => false));
  const { update } = useProgress();
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CardDescription>Sujet</CardDescription>
            <Timer minutes={minutes} onEnd={() => toast("Temps écoulé ! Pose ton stylo et relis-toi.")} />
          </div>
          <CardTitle className="font-serif text-lg leading-snug">{subject.sujet}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={"Introduction : amorce, sujet posé, problématique, annonce du plan…\n\nDéveloppement…\n\nConclusion…"}
            className="min-h-[420px] font-serif text-[1.05rem] leading-7"
          />
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
            <span>
              {words} mots · une bonne copie fait souvent entre 900 et 1 500 mots
            </span>
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
          </div>
        </CardContent>
      </Card>
      <Card className="lg:self-start">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Grille d'auto-évaluation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {grille.map((g, i) => (
            <label key={g} className="flex items-start gap-2 text-sm cursor-pointer">
              <Checkbox
                checked={checked[i]}
                onCheckedChange={(v) => setChecked((c) => c.map((x, j) => (j === i ? v === true : x)))}
                className="mt-0.5"
              />
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
      <TabsList className="flex-wrap h-auto">
        <TabsTrigger value="sujets">Banque de sujets</TabsTrigger>
        <TabsTrigger value="atelier">Atelier de rédaction</TabsTrigger>
        <TabsTrigger value="methode">Méthode</TabsTrigger>
        <TabsTrigger value="outils">Connecteurs & citations</TabsTrigger>
      </TabsList>

      <TabsContent value="sujets" className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {themes.map((t) => (
            <Button key={t} size="sm" variant={t === theme ? "default" : "outline"} onClick={() => setTheme(t)}>
              {t}
            </Button>
          ))}
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setSubjectId(subjects[Math.floor(Math.random() * subjects.length)].id)}
          >
            <Shuffle className="h-4 w-4 mr-1" /> Sujet au hasard
          </Button>
        </div>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,340px)_1fr]">
          <div className="space-y-2">
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
          <SubjectDetail key={subject.id} s={subject} onWrite={() => {
            setTab("atelier");
            window.scrollTo({ top: 0 });
          }} />
        </div>
      </TabsContent>

      <TabsContent value="atelier">
        <Atelier key={subject.id} subject={subject} />
      </TabsContent>

      <TabsContent value="methode" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Gestion des 3 heures</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-8 w-full overflow-hidden rounded-md">
              {timePlan.map((t, i) => (
                <div
                  key={t.label}
                  style={{ width: `${(t.min / 180) * 100}%` }}
                  className={`flex items-center justify-center text-xs font-medium text-primary-foreground ${
                    ["bg-primary", "bg-primary/80", "bg-primary/60", "bg-accent", "bg-primary/90"][i]
                  }`}
                >
                  {t.min}′
                </div>
              ))}
            </div>
            <ul className="mt-3 grid gap-1 text-sm sm:grid-cols-2">
              {timePlan.map((t) => (
                <li key={t.label}>
                  <span className="font-medium">{t.min} min</span> — {t.label}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <div className="grid gap-4 md:grid-cols-2">
          {methodSteps.map((m) => (
            <Card key={m.title}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{m.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1 text-sm leading-relaxed">
                  {m.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="outils" className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {connecteurs.map((c) => (
            <Card key={c.role}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{c.role}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {c.words.map((w) => (
                  <Badge key={w} variant="secondary" className="font-normal">
                    {w}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Quote className="h-5 w-5" /> Citations utiles sur l'éducation
            </CardTitle>
            <CardDescription>À utiliser en amorce ou comme argument d'autorité — cite exactement et nomme l'auteur.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            {citations.map((c) => (
              <blockquote key={c.text} className="border-l-4 border-primary pl-3">
                <p className="font-serif italic">« {c.text} »</p>
                <footer className="text-sm text-muted-foreground">— {c.author}</footer>
              </blockquote>
            ))}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
