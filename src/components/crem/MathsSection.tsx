import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Lightbulb, RefreshCw, XCircle } from "lucide-react";
import { generateExercise, generateProblem, hm, mathTopics, type MathExercise } from "@/data/maths";
import { fmt, isClose, parseAnswer, parseTime, useProgress } from "@/lib/progress";

const expected = (ex: MathExercise) => (ex.kind === "time" ? hm(ex.answer) : `${fmt(ex.answer, 4)} ${ex.unit}`);

export function ExerciseCard({
  label,
  ex,
  onAnswered,
  onNext,
  autoFocus = false,
  bare = false,
  noHint = false,
}: {
  label?: string;
  ex: MathExercise;
  onAnswered?: (ok: boolean) => void;
  onNext?: () => void;
  autoFocus?: boolean;
  bare?: boolean;
  noHint?: boolean;
}) {
  const [value, setValue] = useState("");
  const [result, setResult] = useState<null | boolean>(null);
  const [showSteps, setShowSteps] = useState(false);
  const isTime = ex.kind === "time";

  const check = () => {
    const n = isTime ? parseTime(value) : parseAnswer(value);
    if (n === null || result !== null) return;
    const ok = isTime ? n === ex.answer : isClose(n, ex.answer);
    setResult(ok);
    setShowSteps(true);
    onAnswered?.(ok);
  };

  const body = (
    <div className="space-y-3">
      <p className="text-base sm:text-lg leading-relaxed">{ex.statement}</p>
      <form
        className="flex flex-wrap items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (result === null) check();
          else onNext?.();
        }}
      >
        <div className="flex flex-1 items-center gap-2 min-w-[10rem] sm:flex-none">
          <Input
            inputMode={isTime ? "text" : "decimal"}
            placeholder={isTime ? "ex. 14h30" : "Ta réponse"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={result !== null}
            className="w-full sm:w-44"
            autoFocus={autoFocus}
          />
          {ex.unit && <span className="shrink-0 text-muted-foreground">{ex.unit}</span>}
        </div>
        {result === null ? (
          <div className="flex gap-2">
            <Button type="submit">Vérifier</Button>
            {!noHint && (
              <Button type="button" variant="ghost" onClick={() => setShowSteps((s) => !s)}>
                <Lightbulb className="h-4 w-4 sm:mr-1" />
                <span className="hidden sm:inline">Solution</span>
              </Button>
            )}
          </div>
        ) : (
          onNext && <Button type="submit">Suivant</Button>
        )}
      </form>
      {result !== null && (
        <div className={`flex items-center gap-2 font-medium ${result ? "text-success" : "text-destructive"}`}>
          {result ? <CheckCircle2 className="h-5 w-5 shrink-0" /> : <XCircle className="h-5 w-5 shrink-0" />}
          {result ? "Bonne réponse !" : `Réponse attendue : ${expected(ex)}`}
        </div>
      )}
      {showSteps && (
        <ol className="rounded-lg bg-muted p-3 sm:p-4 space-y-1 list-decimal list-inside text-sm break-words">
          {ex.steps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      )}
    </div>
  );

  if (bare) return body;
  return (
    <Card>
      <CardContent className="space-y-3 p-4 sm:p-6">
        {label && (
          <Badge variant="secondary" className="w-fit">
            {label}
          </Badge>
        )}
        {body}
      </CardContent>
    </Card>
  );
}

const titleOf = (id: string) => mathTopics.find((t) => t.id === id)?.title;

function ParTheme() {
  const [topicId, setTopicId] = useState<string>("mix");
  const [current, setCurrent] = useState(() => generateExercise());
  const [key, setKey] = useState(0);
  const { progress, record } = useProgress();

  const next = (id = topicId) => {
    setCurrent(generateExercise(id === "mix" ? undefined : id));
    setKey((k) => k + 1);
  };
  const choose = (id: string) => {
    setTopicId(id);
    next(id);
  };
  const options = [{ id: "mix", title: "Tous les thèmes (mélange)" }, ...mathTopics];

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
      <aside className="min-w-0">
        <select
          value={topicId}
          onChange={(e) => choose(e.target.value)}
          className="w-full rounded-md border bg-card px-3 py-2.5 text-sm lg:hidden"
          aria-label="Thème"
        >
          {options.map((t) => (
            <option key={t.id} value={t.id}>
              {t.title}
            </option>
          ))}
        </select>
        <div className="hidden lg:flex lg:flex-col lg:gap-2">
          {options.map((t) => {
            const s = progress.maths[t.id];
            return (
              <button
                key={t.id}
                onClick={() => choose(t.id)}
                className={`rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                  t.id === topicId ? "border-primary bg-primary/10 font-medium" : "hover:bg-muted"
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
      <section className="min-w-0 space-y-3">
        <ExerciseCard
          key={key}
          label={titleOf(current.topic.id)}
          ex={current.ex}
          autoFocus
          onAnswered={(ok) => record("maths", current.topic.id, ok)}
          onNext={() => next()}
        />
        <p className="text-xs text-muted-foreground">
          Décimaux avec une virgule (12,5) ; heures au format 14h30. Les énoncés sont générés à l'infini.
        </p>
      </section>
    </div>
  );
}

function ProblemesComplets() {
  const [pb, setPb] = useState(generateProblem);
  const [key, setKey] = useState(0);
  const [results, setResults] = useState<Record<number, boolean>>({});
  const { record } = useProgress();
  const done = Object.keys(results).length;
  const ok = Object.values(results).filter(Boolean).length;

  return (
    <Card>
      <CardHeader className="p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle className="font-serif text-xl">{pb.title}</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setPb(generateProblem());
              setResults({});
              setKey((k) => k + 1);
            }}
          >
            <RefreshCw className="h-4 w-4 mr-1" /> Nouveau problème
          </Button>
        </div>
        <CardDescription className="text-base text-foreground leading-relaxed pt-2">{pb.context}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 p-4 pt-0 sm:p-6 sm:pt-0" key={key}>
        {pb.parts.map((part, i) => (
          <div key={i} className="border-t pt-4">
            <span className="text-sm font-semibold text-primary">Question {i + 1}</span>
            <ExerciseCard
              bare
              ex={part}
              onAnswered={(r) => {
                setResults((s) => ({ ...s, [i]: r }));
                record("maths", "problemes", r);
              }}
            />
          </div>
        ))}
        {done === pb.parts.length && (
          <p className="rounded-lg bg-primary/10 p-3 font-medium">
            Score : {ok}/{pb.parts.length}. {ok === pb.parts.length ? "Parfait !" : "Relis les solutions des questions ratées."}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export function MathsSection() {
  return (
    <Tabs defaultValue="themes" className="space-y-6">
      <TabsList className="grid w-full grid-cols-2 sm:inline-flex sm:w-auto">
        <TabsTrigger value="themes">Exercices par thème</TabsTrigger>
        <TabsTrigger value="problemes">Problèmes complets</TabsTrigger>
      </TabsList>
      <TabsContent value="themes">
        <ParTheme />
      </TabsContent>
      <TabsContent value="problemes">
        <ProblemesComplets />
      </TabsContent>
    </Tabs>
  );
}
