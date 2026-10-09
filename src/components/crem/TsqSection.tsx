import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle2, Eye, XCircle } from "lucide-react";
import { drills, grammarSheets, tsqMethod, tsqTexts, type TsqText } from "@/data/tsq";
import { useLocalText, useProgress } from "@/lib/progress";
import { Timer } from "./Timer";

function QuestionBlock({ textId, index, q }: { textId: string; index: number; q: TsqText["questions"][number] }) {
  const [answer, setAnswer] = useLocalText(`crem-tsq-${textId}-${index}`);
  const [show, setShow] = useState(false);
  return (
    <div className="space-y-2 rounded-lg border p-4">
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

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <Card className="xl:sticky xl:top-20 xl:self-start xl:max-h-[calc(100vh-6rem)] xl:overflow-auto">
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <CardTitle className="font-serif text-2xl">{text.title}</CardTitle>
            {withTimer && <Timer minutes={60} />}
          </div>
          <CardDescription>{text.source}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="font-serif text-[1.05rem] leading-8 space-y-4">
            {text.text.split("\n\n").map((p, i) => (
              <p key={i} className="indent-6">
                {p}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="space-y-6">
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
  );
}

function Drills() {
  const cats = [...new Set(drills.map((d) => d.cat))];
  const [cat, setCat] = useState<string>("Tout");
  const pool = cat === "Tout" ? drills : drills.filter((d) => d.cat === cat);
  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const { progress, record } = useProgress();
  const d = pool[idx % pool.length];

  const choose = (i: number) => {
    if (chosen !== null) return;
    setChosen(i);
    record("langue", d.cat, i === d.correct);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {["Tout", ...cats].map((c) => {
          const s = progress.langue[c];
          return (
            <Button
              key={c}
              size="sm"
              variant={c === cat ? "default" : "outline"}
              onClick={() => {
                setCat(c);
                setIdx(0);
                setChosen(null);
              }}
            >
              {c}
              {s && <span className="ml-1 opacity-70">({s.ok}/{s.total})</span>}
            </Button>
          );
        })}
      </div>
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <Badge variant="secondary">{d.cat}</Badge>
            <span className="text-sm text-muted-foreground">
              {(idx % pool.length) + 1} / {pool.length}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg">{d.q}</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {d.options.map((o, i) => {
              const state = chosen === null ? "" : i === d.correct ? "border-success bg-success/10" : i === chosen ? "border-destructive bg-destructive/10" : "opacity-60";
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

export function TsqSection() {
  const [textId, setTextId] = useState(tsqTexts[0].id);
  const { progress } = useProgress();
  const text = tsqTexts.find((t) => t.id === textId)!;

  return (
    <Tabs defaultValue="textes" className="space-y-6">
      <TabsList className="flex-wrap h-auto">
        <TabsTrigger value="textes">Textes à étudier</TabsTrigger>
        <TabsTrigger value="langue">Exercices de langue</TabsTrigger>
        <TabsTrigger value="fiches">Fiches de grammaire</TabsTrigger>
        <TabsTrigger value="methode">Méthode</TabsTrigger>
      </TabsList>

      <TabsContent value="textes" className="space-y-6">
        <div className="flex flex-wrap gap-2">
          {tsqTexts.map((t) => (
            <Button key={t.id} variant={t.id === textId ? "default" : "outline"} onClick={() => setTextId(t.id)}>
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

      <TabsContent value="fiches">
        <Accordion type="multiple" className="rounded-lg border bg-card px-4">
          {grammarSheets.map((s) => (
            <AccordionItem key={s.title} value={s.title}>
              <AccordionTrigger className="text-base">{s.title}</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc list-inside space-y-2 leading-relaxed">
                  {s.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </TabsContent>

      <TabsContent value="methode">
        <div className="grid gap-4 md:grid-cols-2">
          {tsqMethod.map((m) => (
            <Card key={m.title}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{m.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground leading-relaxed">{m.body}</CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
