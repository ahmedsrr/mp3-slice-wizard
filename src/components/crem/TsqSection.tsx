import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Eye, XCircle } from "lucide-react";
import { drills, tsqTexts, type TsqText } from "@/data/tsq";
import { errorSentences, parseErrorSentence } from "@/data/tsqExtra";
import { useLocalText, useProgress } from "@/lib/progress";
import { Timer } from "./Timer";

const shuffle = <T,>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);

function QuestionBlock({ textId, index, q }: { textId: string; index: number; q: TsqText["questions"][number] }) {
  const [answer, setAnswer] = useLocalText(`crem-tsq-${textId}-${index}`);
  const [show, setShow] = useState(false);
  return (
    <div className="space-y-2 rounded-lg border bg-card p-3 sm:p-4">
      <div className="flex items-start justify-between gap-3">
        <p className="font-medium">
          {index + 1}. {q.q}
        </p>
        <Badge variant="outline" className="shrink-0">
          {q.points} pt{q.points > 1 ? "s" : ""}
        </Badge>
      </div>
      <Textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Rédige ta réponse en phrase complète…"
        rows={q.section === "Production" ? 8 : 2}
      />
      <Button size="sm" variant="ghost" onClick={() => setShow((s) => !s)}>
        <Eye className="h-4 w-4 mr-1" /> {show ? "Masquer" : "Voir"} le corrigé
      </Button>
      {show && <p className="rounded-md bg-success/10 p-3 text-sm leading-relaxed">{q.answer}</p>}
    </div>
  );
}

export function TsqReader({ text, withTimer = true }: { text: TsqText; withTimer?: boolean }) {
  const sections = useMemo(() => {
    const map = new Map<string, { q: TsqText["questions"][number]; i: number }[]>();
    text.questions.forEach((q, i) => map.set(q.section, [...(map.get(q.section) ?? []), { q, i }]));
    return [...map.entries()];
  }, [text]);
  const total = text.questions.reduce((a, q) => a + q.points, 0);
  const { progress, update } = useProgress();
  const done = progress.tsqDone.includes(text.id);
  const [view, setView] = useState<"texte" | "questions">("texte");

  return (
    <div className="space-y-4">
      {/* Sur mobile : on bascule entre le texte et les questions */}
      <div className="sticky top-14 z-10 -mx-4 flex gap-2 border-b bg-background/95 px-4 py-2 backdrop-blur xl:hidden">
        <Button size="sm" className="flex-1" variant={view === "texte" ? "default" : "outline"} onClick={() => setView("texte")}>
          Texte
        </Button>
        <Button size="sm" className="flex-1" variant={view === "questions" ? "default" : "outline"} onClick={() => setView("questions")}>
          Questions ({text.questions.length})
        </Button>
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <Card className={`${view === "texte" ? "" : "hidden"} xl:block xl:sticky xl:top-20 xl:self-start xl:max-h-[calc(100vh-6rem)] xl:overflow-auto`}>
          <CardHeader className="p-4 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <CardTitle className="font-serif text-xl sm:text-2xl">{text.title}</CardTitle>
              {withTimer && <Timer minutes={60} />}
            </div>
            <CardDescription>{text.source}</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
            <div className="font-serif text-base sm:text-[1.05rem] leading-7 sm:leading-8 space-y-4">
              {text.text.split("\n\n").map((p, i) => (
                <p key={i} className="indent-6">
                  {p}
                </p>
              ))}
            </div>
            <Button className="mt-6 w-full xl:hidden" onClick={() => { setView("questions"); window.scrollTo({ top: 0 }); }}>
              Répondre aux questions
            </Button>
          </CardContent>
        </Card>
        <div className={`${view === "questions" ? "" : "hidden"} xl:block min-w-0 space-y-6`}>
          <p className="text-sm text-muted-foreground">Barème indicatif : {total} points. Tes réponses sont sauvegardées sur cet appareil.</p>
          {sections.map(([name, qs]) => (
            <div key={name} className="space-y-3">
              <h3 className="text-lg font-semibold">{name}</h3>
              {qs.map(({ q, i }) => (
                <QuestionBlock key={i} textId={text.id} index={i} q={q} />
              ))}
            </div>
          ))}
          <Button
            className="w-full sm:w-auto"
            variant={done ? "secondary" : "default"}
            onClick={() =>
              update((p) => ({
                ...p,
                tsqDone: done ? p.tsqDone.filter((x) => x !== text.id) : [...p.tsqDone, text.id],
              }))
            }
          >
            {done ? "Marqué comme terminé ✓" : "Marquer ce texte comme terminé"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function Drills() {
  const cats = [...new Set(drills.map((d) => d.cat))];
  const [cat, setCat] = useState<string>("Tout");
  const [pool, setPool] = useState(() => shuffle(drills));
  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const { progress, record } = useProgress();
  const d = pool[idx % pool.length];

  const selectCat = (c: string) => {
    setCat(c);
    setPool(shuffle(c === "Tout" ? drills : drills.filter((x) => x.cat === c)));
    setIdx(0);
    setChosen(null);
  };

  const choose = (i: number) => {
    if (chosen !== null) return;
    setChosen(i);
    record("langue", d.cat, i === d.correct);
  };

  return (
    <div className="space-y-4">
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {["Tout", ...cats].map((c) => {
          const s = progress.langue[c];
          return (
            <Button key={c} size="sm" className="shrink-0" variant={c === cat ? "default" : "outline"} onClick={() => selectCat(c)}>
              {c}
              {s && <span className="ml-1 opacity-70">({s.ok}/{s.total})</span>}
            </Button>
          );
        })}
      </div>
      <Card>
        <CardContent className="space-y-4 p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <Badge variant="secondary">{d.cat}</Badge>
            <span className="text-sm text-muted-foreground">
              {(idx % pool.length) + 1} / {pool.length}
            </span>
          </div>
          <p className="text-base sm:text-lg">{d.q}</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {d.options.map((o, i) => {
              const state =
                chosen === null ? "" : i === d.correct ? "border-success bg-success/10" : i === chosen ? "border-destructive bg-destructive/10" : "opacity-60";
              return (
                <button key={i} onClick={() => choose(i)} className={`rounded-lg border px-4 py-3 text-left transition-colors hover:bg-muted ${state}`}>
                  {o}
                </button>
              );
            })}
          </div>
          {chosen !== null && (
            <div className="space-y-3">
              <p className={`flex items-center gap-2 font-medium ${chosen === d.correct ? "text-success" : "text-destructive"}`}>
                {chosen === d.correct ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                {chosen === d.correct ? "Exact !" : "Pas tout à fait."}
              </p>
              <p className="rounded-md bg-muted p-3 text-sm">{d.explain}</p>
              <Button
                className="w-full sm:w-auto"
                onClick={() => {
                  setIdx((i) => i + 1);
                  setChosen(null);
                }}
              >
                Question suivante
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function Erreurs() {
  const [order, setOrder] = useState(() => shuffle(errorSentences));
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [checked, setChecked] = useState(false);
  const { progress, record } = useProgress();
  const tokens = useMemo(() => parseErrorSentence(order[idx % order.length]), [order, idx]);
  const errors = tokens.map((t, i) => (t.correction !== undefined ? i : -1)).filter((i) => i >= 0);
  const found = errors.filter((i) => selected.has(i)).length;
  const wrong = [...selected].filter((i) => tokens[i].correction === undefined).length;
  const s = progress.langue["Erreurs"];

  const toggle = (i: number) => {
    if (checked) return;
    setSelected((cur) => {
      const n = new Set(cur);
      if (n.has(i)) n.delete(i);
      else n.add(i);
      return n;
    });
  };

  const corrected = tokens
    .map((t) => (t.correction === undefined ? t.word : t.correction === "∅" ? "" : t.correction))
    .filter(Boolean)
    .join(" ")
    .replace(/ ([.,])/g, "$1");

  return (
    <Card>
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-lg">Repère les mots fautifs</CardTitle>
        <CardDescription>
          Comme à la présélection : touche les mots qui contiennent une erreur (orthographe, accord, conjugaison, homophone), puis valide.
          {s && ` Score : ${s.ok}/${s.total}.`}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 p-4 pt-0 sm:p-6 sm:pt-0">
        <div className="flex flex-wrap gap-x-1.5 gap-y-2 font-serif text-lg sm:text-xl leading-relaxed">
          {tokens.map((t, i) => {
            const isErr = t.correction !== undefined;
            const sel = selected.has(i);
            let cls = sel ? "bg-primary/15 ring-2 ring-primary" : "hover:bg-muted";
            if (checked) cls = isErr ? (sel ? "bg-success/20 ring-2 ring-success" : "ring-2 ring-warning bg-warning/15") : sel ? "bg-destructive/15 ring-2 ring-destructive line-through" : "";
            return (
              <button key={i} onClick={() => toggle(i)} className={`rounded px-1 transition-colors ${cls}`}>
                {t.word}
                {checked && isErr && (
                  <span className="ml-1 font-sans text-sm font-semibold text-success">→ {t.correction === "∅" ? "(supprimer)" : t.correction}</span>
                )}
              </button>
            );
          })}
        </div>
        {!checked ? (
          <Button
            className="w-full sm:w-auto"
            disabled={selected.size === 0}
            onClick={() => {
              setChecked(true);
              record("langue", "Erreurs", found === errors.length && wrong === 0);
            }}
          >
            Valider
          </Button>
        ) : (
          <div className="space-y-3">
            <p className={`font-medium ${found === errors.length && wrong === 0 ? "text-success" : "text-destructive"}`}>
              {found}/{errors.length} erreur{errors.length > 1 ? "s" : ""} trouvée{found > 1 ? "s" : ""}
              {wrong > 0 && ` · ${wrong} mot${wrong > 1 ? "s" : ""} correct${wrong > 1 ? "s" : ""} signalé${wrong > 1 ? "s" : ""} à tort`}
            </p>
            <p className="rounded-md bg-success/10 p-3 font-serif">{corrected}</p>
            <Button
              className="w-full sm:w-auto"
              onClick={() => {
                if ((idx + 1) % order.length === 0) setOrder(shuffle(errorSentences));
                setIdx((i) => i + 1);
                setSelected(new Set());
                setChecked(false);
              }}
            >
              Phrase suivante
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function TsqSection() {
  const [textId, setTextId] = useState(tsqTexts[0].id);
  const { progress } = useProgress();
  const text = tsqTexts.find((t) => t.id === textId)!;

  return (
    <Tabs defaultValue="textes" className="space-y-6">
      <TabsList className="grid h-auto w-full grid-cols-3 sm:inline-flex sm:w-auto">
        <TabsTrigger value="textes" className="whitespace-normal">Textes</TabsTrigger>
        <TabsTrigger value="langue" className="whitespace-normal">QCM de langue</TabsTrigger>
        <TabsTrigger value="erreurs" className="whitespace-normal">Erreurs</TabsTrigger>
      </TabsList>

      <TabsContent value="textes" className="space-y-4">
        <select
          value={textId}
          onChange={(e) => setTextId(e.target.value)}
          className="w-full rounded-md border bg-card px-3 py-2.5 text-sm md:hidden"
          aria-label="Choisir un texte"
        >
          {tsqTexts.map((t) => (
            <option key={t.id} value={t.id}>
              {progress.tsqDone.includes(t.id) ? "✓ " : ""}
              {t.title}
            </option>
          ))}
        </select>
        <div className="hidden flex-wrap gap-2 md:flex">
          {tsqTexts.map((t) => (
            <Button key={t.id} size="sm" variant={t.id === textId ? "default" : "outline"} onClick={() => setTextId(t.id)}>
              {progress.tsqDone.includes(t.id) && "✓ "}
              {t.title}
            </Button>
          ))}
        </div>
        <TsqReader key={text.id} text={text} />
      </TabsContent>

      <TabsContent value="langue">
        <Drills />
      </TabsContent>

      <TabsContent value="erreurs">
        <Erreurs />
      </TabsContent>
    </Tabs>
  );
}
