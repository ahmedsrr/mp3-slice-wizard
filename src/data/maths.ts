import { fmt } from "@/lib/progress";

export type MathExercise = {
  statement: string;
  answer: number;
  unit: string;
  steps: string[];
  /** "time" : réponse en minutes depuis minuit, saisie au format 14h30 */
  kind?: "time";
};

export type MathProblem = {
  id: string;
  title: string;
  context: string;
  parts: MathExercise[];
};

export type MathTopic = {
  id: string;
  title: string;
  generate: () => MathExercise;
};

const rnd = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const round = (n: number, d = 2) => Math.round(n * 10 ** d) / 10 ** d;
const F = (n: number) => `${fmt(n)} F`;
const prenoms = ["Awa", "Moussa", "Fatou", "Ousmane", "Aminata", "Ibrahima", "Khady", "Mamadou", "Ndèye", "Cheikh", "Mariama", "Abdou"];
export const hm = (min: number) => `${Math.floor(min / 60) % 24} h ${String(min % 60).padStart(2, "0")}`;
const dur = (min: number) => (min >= 60 ? `${Math.floor(min / 60)} h${min % 60 ? ` ${String(min % 60).padStart(2, "0")} min` : ""}` : `${min} min`);
const villes: [string, string][] = [
  ["Dakar", "Thiès"],
  ["Kaolack", "Fatick"],
  ["Saint-Louis", "Louga"],
  ["Ziguinchor", "Kolda"],
  ["Tambacounda", "Kédougou"],
  ["Diourbel", "Touba"],
];

export const mathTopics: MathTopic[] = [
  {
    id: "operations",
    title: "Opérations & décimaux",
    generate: () => {
      const kind = rnd(0, 3);
      if (kind === 0) {
        const a = round(rnd(100, 9999) / 100), b = round(rnd(10, 999) / 10);
        return { statement: `Calcule : ${fmt(a)} + ${fmt(b)}`, answer: round(a + b), unit: "", steps: [`On aligne les virgules : ${fmt(a)} + ${fmt(b)} = ${fmt(round(a + b))}`] };
      }
      if (kind === 1) {
        const a = round(rnd(10, 99) / 10), b = round(rnd(2, 40) / 10);
        return { statement: `Calcule : ${fmt(a)} × ${fmt(b)}`, answer: round(a * b, 3), unit: "", steps: [`${fmt(a * 10)} × ${fmt(b * 10)} = ${fmt(round(a * b * 100))}`, `2 chiffres après la virgule au total → ${fmt(round(a * b, 3), 3)}`] };
      }
      if (kind === 2) {
        const b = pick([0.5, 0.25, 0.2, 1.5, 2.5]), q = rnd(4, 60);
        const a = round(b * q);
        return { statement: `Calcule : ${fmt(a)} ÷ ${fmt(b)}`, answer: q, unit: "", steps: [`On multiplie les deux nombres par 100 : ${fmt(a * 100)} ÷ ${fmt(b * 100)}`, `= ${q}`] };
      }
      const a = rnd(2, 9), b = rnd(2, 9), c = rnd(10, 50), d = rnd(2, 6);
      return {
        statement: `Calcule en respectant les priorités : ${c} + ${a} × ${b} − ${d * b} ÷ ${d}`,
        answer: c + a * b - b,
        unit: "",
        steps: [`${a} × ${b} = ${a * b} et ${d * b} ÷ ${d} = ${b}`, `${c} + ${a * b} − ${b} = ${c + a * b - b}`],
      };
    },
  },
  {
    id: "fractions",
    title: "Fractions",
    generate: () => {
      const kind = rnd(0, 2);
      if (kind === 0) {
        const b = pick([3, 4, 5, 6, 8, 10]), a = rnd(1, b - 1), q = b * rnd(20, 300);
        return { statement: `Calcule les ${a}/${b} de ${fmt(q)}.`, answer: (q / b) * a, unit: "", steps: [`${fmt(q)} ÷ ${b} = ${fmt(q / b)}`, `${fmt(q / b)} × ${a} = ${fmt((q / b) * a)}`] };
      }
      if (kind === 1) {
        const total = 12 * rnd(5, 60) * 100;
        const p = pick(prenoms);
        const r1 = total / 3, r2 = ((total - r1) * 1) / 4, rest = total - r1 - r2;
        return {
          statement: `${p} reçoit ${F(total)}. ${p} dépense le 1/3 pour la nourriture, puis le 1/4 du reste pour le transport. Combien reste-t-il ?`,
          answer: rest,
          unit: "F",
          steps: [`Nourriture : ${F(total)} ÷ 3 = ${F(r1)}`, `Reste : ${F(total - r1)} ; transport : ${F(total - r1)} ÷ 4 = ${F(r2)}`, `Il reste ${F(total - r1)} − ${F(r2)} = ${F(rest)}`],
        };
      }
      const b = pick([4, 5, 8]), a = rnd(1, b - 1), unit = rnd(10, 90);
      const r = unit * a, q = unit * b;
      return {
        statement: `Les ${a}/${b} d'un champ représentent ${fmt(r)} m². Quelle est la superficie totale du champ ?`,
        answer: q,
        unit: "m²",
        steps: [`1/${b} du champ = ${fmt(r)} ÷ ${a} = ${fmt(unit)} m²`, `Champ entier = ${fmt(unit)} × ${b} = ${fmt(q)} m²`],
      };
    },
  },
  {
    id: "pourcentages",
    title: "Pourcentages",
    generate: () => {
      const kind = rnd(0, 3);
      const objets = ["un pagne", "un sac de riz", "une bicyclette", "un téléphone", "une machine à coudre", "un mouton"];
      if (kind === 0) {
        const p = rnd(10, 200) * 500, t = pick([5, 10, 15, 20, 25, 30]);
        const res = (p * (100 - t)) / 100;
        const o = pick(objets);
        return { statement: `${o[0].toUpperCase()}${o.slice(1)} coûte ${F(p)}. Le commerçant accorde une remise de ${t} %. Quel est le prix payé ?`, answer: res, unit: "F", steps: [`Remise = ${F(p)} × ${t} ÷ 100 = ${F((p * t) / 100)}`, `Prix payé = ${F(p)} − ${F((p * t) / 100)} = ${F(res)}`] };
      }
      if (kind === 1) {
        const total = rnd(2, 12) * 50, t = pick([10, 20, 30, 40, 60, 70, 80]);
        const filles = (total * t) / 100;
        return { statement: `Une école compte ${total} élèves dont ${t} % de filles. Combien y a-t-il de garçons ?`, answer: total - filles, unit: "élèves", steps: [`Filles : ${total} × ${t} ÷ 100 = ${fmt(filles)}`, `Garçons : ${total} − ${fmt(filles)} = ${fmt(total - filles)}`] };
      }
      if (kind === 2) {
        const total = pick([40, 80, 120, 200, 240, 400]), t = pick([5, 10, 15, 20, 25, 35, 45, 60, 75, 85]);
        const part = (total * t) / 100;
        return { statement: `Sur ${total} candidats, ${fmt(part)} ont été admis. Quel est le pourcentage d'admis ?`, answer: t, unit: "%", steps: [`Taux = ${fmt(part)} ÷ ${total} × 100 = ${t} %`] };
      }
      const t = pick([10, 20, 25, 40]), init = rnd(4, 80) * 1000;
      const red = (init * (100 - t)) / 100;
      return { statement: `Après une remise de ${t} %, ${pick(objets)} est vendu(e) ${F(red)}. Quel était son prix initial ?`, answer: init, unit: "F", steps: [`Le prix réduit représente ${100 - t} % du prix initial`, `Prix initial = ${F(red)} × 100 ÷ ${100 - t} = ${F(init)}`] };
    },
  },
  {
    id: "proportionnalite",
    title: "Proportionnalité & règle de trois",
    generate: () => {
      if (rnd(0, 2) > 0) {
        const pu = rnd(3, 120) * 25, a = rnd(2, 9), b = rnd(3, 15);
        const produits = ["kg de riz", "litres d'huile", "kg de sucre", "mètres de tissu", "cahiers"];
        const prod = pick(produits);
        return { statement: `${a} ${prod} coûtent ${F(pu * a)}. Combien coûtent ${b} ${prod} ?`, answer: pu * b, unit: "F", steps: [`Prix unitaire : ${F(pu * a)} ÷ ${a} = ${F(pu)}`, `${b} × ${F(pu)} = ${F(pu * b)}`] };
      }
      const n1 = pick([4, 6, 8, 10, 12]), j1 = pick([6, 9, 12, 15, 18]);
      const n2 = pick([2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 30].filter((x) => x !== n1 && (n1 * j1) % x === 0));
      return {
        statement: `${n1} maçons construisent un mur en ${j1} jours. En combien de jours ${n2} maçons (travaillant au même rythme) le construiraient-ils ?`,
        answer: (n1 * j1) / n2,
        unit: "jours",
        steps: [`Situation inversement proportionnelle : travail total = ${n1} × ${j1} = ${n1 * j1} journées-maçon`, `${n1 * j1} ÷ ${n2} = ${fmt((n1 * j1) / n2)} jours`],
      };
    },
  },
  {
    id: "vitesse",
    title: "Vitesse, distance, durée",
    generate: () => {
      const [A, B] = pick(villes);
      const kind = rnd(0, 2);
      if (kind === 0) {
        const v = pick([40, 50, 60, 75, 80, 90]), min = pick([30, 45, 60, 75, 90, 105, 120, 144, 150, 180]);
        const d = (v * min) / 60;
        const h = Math.floor(min / 60), m = min % 60;
        return { statement: `Un car part de ${A} et roule à ${v} km/h de moyenne pendant ${h ? `${h} h ` : ""}${m ? `${m} min` : ""}. Quelle distance parcourt-il ?`, answer: d, unit: "km", steps: [`Durée = ${fmt(min / 60)} h`, `d = ${v} × ${fmt(min / 60)} = ${fmt(d)} km`] };
      }
      if (kind === 1) {
        const v = pick([45, 50, 60, 72, 80, 90]), t = pick([1.5, 2, 2.5, 3, 4]);
        const d = v * t;
        return { statement: `Un taxi parcourt ${fmt(d)} km entre ${A} et ${B} (distance fictive) en ${fmt(Math.floor(t))} h${t % 1 ? " 30 min" : ""}. Quelle est sa vitesse moyenne ?`, answer: v, unit: "km/h", steps: [`Durée = ${fmt(t)} h`, `v = ${fmt(d)} ÷ ${fmt(t)} = ${v} km/h`] };
      }
      const v1 = pick([40, 50, 60]), v2 = pick([60, 70, 80, 90]), t = pick([1, 1.5, 2, 2.5]);
      const d = (v1 + v2) * t;
      return {
        statement: `${A} et ${B} sont distantes de ${fmt(d)} km (trajet fictif). Un motocycliste part de ${A} à ${v1} km/h et, au même moment, une voiture part de ${B} à ${v2} km/h en sens inverse. Au bout de combien de minutes se rencontrent-ils ?`,
        answer: t * 60,
        unit: "min",
        steps: [`Ils se rapprochent de ${v1} + ${v2} = ${v1 + v2} km par heure`, `t = ${fmt(d)} ÷ ${v1 + v2} = ${fmt(t)} h = ${fmt(t * 60)} min`],
      };
    },
  },
  {
    id: "mesures",
    title: "Conversions de mesures",
    generate: () => {
      const items: (() => MathExercise)[] = [
        () => { const a = round(rnd(1, 500) / 100); return { statement: `Convertis ${fmt(a)} km en m.`, answer: round(a * 1000), unit: "m", steps: [`1 km = 1 000 m → ${fmt(a)} × 1 000 = ${fmt(a * 1000)} m`] }; },
        () => { const a = round(rnd(1, 90) / 10); return { statement: `Convertis ${fmt(a)} ha en m².`, answer: round(a * 10000), unit: "m²", steps: [`1 ha = 10 000 m² → ${fmt(a)} × 10 000 = ${fmt(a * 10000)} m²`] }; },
        () => { const a = round(rnd(1, 90) / 10); return { statement: `Convertis ${fmt(a)} m³ en litres.`, answer: round(a * 1000), unit: "L", steps: [`1 m³ = 1 000 dm³ = 1 000 L → ${fmt(a * 1000)} L`] }; },
        () => { const a = rnd(5, 950) * 10; return { statement: `Convertis ${fmt(a)} cL en L.`, answer: a / 100, unit: "L", steps: [`1 L = 100 cL → ${fmt(a)} ÷ 100 = ${fmt(a / 100)} L`] }; },
        () => { const a = round(rnd(1, 60) / 10); return { statement: `Convertis ${fmt(a)} t en kg.`, answer: round(a * 1000), unit: "kg", steps: [`1 t = 1 000 kg → ${fmt(a * 1000)} kg`] }; },
        () => { const a = rnd(2, 95) * 100; return { statement: `Convertis ${fmt(a)} m² en ares.`, answer: a / 100, unit: "a", steps: [`1 a = 100 m² → ${fmt(a)} ÷ 100 = ${fmt(a / 100)} a`] }; },
        () => { const a = rnd(2, 9), b = pick([15, 20, 30, 45, 12, 36]); return { statement: `Convertis ${a} h ${b} min en minutes.`, answer: a * 60 + b, unit: "min", steps: [`${a} × 60 + ${b} = ${a * 60 + b} min`] }; },
      ];
      return pick(items)();
    },
  },
  {
    id: "geometrie",
    title: "Périmètres & aires",
    generate: () => {
      const kind = rnd(0, 4);
      if (kind === 0) {
        const L = rnd(20, 90), l = rnd(10, L - 5), prix = pick([500, 750, 1000, 1500]);
        return { statement: `On veut clôturer un jardin rectangulaire de ${L} m sur ${l} m. Le mètre de grillage coûte ${F(prix)}. Quelle est la dépense ?`, answer: 2 * (L + l) * prix, unit: "F", steps: [`P = 2 × (${L} + ${l}) = ${2 * (L + l)} m`, `Dépense = ${2 * (L + l)} × ${F(prix)} = ${F(2 * (L + l) * prix)}`] };
      }
      if (kind === 1) {
        const r = rnd(2, 20);
        return { statement: `Calcule l'aire d'un cercle de ${2 * r} m de diamètre (π = 3,14).`, answer: round(r * r * 3.14), unit: "m²", steps: [`r = ${2 * r} ÷ 2 = ${r} m`, `A = ${r} × ${r} × 3,14 = ${fmt(r * r * 3.14)} m²`] };
      }
      if (kind === 2) {
        const B = rnd(20, 60), b = rnd(8, B - 4), h = rnd(6, 30);
        return { statement: `Un terrain a la forme d'un trapèze : grande base ${B} m, petite base ${b} m, hauteur ${h} m. Calcule son aire.`, answer: ((B + b) * h) / 2, unit: "m²", steps: [`A = (${B} + ${b}) × ${h} ÷ 2 = ${fmt(((B + b) * h) / 2)} m²`] };
      }
      if (kind === 3) {
        const bb = rnd(6, 40), h = rnd(4, 30);
        return { statement: `Calcule l'aire d'un triangle de base ${bb} cm et de hauteur ${h} cm.`, answer: (bb * h) / 2, unit: "cm²", steps: [`A = ${bb} × ${h} ÷ 2 = ${fmt((bb * h) / 2)} cm²`] };
      }
      const P = 4 * rnd(5, 40);
      return { statement: `Un carré a un périmètre de ${P} m. Quelle est son aire ?`, answer: (P / 4) ** 2, unit: "m²", steps: [`Côté = ${P} ÷ 4 = ${P / 4} m`, `A = ${P / 4} × ${P / 4} = ${(P / 4) ** 2} m²`] };
    },
  },
  {
    id: "volumes",
    title: "Volumes & capacités",
    generate: () => {
      if (rnd(0, 1)) {
        const L = rnd(2, 8), l = rnd(1, L), h = pick([0.5, 1, 1.2, 1.5, 2]);
        const V = L * l * h;
        return { statement: `Un bassin en forme de pavé droit mesure ${L} m de long, ${l} m de large et ${fmt(h)} m de profondeur. Quelle quantité d'eau (en litres) peut-il contenir ?`, answer: round(V * 1000), unit: "L", steps: [`V = ${L} × ${l} × ${fmt(h)} = ${fmt(V)} m³`, `${fmt(V)} m³ = ${fmt(V * 1000)} L`] };
      }
      const r = pick([1, 2, 3, 5]), h = rnd(2, 10);
      const V = round(r * r * 3.14 * h);
      return { statement: `Un réservoir cylindrique a un rayon de ${r} dm et une hauteur de ${h} dm. Quelle est sa capacité en litres ? (π = 3,14)`, answer: V, unit: "L", steps: [`V = ${r} × ${r} × 3,14 × ${h} = ${fmt(V)} dm³`, `= ${fmt(V)} L`] };
    },
  },
  {
    id: "partages",
    title: "Partages & moyennes",
    generate: () => {
      const kind = rnd(0, 2);
      const p1 = pick(prenoms);
      const b = pick(prenoms.filter((x) => x !== p1));
      if (kind === 0) {
        const petit = rnd(5, 60) * 1000, D = rnd(1, 20) * 1000;
        return { statement: `${p1} et ${b} se partagent ${F(2 * petit + D)}. ${p1} reçoit ${F(D)} de plus que ${b}. Quelle est la part de ${p1} ?`, answer: petit + D, unit: "F", steps: [`Part de ${p1} = (${F(2 * petit + D)} + ${F(D)}) ÷ 2 = ${F(petit + D)}`] };
      }
      if (kind === 1) {
        const k = pick([2, 3, 4]), u = rnd(2, 40) * 1000;
        return { statement: `Une somme de ${F(u * (k + 1))} est partagée entre deux frères ; l'aîné reçoit ${k === 2 ? "le double" : k === 3 ? "le triple" : "le quadruple"} de la part du cadet. Quelle est la part de l'aîné ?`, answer: u * k, unit: "F", steps: [`Nombre de parts : 1 + ${k} = ${k + 1}`, `1 part = ${F(u * (k + 1))} ÷ ${k + 1} = ${F(u)}`, `Aîné : ${k} × ${F(u)} = ${F(u * k)}`] };
      }
      const notes = Array.from({ length: 5 }, () => rnd(6, 18));
      const s = notes.reduce((a, c) => a + c, 0);
      return { statement: `Un élève a obtenu les notes suivantes : ${notes.join(" ; ")}. Quelle est sa moyenne ?`, answer: round(s / 5), unit: "/20", steps: [`Somme = ${s}`, `Moyenne = ${s} ÷ 5 = ${fmt(s / 5)}`] };
    },
  },
  {
    id: "commerce",
    title: "Achat, vente & intérêts",
    generate: () => {
      const kind = rnd(0, 2);
      if (kind === 0) {
        const n = rnd(10, 50), pa = rnd(4, 40) * 500, frais = rnd(2, 30) * 500, pv = pa + rnd(1, 8) * 250;
        const pr = n * pa + frais, b = n * pv - pr;
        return { statement: `Un commerçant achète ${n} sacs de charbon à ${F(pa)} l'un. Il paie ${F(frais)} de transport et revend chaque sac ${F(pv)}. Quel est son bénéfice (ou sa perte, nombre négatif) ?`, answer: b, unit: "F", steps: [`PR = ${n} × ${F(pa)} + ${F(frais)} = ${F(pr)}`, `PV total = ${n} × ${F(pv)} = ${F(n * pv)}`, `B = ${F(n * pv)} − ${F(pr)} = ${F(b)}`] };
      }
      if (kind === 1) {
        const C = rnd(1, 40) * 50000, t = pick([3, 4, 5, 6, 8, 10, 12]), m = pick([3, 4, 6, 8, 9, 10, 18, 24]);
        const I = (C * t * m) / 1200;
        return { statement: `Un capital de ${F(C)} est placé à ${t} % l'an pendant ${m} mois. Calcule l'intérêt produit.`, answer: round(I), unit: "F", steps: [`I = C × t × n ÷ 1 200`, `I = ${fmt(C)} × ${t} × ${m} ÷ 1 200 = ${F(round(I))}`] };
      }
      const pr = rnd(4, 80) * 1000, t = pick([10, 15, 20, 25, 30]);
      return { statement: `Un objet a un prix de revient de ${F(pr)}. Le vendeur veut réaliser un bénéfice de ${t} % du prix de revient. À quel prix doit-il le vendre ?`, answer: (pr * (100 + t)) / 100, unit: "F", steps: [`Bénéfice = ${F(pr)} × ${t} ÷ 100 = ${F((pr * t) / 100)}`, `PV = ${F(pr)} + ${F((pr * t) / 100)} = ${F((pr * (100 + t)) / 100)}`] };
    },
  },
  {
    id: "echelles",
    title: "Échelles & plans",
    generate: () => {
      if (rnd(0, 1)) {
        const n = pick([10000, 25000, 50000, 100000, 200000]), d = round(rnd(10, 150) / 10);
        const km = (d * n) / 100000;
        return { statement: `Sur une carte à l'échelle 1/${fmt(n)}, deux villages sont séparés de ${fmt(d)} cm. Quelle est la distance réelle en km ?`, answer: round(km, 3), unit: "km", steps: [`${fmt(d)} × ${fmt(n)} = ${fmt(d * n)} cm`, `= ${fmt(km, 3)} km`] };
      }
      const n = pick([50, 100, 200]), L = rnd(4, 30);
      return { statement: `Sur un plan à l'échelle 1/${n}, une salle de classe mesure ${fmt((L * 100) / n)} cm de long. Quelle est sa longueur réelle en m ?`, answer: L, unit: "m", steps: [`${fmt((L * 100) / n)} × ${n} = ${L * 100} cm = ${L} m`] };
    },
  },
  {
    id: "durees",
    title: "Durées & horaires",
    generate: () => {
      const kind = rnd(0, 2);
      if (kind === 0) {
        const dep = rnd(5 * 4, 15 * 4) * 15, d = rnd(5, 40) * 5 + rnd(0, 1) * 60 * rnd(1, 4);
        return { statement: `Un car quitte la gare routière à ${hm(dep)}. Le trajet dure ${dur(d)}. À quelle heure arrive-t-il ?`, answer: dep + d, unit: "", kind: "time", steps: [`${hm(dep)} + ${dur(d)} = ${hm(dep + d)}`] };
      }
      if (kind === 1) {
        const a = rnd(7 * 12, 12 * 12) * 5, b = a + rnd(10, 60) * 5;
        return { statement: `Un cours commence à ${hm(a)} et se termine à ${hm(b)}. Quelle est sa durée en minutes ?`, answer: b - a, unit: "min", steps: [`De ${hm(a)} à ${hm(b)} : ${dur(b - a)} = ${b - a} min`] };
      }
      const d = rnd(3, 9) * 30, arr = rnd(10 * 4, 20 * 4) * 15, stop = pick([15, 20, 30]);
      return { statement: `Une famille veut arriver à Touba à ${hm(arr)}. Le trajet dure ${dur(d)} avec en plus une pause de ${stop} min. À quelle heure doit-elle partir au plus tard ?`, answer: arr - d - stop, unit: "", kind: "time", steps: [`Durée totale : ${dur(d)} + ${stop} min = ${dur(d + stop)}`, `${hm(arr)} − ${dur(d + stop)} = ${hm(arr - d - stop)}`] };
    },
  },
  {
    id: "intervalles",
    title: "Intervalles & multiples",
    generate: () => {
      const kind = rnd(0, 2);
      if (kind === 0) {
        const e = pick([2, 3, 4, 5]), n = rnd(10, 60);
        return { statement: `On plante des arbres en ligne droite le long d'une allée de ${e * n} m, en mettant un arbre à chaque extrémité. Les arbres sont espacés de ${e} m. Combien faut-il d'arbres ?`, answer: n + 1, unit: "arbres", steps: [`Nombre d'intervalles : ${e * n} ÷ ${e} = ${n}`, `Sur une ligne ouverte : arbres = intervalles + 1 = ${n + 1}`] };
      }
      if (kind === 1) {
        const e = pick([2, 2.5, 3, 4, 5]), L = rnd(10, 40) * 2, l = rnd(5, 20) * 2;
        const P = 2 * (L + l), n = P / e;
        if (!Number.isInteger(n)) return mathTopics.find((t) => t.id === "intervalles")!.generate();
        return { statement: `On clôture un champ rectangulaire de ${L} m sur ${l} m avec des piquets espacés de ${fmt(e)} m. Combien faut-il de piquets ?`, answer: n, unit: "piquets", steps: [`Périmètre : 2 × (${L} + ${l}) = ${P} m`, `Sur un contour fermé : piquets = intervalles = ${P} ÷ ${fmt(e)} = ${n}`] };
      }
      const pairs: [number, number, number][] = [[12, 18, 36], [10, 15, 30], [8, 12, 24], [15, 20, 60], [6, 9, 18], [20, 30, 60], [12, 16, 48]];
      const [a, b, m] = pick(pairs), dep = rnd(6 * 4, 8 * 4) * 15;
      return { statement: `À ${hm(dep)}, deux cars partent ensemble de la gare. L'un repart toutes les ${a} min, l'autre toutes les ${b} min. À quelle heure repartiront-ils de nouveau ensemble ?`, answer: dep + m, unit: "", kind: "time", steps: [`Plus petit multiple commun de ${a} et ${b} : ${m} min`, `${hm(dep)} + ${m} min = ${hm(dep + m)}`] };
    },
  },
  {
    id: "ages",
    title: "Âges & nombres",
    generate: () => {
      const kind = rnd(0, 2);
      const p = pick(prenoms);
      if (kind === 0) {
        const e = rnd(5, 15), k = pick([3, 4, 5]), n = rnd(2, 10);
        return { statement: `${p} a ${e} ans et son père a ${k} fois son âge. Quel âge aura le père dans ${n} ans ?`, answer: e * k + n, unit: "ans", steps: [`Âge du père : ${e} × ${k} = ${e * k} ans`, `Dans ${n} ans : ${e * k} + ${n} = ${e * k + n} ans`] };
      }
      if (kind === 1) {
        const enfant = rnd(6, 16), d = rnd(20, 35);
        return { statement: `La somme des âges d'une mère et de sa fille est ${2 * enfant + d} ans. La mère a ${d} ans de plus que sa fille. Quel est l'âge de la fille ?`, answer: enfant, unit: "ans", steps: [`Fille = (somme − différence) ÷ 2`, `(${2 * enfant + d} − ${d}) ÷ 2 = ${enfant} ans`] };
      }
      const x = rnd(5, 40), a = rnd(2, 6), b = rnd(3, 30);
      return { statement: `Je pense à un nombre. Je le multiplie par ${a} puis j'ajoute ${b} : j'obtiens ${a * x + b}. Quel est ce nombre ?`, answer: x, unit: "", steps: [`On remonte les opérations : ${a * x + b} − ${b} = ${a * x}`, `${a * x} ÷ ${a} = ${x}`] };
    },
  },
];

export const generateExercise = (topicId?: string) => {
  const topic = topicId ? mathTopics.find((t) => t.id === topicId)! : pick(mathTopics);
  return { topic, ex: topic.generate() };
};

const problemTemplates: (() => MathProblem)[] = [
  () => {
    const L = rnd(8, 30) * 5, l = rnd(4, L / 5 - 1) * 5, prixM = pick([600, 750, 900, 1200]), rdt = pick([8, 10, 12, 15]), prixKg = pick([250, 300, 350, 400]);
    const P = 2 * (L + l), A = L * l, recolte = (A * rdt) / 10;
    const p = pick(prenoms);
    return {
      id: "champ",
      title: "Le champ d'arachide",
      context: `${p} possède un champ rectangulaire de ${L} m de long et ${l} m de large et veut le clôturer avec du grillage vendu à ${F(prixM)} le mètre. Le champ produit en moyenne ${rdt} kg d'arachide pour 10 m², vendus ${F(prixKg)} le kg.`,
      parts: [
        { statement: "Calcule le périmètre du champ.", answer: P, unit: "m", steps: [`P = 2 × (${L} + ${l}) = ${P} m`] },
        { statement: "Combien coûte le grillage ?", answer: P * prixM, unit: "F", steps: [`${P} × ${F(prixM)} = ${F(P * prixM)}`] },
        { statement: "Calcule la superficie du champ en ares.", answer: A / 100, unit: "a", steps: [`A = ${L} × ${l} = ${fmt(A)} m²`, `1 a = 100 m² → ${fmt(A / 100)} a`] },
        { statement: "Quelle masse d'arachide récolte-t-on ?", answer: recolte, unit: "kg", steps: [`${fmt(A)} ÷ 10 = ${fmt(A / 10)} groupes de 10 m²`, `${fmt(A / 10)} × ${rdt} = ${fmt(recolte)} kg`] },
        { statement: "Quel est le montant de la vente de la récolte ?", answer: recolte * prixKg, unit: "F", steps: [`${fmt(recolte)} × ${F(prixKg)} = ${F(recolte * prixKg)}`] },
      ],
    };
  },
  () => {
    const [A, B] = pick(villes), v = pick([60, 72, 75, 80, 90]), t = pick([90, 120, 150, 180, 240]), pause = pick([15, 20, 30]);
    const d = (v * t) / 60, dep = rnd(6 * 4, 9 * 4) * 15, conso = pick([6, 7, 8, 9]), prixL = pick([680, 755, 920, 990]);
    const litres = (d * conso) / 100;
    return {
      id: "voyage",
      title: "Le voyage",
      context: `Un taxi part de ${A} à ${hm(dep)} pour ${B} (trajet fictif). Il roule à la vitesse moyenne de ${v} km/h pendant ${dur(t)}, sans compter une pause de ${pause} min. Il consomme ${conso} L de carburant aux 100 km ; le litre coûte ${F(prixL)}.`,
      parts: [
        { statement: "Quelle distance parcourt-il ?", answer: d, unit: "km", steps: [`${dur(t)} = ${fmt(t / 60)} h`, `d = ${v} × ${fmt(t / 60)} = ${fmt(d)} km`] },
        { statement: "À quelle heure arrive-t-il ?", answer: dep + t + pause, unit: "", kind: "time", steps: [`${hm(dep)} + ${dur(t)} + ${pause} min = ${hm(dep + t + pause)}`] },
        { statement: "Combien de litres de carburant consomme-t-il ?", answer: round(litres), unit: "L", steps: [`${fmt(d)} × ${conso} ÷ 100 = ${fmt(litres)} L`] },
        { statement: "Combien dépense-t-il en carburant ?", answer: round(litres * prixL), unit: "F", steps: [`${fmt(litres)} × ${F(prixL)} = ${F(round(litres * prixL))}`] },
      ],
    };
  },
  () => {
    const n = rnd(4, 20) * 5, pa = rnd(10, 40) * 500, frais = rnd(4, 40) * 1000, marge = pick([10, 15, 20, 25]);
    const pr = n * pa + frais, pv = (pr * (100 + marge)) / 100;
    return {
      id: "commercant",
      title: "Le commerçant",
      context: `Une commerçante du marché Sandaga achète ${n} pagnes à ${F(pa)} l'un. Elle paie ${F(frais)} de transport et de taxes. Elle veut réaliser un bénéfice de ${marge} % du prix de revient.`,
      parts: [
        { statement: "Quel est le prix d'achat total ?", answer: n * pa, unit: "F", steps: [`${n} × ${F(pa)} = ${F(n * pa)}`] },
        { statement: "Quel est le prix de revient ?", answer: pr, unit: "F", steps: [`${F(n * pa)} + ${F(frais)} = ${F(pr)}`] },
        { statement: "Quel bénéfice veut-elle réaliser ?", answer: (pr * marge) / 100, unit: "F", steps: [`${F(pr)} × ${marge} ÷ 100 = ${F((pr * marge) / 100)}`] },
        { statement: "À quel prix doit-elle vendre chaque pagne ?", answer: round(pv / n), unit: "F", steps: [`Prix de vente total : ${F(pv)}`, `${F(pv)} ÷ ${n} = ${F(round(pv / n))}`] },
      ],
    };
  },
  () => {
    const L = rnd(7, 12), l = rnd(5, L - 1), c = pick([20, 25, 50]), prixC = pick([350, 500, 650]), parCarton = pick([16, 20, 25]);
    const A = L * l, carreaux = (A * 10000) / (c * c), cartons = Math.ceil(carreaux / parCarton);
    return {
      id: "classe",
      title: "La salle de classe",
      context: `On veut carreler une salle de classe rectangulaire de ${L} m sur ${l} m avec des carreaux carrés de ${c} cm de côté. Les carreaux sont vendus par cartons de ${parCarton} ; un carton coûte ${F(prixC * parCarton)}.`,
      parts: [
        { statement: "Calcule l'aire de la salle.", answer: A, unit: "m²", steps: [`${L} × ${l} = ${A} m²`] },
        { statement: "Calcule l'aire d'un carreau en cm².", answer: c * c, unit: "cm²", steps: [`${c} × ${c} = ${c * c} cm²`] },
        { statement: "Combien de carreaux faut-il ?", answer: carreaux, unit: "carreaux", steps: [`${A} m² = ${fmt(A * 10000)} cm²`, `${fmt(A * 10000)} ÷ ${c * c} = ${fmt(carreaux)}`] },
        { statement: "Combien de cartons faut-il acheter ?", answer: cartons, unit: "cartons", steps: [`${fmt(carreaux)} ÷ ${parCarton} = ${fmt(carreaux / parCarton)}`, `On arrondit à l'entier supérieur : ${cartons} cartons`] },
        { statement: "Quel est le coût des carreaux ?", answer: cartons * prixC * parCarton, unit: "F", steps: [`${cartons} × ${F(prixC * parCarton)} = ${F(cartons * prixC * parCarton)}`] },
      ],
    };
  },
  () => {
    const L = rnd(2, 6), l = rnd(1, L), h = pick([1, 1.5, 2]), debit = pick([10, 20, 25, 40, 50]), prixM3 = pick([200, 300, 450]);
    const V = L * l * h, litres = V * 1000, minutes = litres / debit;
    return {
      id: "reservoir",
      title: "Le réservoir de l'école",
      context: `Le réservoir d'eau de l'école est un pavé droit de ${L} m de long, ${l} m de large et ${fmt(h)} m de haut. Un robinet le remplit avec un débit de ${debit} litres par minute. Le mètre cube d'eau coûte ${F(prixM3)}.`,
      parts: [
        { statement: "Calcule le volume du réservoir en m³.", answer: V, unit: "m³", steps: [`${L} × ${l} × ${fmt(h)} = ${fmt(V)} m³`] },
        { statement: "Quelle est sa capacité en litres ?", answer: litres, unit: "L", steps: [`1 m³ = 1 000 L → ${fmt(litres)} L`] },
        { statement: "Combien de minutes faut-il pour le remplir complètement ?", answer: round(minutes), unit: "min", steps: [`${fmt(litres)} ÷ ${debit} = ${fmt(minutes)} min`] },
        { statement: "Combien coûte un remplissage complet ?", answer: V * prixM3, unit: "F", steps: [`${fmt(V)} × ${F(prixM3)} = ${F(V * prixM3)}`] },
      ],
    };
  },
  () => {
    const sal = rnd(15, 40) * 6000, t = pick([3, 4, 5, 6]);
    const loyer = sal / 3, nour = (sal - loyer) / 2, reste = sal - loyer - nour, an = reste * 12, I = (an * t) / 100;
    const p = pick(prenoms);
    return {
      id: "salaire",
      title: "Le budget de l'enseignant",
      context: `${p}, jeune enseignant(e), gagne ${F(sal)} par mois. Le tiers du salaire sert au loyer, la moitié du reste à la nourriture, et ${p} épargne tout ce qui reste. L'épargne d'une année est placée à ${t} % par an.`,
      parts: [
        { statement: "Quel est le montant du loyer ?", answer: loyer, unit: "F", steps: [`${F(sal)} ÷ 3 = ${F(loyer)}`] },
        { statement: "Combien est consacré à la nourriture ?", answer: nour, unit: "F", steps: [`Reste : ${F(sal - loyer)}`, `${F(sal - loyer)} ÷ 2 = ${F(nour)}`] },
        { statement: "Quelle est l'épargne annuelle ?", answer: an, unit: "F", steps: [`Épargne mensuelle : ${F(reste)}`, `× 12 = ${F(an)}`] },
        { statement: "Quel intérêt rapporte cette épargne en un an ?", answer: round(I), unit: "F", steps: [`${F(an)} × ${t} ÷ 100 = ${F(round(I))}`] },
      ],
    };
  },
];

export const generateProblem = () => pick(problemTemplates)();
