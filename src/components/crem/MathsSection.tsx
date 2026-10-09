import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Lightbulb, Shuffle, XCircle, AlertTriangle } from "lucide-react";
import { generateExercise, mathTopics, type MathExercise } from "@/data/maths";
import { fmt, isClose, parseAnswer, useProgress } from "@/lib/progress";

export function ExerciseCard({
  topicId,
  ex,
  onAnswered,
  onNext,
}: {
  topicId: string;
  ex: MathExercise;
  onAnswered?: (ok: boolean) => void;
  onNext?: () => void;
}) {
  const [value, setValue] = useState("");
  const [result, setResult] = useState<null | boolean>(null);
  const [showSteps, setShowSteps] = useState(false);
  const title = mathTopics.find((t) => t.id === topicId)?.title;

  const check = () => {
    const n = parseAnswer(value);
    if (n === null || result !== null) return;
    const ok = isClose(n, ex.answer);
    setResult(ok);
    setShowSteps(true);
    onAnswered?.(ok);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <Badge variant="secondary" className="w-fit">{title}</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-lg leading-relaxed">{ex.statement}</p>
        <form
          className="flex flex-wrap items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (result === null) check();
            else onNext?.();
          }}
        >
          <Input
            inputMode="decimal"
            placeholder="Ta réponse"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={result !== null}
            className="w-44"
            autoFocus
          />
          {ex.unit && <span className="text-muted-foreground">{ex.unit}</span>}
          {result === null ? (
            <>
              <Button type="submit">Vérifier</Button>
              <Button type="button" variant="ghost" onClick={() => setShowSteps((s) => !s)}>
                <Lightbulb className="h-4 w-4 mr-1" /> Solution
              </Button>
            </>
          ) : (
            onNext && <Button type="submit">Exercice suivant</Button>
          )}
        </form>
        {result !== null && (
          <div className={`flex items-center gap-2 font-medium ${result ? "text-success" : "text-destructive"}`}>
            {result ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
            {result ? "Bonne réponse !" : `Réponse attendue : ${fmt(ex.answer, 3)} ${ex.unit}`}
          </div>
        )}
        {showSteps && (
          <ol className="rounded-lg bg-muted p-4 space-y-1 list-decimal list-inside text-sm">
            {ex.steps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        )}
      </CardContent>
    </Card>
  );
}

export function MathsSection() {
  const [topicId, setTopicId] = useState<string>(mathTopics[0].id);
  const [mode, setMode] = useState<"fiche" | "exo">("fiche");
  const [mix, setMix] = useState(false);
  const [current, setCurrent] = useState(() => generateExercise(mathTopics[0].id));
  const [key, setKey] = useState(0);
  const { progress, record } = useProgress();
  const topic = mathTopics.find((t) => t.id === topicId)!;

  const next = (id = topicId, mixed = mix) => {
    setCurrent(generateExercise(mixed ? undefined : id));
    setKey((k) => k + 1);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      <aside className="space-y-2">
        <Button
          variant={mix ? "default" : "outline"}
          className="w-full justify-start"
          onClick={() => {
            setMix(true);
            setMode("exo");
            next(topicId, true);
          }}
        >
          <Shuffle className="h-4 w-4 mr-2" /> Entraînement mélangé
        </Button>
        <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
          {mathTopics.map((t) => {
            const s = progress.maths[t.id];
            return (
              <button
                key={t.id}
                onClick={() => {
                  setTopicId(t.id);
                  setMix(false);
                  next(t.id, false);
                }}
                className={`shrink-0 rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                  !mix && t.id === topicId ? "border-primary bg-primary/10 font-medium" : "hover:bg-muted"
                }`}
              >
                <div>{t.title}</div>
                {s && (
                  <div className="text-xs text-muted-foreground">
                    {s.ok}/{s.total} réussis
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </aside>

      <section className="space-y-4 min-w-0">
        {!mix && (
          <div className="flex gap-2">
            <Button variant={mode === "fiche" ? "default" : "outline"} onClick={() => setMode("fiche")}>
              Fiche de cours
            </Button>
            <Button variant={mode === "exo" ? "default" : "outline"} onClick={() => setMode("exo")}>
              Exercices illimités
            </Button>
          </div>
        )}

        {mode === "fiche" && !mix ? (
          <Card>
            <CardHeader>
              <CardTitle>{topic.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <p className="leading-relaxed">{topic.fiche.rule}</p>
              <div>
                <h4 className="font-semibold mb-2">À retenir</h4>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {topic.fiche.formulas.map((f) => (
                    <li key={f} className="rounded-md border bg-card px-3 py-2 font-mono text-sm">
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg bg-primary/10 p-4">
                <span className="font-semibold">Exemple : </span>
                {topic.fiche.example}
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-warning" /> Pièges fréquents
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  {topic.fiche.pieges.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
              <Button onClick={() => setMode("exo")}>S'entraîner sur ce thème</Button>
            </CardContent>
          </Card>
        ) : (
          <ExerciseCard
            key={key}
            topicId={current.topic.id}
            ex={current.ex}
            onAnswered={(ok) => record("maths", current.topic.id, ok)}
            onNext={() => next()}
          />
        )}
        <p className="text-xs text-muted-foreground">
          Astuce : tu peux écrire les décimaux avec une virgule (12,5). Les énoncés sont générés aléatoirement, au niveau CM2 / 3e attendu au concours.
        </p>
      </section>
    </div>
  );
}
