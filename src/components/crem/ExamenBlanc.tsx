import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, FileText, PenLine } from "lucide-react";
import { generateExercise, mathTopics } from "@/data/maths";
import { tsqTexts } from "@/data/tsq";
import { subjects } from "@/data/dissertation";
import { useProgress } from "@/lib/progress";
import { ExerciseCard } from "./MathsSection";
import { TsqReader } from "./TsqSection";
import { Atelier } from "./DissertationSection";
import { Timer } from "./Timer";

const N = 8;

function MathsExam({ onQuit }: { onQuit: () => void }) {
  const [exos] = useState(() => {
    const ids = [...mathTopics].sort(() => Math.random() - 0.5).slice(0, N).map((t) => t.id);
    return ids.map((id) => generateExercise(id));
  });
  const [results, setResults] = useState<Record<number, boolean>>({});
  const { record } = useProgress();
  const answered = Object.keys(results).length;
  const ok = Object.values(results).filter(Boolean).length;

  return (
    <div className="space-y-4">
      <div className="sticky top-16 z-10 flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-background/95 p-3 backdrop-blur">
        <Timer minutes={60} />
        <span className="font-medium">
          {answered}/{N} répondus{answered === N && ` · Note : ${Math.round((ok / N) * 20 * 10) / 10}/20`}
        </span>
        <Button variant="ghost" onClick={onQuit}>
          Quitter
        </Button>
      </div>
      {exos.map((e, i) => (
        <ExerciseCard
          key={i}
          topicId={e.topic.id}
          ex={e.ex}
          onAnswered={(r) => {
            setResults((s) => ({ ...s, [i]: r }));
            record("maths", e.topic.id, r);
          }}
        />
      ))}
    </div>
  );
}

export function ExamenBlanc() {
  const [mode, setMode] = useState<null | "maths" | "tsq" | "diss">(null);
  const [seed, setSeed] = useState(0);
  const text = tsqTexts[seed % tsqTexts.length];
  const subject = subjects[seed % subjects.length];

  const start = (m: "maths" | "tsq" | "diss") => {
    setSeed(Math.floor(Math.random() * 1000));
    setMode(m);
    window.scrollTo({ top: 0 });
  };

  if (mode === "maths") return <MathsExam onQuit={() => setMode(null)} />;
  if (mode === "tsq" || mode === "diss")
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={() => setMode(null)}>
          ← Retour au choix de l'épreuve
        </Button>
        {mode === "tsq" ? <TsqReader key={text.id} text={text} /> : <Atelier key={subject.id} subject={subject} />}
      </div>
    );

  const cards = [
    { id: "diss" as const, icon: PenLine, title: "Dissertation", time: "3 h", desc: "Un sujet tiré au hasard, chrono de 3 heures, éditeur avec sauvegarde et grille d'auto-évaluation." },
    { id: "tsq" as const, icon: FileText, title: "Texte suivi de questions", time: "1 h", desc: "Un texte inédit : compréhension, vocabulaire, grammaire, conjugaison et production écrite, avec corrigé." },
    { id: "maths" as const, icon: Calculator, title: "Mathématiques", time: "1 h", desc: `${N} problèmes de thèmes différents, corrigés automatiquement, note sur 20.` },
  ];

  return (
    <div className="space-y-6">
      <p className="text-muted-foreground max-w-2xl">
        Mets-toi en conditions réelles : téléphone éteint, brouillon à côté, et ne regarde pas les corrigés avant la fin du chrono.
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((c) => (
          <Card key={c.id} className="flex flex-col">
            <CardHeader>
              <c.icon className="h-8 w-8 text-primary" />
              <CardTitle>{c.title}</CardTitle>
              <CardDescription>Durée : {c.time}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col justify-between gap-4">
              <p className="text-sm text-muted-foreground">{c.desc}</p>
              <Button onClick={() => start(c.id)}>Commencer</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
