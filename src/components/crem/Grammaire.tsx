import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CheckCircle2, XCircle } from "lucide-react";
import { analyseGrammaticale, analyseLogique, fonctions, natures, normalize, participes, typesPropositions, type PPItem } from "@/data/grammaire";
import { useProgress } from "@/lib/progress";

const shuffle = <T,>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);
const optionsFor = (correct: string, pool: string[]) => shuffle([correct, ...shuffle(pool.filter((p) => p !== correct)).slice(0, 3)]);

/** Parcourt une liste mélangée, la remélange à chaque tour complet. */
function useDeck<T>(items: T[]) {
  const [deck, setDeck] = useState(() => shuffle(items));
  const [i, setI] = useState(0);
  return {
    item: deck[i % deck.length],
    pos: (i % deck.length) + 1,
    size: deck.length,
    next: () => {
      if ((i + 1) % deck.length === 0) setDeck(shuffle(items));
      setI((x) => x + 1);
    },
    reset: (list: T[]) => {
      setDeck(shuffle(list));
      setI(0);
    },
  };
}

function Choice({ label, options, correct, chosen, onChoose }: { label: string; options: string[]; correct: string; chosen: string | null; onChoose: (o: string) => void }) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold">{label}</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((o) => {
          const state = chosen === null ? "" : o === correct ? "border-success bg-success/10" : o === chosen ? "border-destructive bg-destructive/10" : "opacity-60";
          return (
            <button key={o} onClick={() => chosen === null && onChoose(o)} className={`rounded-lg border px-3 py-2.5 text-left text-sm transition-colors hover:bg-muted ${state}`}>
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Highlight({ phrase, cible }: { phrase: string; cible: string }) {
  const i = phrase.indexOf(cible);
  if (i < 0) return <>{phrase}</>;
  return (
    <>
      {phrase.slice(0, i)}
      <mark className="rounded bg-accent/30 px-1 font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-4">{cible}</mark>
      {phrase.slice(i + cible.length)}
    </>
  );
}

export function AnalyseGrammaticale() {
  const deck = useDeck(analyseGrammaticale);
  const it = deck.item;
  const [nat, setNat] = useState<string | null>(null);
  const [fct, setFct] = useState<string | null>(null);
  const natOpts = useMemo(() => optionsFor(it.nature, natures), [it]);
  const fctOpts = useMemo(() => (it.fonction ? optionsFor(it.fonction, fonctions) : []), [it]);
  const { progress, record } = useProgress();
  const done = nat !== null && (!it.fonction || fct !== null);
  const ok = nat === it.nature && (!it.fonction || fct === it.fonction);
  const s = progress.langue["Analyse grammaticale"];

  const answer = (n: string | null, f: string | null) => {
    if (n !== null && (!it.fonction || f !== null)) record("langue", "Analyse grammaticale", n === it.nature && (!it.fonction || f === it.fonction));
  };

  return (
    <Card>
      <CardHeader className="p-4 sm:p-6">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-lg">Analyse grammaticale</CardTitle>
          <span className="text-sm text-muted-foreground">
            {deck.pos}/{deck.size}
            {s && ` · ${s.ok}/${s.total}`}
          </span>
        </div>
        <CardDescription>Donne la nature et la fonction du mot ou du groupe souligné.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 p-4 pt-0 sm:p-6 sm:pt-0">
        <p className="font-serif text-lg sm:text-xl leading-relaxed">
          <Highlight phrase={it.phrase} cible={it.cible} />
        </p>
        <Choice label="Nature" options={natOpts} correct={it.nature} chosen={nat} onChoose={(o) => { setNat(o); answer(o, fct); }} />
        {it.fonction && <Choice label="Fonction" options={fctOpts} correct={it.fonction} chosen={fct} onChoose={(o) => { setFct(o); answer(nat, o); }} />}
        {done && (
          <div className="space-y-3">
            <p className={`flex items-center gap-2 font-medium ${ok ? "text-success" : "text-destructive"}`}>
              {ok ? <CheckCircle2 className="h-5 w-5 shrink-0" /> : <XCircle className="h-5 w-5 shrink-0" />}
              « {it.cible} » : {it.nature.toLowerCase()}
              {it.fonction && `, ${it.fonction}`}
            </p>
            <p className="rounded-md bg-muted p-3 text-sm">{it.explain}</p>
            <Button className="w-full sm:w-auto" onClick={() => { deck.next(); setNat(null); setFct(null); }}>
              Suivant
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function AnalyseLogique() {
  const deck = useDeck(analyseLogique);
  const it = deck.item;
  const [answers, setAnswers] = useState<string[]>(() => it.props.map(() => ""));
  const [checked, setChecked] = useState(false);
  const { progress, record } = useProgress();
  const s = progress.langue["Analyse logique"];
  const ok = it.props.every((p, i) => answers[i] === p.type);

  return (
    <Card>
      <CardHeader className="p-4 sm:p-6">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-lg">Analyse logique</CardTitle>
          <span className="text-sm text-muted-foreground">
            {deck.pos}/{deck.size}
            {s && ` · ${s.ok}/${s.total}`}
          </span>
        </div>
        <CardDescription>La phrase est découpée en propositions : donne la nature de chacune.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 p-4 pt-0 sm:p-6 sm:pt-0">
        <p className="font-serif text-lg sm:text-xl leading-relaxed">{it.phrase}</p>
        <p className="text-sm text-muted-foreground">
          {it.props.length} proposition{it.props.length > 1 ? "s" : ""} ({it.props.length} verbe{it.props.length > 1 ? "s" : ""} conjugué{it.props.length > 1 ? "s" : ""})
        </p>
        <div className="space-y-3">
          {it.props.map((p, i) => {
            const good = answers[i] === p.type;
            return (
              <div key={i} className={`space-y-2 rounded-lg border p-3 ${checked ? (good ? "border-success bg-success/10" : "border-destructive bg-destructive/10") : "bg-card"}`}>
                <p className="font-serif">« {p.text} »</p>
                <select
                  value={answers[i] ?? ""}
                  disabled={checked}
                  onChange={(e) => setAnswers((a) => a.map((x, j) => (j === i ? e.target.value : x)))}
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                  aria-label={`Nature de la proposition ${i + 1}`}
                >
                  <option value="">Choisir…</option>
                  {typesPropositions.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
                {checked && !good && <p className="text-sm font-medium text-success">→ {p.type}</p>}
              </div>
            );
          })}
        </div>
        {!checked ? (
          <Button
            className="w-full sm:w-auto"
            disabled={it.props.some((_, i) => !answers[i])}
            onClick={() => {
              setChecked(true);
              record("langue", "Analyse logique", ok);
            }}
          >
            Vérifier
          </Button>
        ) : (
          <div className="space-y-3">
            <p className={`flex items-center gap-2 font-medium ${ok ? "text-success" : "text-destructive"}`}>
              {ok ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
              {ok ? "Analyse correcte !" : "Revois les propositions en rouge."}
            </p>
            <p className="rounded-md bg-muted p-3 text-sm">{it.explain}</p>
            <Button
              className="w-full sm:w-auto"
              onClick={() => {
                deck.next();
                setChecked(false);
                setAnswers([]);
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

const ppCats: ("Tout" | PPItem["cat"])[] = ["Tout", "Avoir", "Être", "Pronominaux", "Cas particuliers"];

export function ParticipePasse() {
  const [cat, setCat] = useState<(typeof ppCats)[number]>("Tout");
  const deck = useDeck(participes);
  const it = deck.item;
  const [value, setValue] = useState("");
  const [result, setResult] = useState<boolean | null>(null);
  const { progress, record } = useProgress();
  const s = progress.langue["Participe passé (saisie)"];

  const check = () => {
    if (!value.trim() || result !== null) return;
    const ok = normalize(value) === normalize(it.answer);
    setResult(ok);
    record("langue", "Participe passé (saisie)", ok);
  };
  const next = () => {
    deck.next();
    setValue("");
    setResult(null);
  };

  return (
    <div className="space-y-4">
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {ppCats.map((c) => (
          <Button
            key={c}
            size="sm"
            className="shrink-0"
            variant={c === cat ? "default" : "outline"}
            onClick={() => {
              setCat(c);
              deck.reset(c === "Tout" ? participes : participes.filter((p) => p.cat === c));
              setValue("");
              setResult(null);
            }}
          >
            {c}
          </Button>
        ))}
      </div>
      <Card>
        <CardHeader className="p-4 sm:p-6">
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-lg">Accorde le participe passé</CardTitle>
            <span className="text-sm text-muted-foreground">
              {deck.pos}/{deck.size}
              {s && ` · ${s.ok}/${s.total}`}
            </span>
          </div>
          <CardDescription>Écris le participe passé du verbe entre parenthèses, correctement accordé.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-4 pt-0 sm:p-6 sm:pt-0">
          <Badge variant="secondary">{it.cat}</Badge>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (result === null) check();
              else next();
            }}
            className="space-y-4"
          >
            <p className="font-serif text-lg sm:text-xl leading-loose">
              {it.avant}{" "}
              <span className="inline-flex flex-wrap items-baseline gap-1 align-baseline">
                <Input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  disabled={result !== null}
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  className={`inline-flex h-9 w-36 font-sans text-base ${result === null ? "" : result ? "border-success" : "border-destructive"}`}
                  aria-label="Participe passé"
                />
                <span className="font-sans text-sm text-muted-foreground">({it.verbe})</span>
              </span>{" "}
              {it.apres}
            </p>
            {result === null ? (
              <Button type="submit" className="w-full sm:w-auto" disabled={!value.trim()}>
                Vérifier
              </Button>
            ) : (
              <div className="space-y-3">
                <p className={`flex items-center gap-2 font-medium ${result ? "text-success" : "text-destructive"}`}>
                  {result ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                  {result ? "Exact !" : `Réponse : ${it.answer}`}
                </p>
                <p className="rounded-md bg-muted p-3 text-sm">{it.explain}</p>
                <Button type="submit" className="w-full sm:w-auto">
                  Suivant
                </Button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
