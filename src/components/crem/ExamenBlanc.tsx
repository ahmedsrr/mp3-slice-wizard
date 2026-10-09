import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, FileText, PenLine } from "lucide-react";
import { generateOperation, generateProblem, type OpKind } from "@/data/maths";
import { tsqTexts } from "@/data/tsq";
import { subjects } from "@/data/dissertation";
import { useProgress } from "@/lib/progress";
import { ExerciseCard } from "./MathsSection";
import { TsqReader } from "./TsqSection";
import { Atelier } from "./DissertationSection";
import { Timer } from "./Timer";

const OPS: OpKind[] = ["+", "−", "×", "÷"];
const OP_NAMES: Record<OpKind, string> = { "+": "Addition", "−": "Soustraction", "×": "Multiplication", "÷": "Division" };
const PTS_OP = 2;
const PTS_PB = 12;

function MathsExam({ onQuit }: { onQuit: () => void }) {
  const [ops] = useState(() => OPS.map((op) => generateOperation(op)));
  const [pb] = useState(generateProblem);
  const [opRes, setOpRes] = useState<Record<number, boolean>>({});
  const [pbRes, setPbRes] = useState<Record<number, boolean>>({});
  const { record } = useProgress();
  const total = ops.length + pb.parts.length;
  const answered = Object.keys(opRes).length + Object.keys(pbRes).length;
  const ptsPart = PTS_PB / pb.parts.length;
  const note =
    Object.values(opRes).filter(Boolean).length * PTS_OP + Object.values(pbRes).filter(Boolean).length * ptsPart;

  return (
    <div className="space-y-6">
      <div className="sticky top-14 z-10 -mx-4 flex items-center justify-between gap-2 border-b bg-background/95 px-4 py-2 backdrop-blur sm:mx-0 sm:rounded-lg sm:border">
        <Timer minutes={60} />
        <span className="text-sm font-medium sm:text-base">
          {answered}/{total}
          {answered === total && ` · ${Math.round(note * 10) / 10}/20`}
        </span>
        <Button variant="ghost" size="sm" onClick={onQuit}>
          Quitter
        </Button>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">
          Partie A — Opérations <span className="text-sm font-normal text-muted-foreground">({OPS.length * PTS_OP} pts)</span>
        </h2>
        <p className="text-sm text-muted-foreground">Pose chaque opération sur ton brouillon, puis saisis le résultat.</p>
        <div className="grid gap-4 md:grid-cols-2">
          {ops.map((ex, i) => (
            <ExerciseCard
              key={i}
              label={`${i + 1}. ${OP_NAMES[OPS[i]]} · ${PTS_OP} pts`}
              ex={ex}
              noHint
              onAnswered={(r) => {
                setOpRes((s) => ({ ...s, [i]: r }));
                record("maths", "quatre-operations", r);
              }}
            />
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">
          Partie B — Problème <span className="text-sm font-normal text-muted-foreground">({PTS_PB} pts)</span>
        </h2>
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="font-serif text-xl">{pb.title}</CardTitle>
            <CardDescription className="text-base text-foreground leading-relaxed">{pb.context}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 p-4 pt-0 sm:p-6 sm:pt-0">
            {pb.parts.map((part, i) => (
              <div key={i} className="border-t pt-4">
                <span className="text-sm font-semibold text-primary">
                  Question {i + 1} · {Math.round(ptsPart * 10) / 10} pts
                </span>
                <ExerciseCard
                  bare
                  noHint
                  ex={part}
                  onAnswered={(r) => {
                    setPbRes((s) => ({ ...s, [i]: r }));
                    record("maths", "problemes", r);
                  }}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      {answered === total && (
        <p className="rounded-lg bg-primary/10 p-4 text-lg font-semibold">Note finale : {Math.round(note * 10) / 10}/20</p>
      )}
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
    { id: "maths" as const, icon: Calculator, title: "Mathématiques", time: "1 h", desc: "4 opérations à poser (addition, soustraction, multiplication, division) et un problème à plusieurs questions. Note sur 20." },
  ];

  return (
    <div className="space-y-6">
      <p className="text-muted-foreground max-w-2xl">
        Mets-toi en conditions réelles : téléphone éteint, brouillon à côté, et ne regarde pas les corrigés avant la fin du chrono.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
