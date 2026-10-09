import { fmt } from "@/lib/progress";

export type MathExercise = {
  statement: string;
  answer: number;
  unit: string;
  steps: string[];
};

export type MathTopic = {
  id: string;
  title: string;
  fiche: { rule: string; formulas: string[]; example: string; pieges: string[] };
  generate: () => MathExercise;
};

const rnd = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const round = (n: number, d = 2) => Math.round(n * 10 ** d) / 10 ** d;
const F = (n: number) => `${fmt(n)} F`;
const prenoms = ["Awa", "Moussa", "Fatou", "Ousmane", "Aminata", "Ibrahima", "Khady", "Mamadou", "Ndèye", "Cheikh", "Mariama", "Abdou"];
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
    fiche: {
      rule: "Pose les opérations en alignant les virgules. Pour multiplier des décimaux, on multiplie sans virgule puis on place autant de chiffres après la virgule qu'il y en a au total dans les facteurs. Pour diviser par un décimal, on multiplie dividende et diviseur par 10, 100… pour rendre le diviseur entier.",
      formulas: [
        "Priorités : parenthèses → × et ÷ → + et −",
        "a ÷ 0,5 = a × 2 ; a ÷ 0,25 = a × 4 ; a × 0,1 = a ÷ 10",
        "Multiplier par 10, 100, 1 000 : la virgule avance de 1, 2, 3 rangs",
      ],
      example: "12,5 × 0,4 → 125 × 4 = 500 → 2 chiffres après la virgule → 5,00 = 5",
      pieges: ["Oublier les priorités opératoires", "Mal placer la virgule dans le produit", "Diviser par un décimal sans transformer le diviseur"],
    },
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
    fiche: {
      rule: "Prendre une fraction d'une quantité : on divise par le dénominateur puis on multiplie par le numérateur. Pour additionner des fractions, on les met au même dénominateur.",
      formulas: ["a/b de Q = (Q ÷ b) × a", "a/b + c/d = (ad + cb) / bd", "Fraction restante = 1 − fractions utilisées", "Si a/b de Q = R alors Q = R ÷ a × b"],
      example: "3/4 de 840 = (840 ÷ 4) × 3 = 210 × 3 = 630",
      pieges: ["Calculer la fraction du reste et non du total", "Oublier de réduire au même dénominateur"],
    },
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
    fiche: {
      rule: "Un pourcentage est une fraction de dénominateur 100. Remise ou augmentation se calculent sur le prix initial.",
      formulas: ["t % de Q = Q × t ÷ 100", "Prix après remise = P × (100 − t) ÷ 100", "Prix après hausse = P × (100 + t) ÷ 100", "Taux = (part ÷ total) × 100", "Prix initial = prix réduit × 100 ÷ (100 − t)"],
      example: "Un pagne à 12 500 F soldé à 20 % : remise = 2 500 F, prix payé = 10 000 F",
      pieges: ["Calculer le prix initial en ajoutant t % au prix réduit (faux !)", "Confondre la remise et le prix payé"],
    },
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
    fiche: {
      rule: "Deux grandeurs sont proportionnelles si l'on passe de l'une à l'autre en multipliant toujours par le même nombre. Méthode du retour à l'unité : on calcule la valeur pour 1, puis pour la quantité demandée.",
      formulas: ["Valeur cherchée = (valeur connue ÷ quantité connue) × quantité demandée", "Produit en croix : a/b = c/x ⇒ x = b × c ÷ a", "Proportionnalité inverse (ouvriers/jours) : n₁ × j₁ = n₂ × j₂"],
      example: "5 kg de riz coûtent 2 250 F → 1 kg = 450 F → 8 kg = 3 600 F",
      pieges: ["Utiliser la règle de trois directe pour une situation inverse (plus d'ouvriers = moins de jours)"],
    },
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
    fiche: {
      rule: "Convertis toujours la durée en heures décimales (ou en minutes) avant de calculer. 1 h = 60 min ; 15 min = 0,25 h ; 20 min = 1/3 h ; 30 min = 0,5 h ; 45 min = 0,75 h.",
      formulas: ["d = v × t", "v = d ÷ t", "t = d ÷ v", "Heure d'arrivée = heure de départ + durée (+ arrêts)", "Rencontre (sens contraires) : t = d ÷ (v₁ + v₂)"],
      example: "Un car roule à 75 km/h pendant 2 h 24 min : 2 h 24 = 2,4 h → d = 75 × 2,4 = 180 km",
      pieges: ["Écrire 2 h 24 min = 2,24 h (faux : 2,4 h)", "Oublier les temps d'arrêt"],
    },
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
    fiche: {
      rule: "Utilise un tableau de conversion. Longueurs et masses : 1 colonne par unité. Aires : 2 colonnes par unité. Volumes : 3 colonnes par unité.",
      formulas: ["km hm dam m dm cm mm (×10)", "1 m² = 100 dm² ; 1 ha = 1 hm² = 10 000 m² ; 1 a = 100 m²", "1 m³ = 1 000 dm³ ; 1 dm³ = 1 L ; 1 cm³ = 1 mL", "1 t = 1 000 kg ; 1 q = 100 kg"],
      example: "2,5 ha = 25 000 m² ; 3,2 m³ = 3 200 L",
      pieges: ["Convertir des aires avec 1 seul chiffre par colonne", "Confondre dm³ et cm³ avec le litre"],
    },
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
    fiche: {
      rule: "Le périmètre est la longueur du contour (unité : m). L'aire est la surface (unité : m²). Vérifie que toutes les longueurs sont dans la même unité.",
      formulas: ["Carré : P = 4c ; A = c × c", "Rectangle : P = 2(L + l) ; A = L × l", "Triangle : A = b × h ÷ 2", "Trapèze : A = (B + b) × h ÷ 2", "Losange : A = D × d ÷ 2", "Cercle : P = D × 3,14 ; A = r × r × 3,14"],
      example: "Champ rectangulaire 45 m × 30 m : P = 150 m ; A = 1 350 m²",
      pieges: ["Confondre rayon et diamètre", "Oublier de diviser par 2 pour le triangle"],
    },
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
    fiche: {
      rule: "Le volume d'un solide droit = aire de la base × hauteur. Pour obtenir des litres, convertis en dm³.",
      formulas: ["Pavé droit : V = L × l × h", "Cube : V = a × a × a", "Cylindre : V = r × r × 3,14 × h", "1 dm³ = 1 L ; 1 m³ = 1 000 L"],
      example: "Bassin de 3 m × 2 m × 1,5 m : V = 9 m³ = 9 000 L",
      pieges: ["Mélanger m et cm dans le même calcul", "Oublier de convertir m³ → L"],
    },
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
    fiche: {
      rule: "Somme et différence connues : le plus grand = (S + D) ÷ 2 ; le plus petit = (S − D) ÷ 2. Partage proportionnel : on divise la somme par le total des parts.",
      formulas: ["Grand = (S + D) ÷ 2 ; Petit = (S − D) ÷ 2", "Une part = Somme ÷ nombre total de parts", "Moyenne = somme des valeurs ÷ nombre de valeurs", "Si l'un a le double de l'autre : 3 parts au total"],
      example: "Partager 50 000 F entre Awa et Moussa, Awa ayant 8 000 F de plus : Awa = 29 000 F, Moussa = 21 000 F",
      pieges: ["Oublier de vérifier : la somme des parts doit redonner le total"],
    },
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
    fiche: {
      rule: "Prix de revient = prix d'achat + frais. Bénéfice = prix de vente − prix de revient (perte si négatif). L'intérêt simple est proportionnel au capital, au taux et à la durée.",
      formulas: ["PR = PA + frais", "B = PV − PR", "% de bénéfice (sur le PR) = B ÷ PR × 100", "Intérêt annuel : I = C × t ÷ 100", "Sur n mois : I = C × t × n ÷ 1 200", "Sur j jours : I = C × t × j ÷ 36 000"],
      example: "Capital 200 000 F à 6 % pendant 9 mois : I = 200 000 × 6 × 9 ÷ 1 200 = 9 000 F",
      pieges: ["Calculer le % de bénéfice sur le prix de vente au lieu du prix de revient (sauf si l'énoncé le précise)"],
    },
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
    fiche: {
      rule: "L'échelle 1/n signifie que 1 cm sur le plan représente n cm en réalité. Travaille en cm puis convertis.",
      formulas: ["Distance réelle = distance plan × n", "Distance plan = distance réelle ÷ n", "Échelle = distance plan ÷ distance réelle (même unité)", "1 km = 100 000 cm"],
      example: "Carte au 1/50 000 : 6 cm → 300 000 cm = 3 km",
      pieges: ["Ne pas mettre les deux distances dans la même unité avant de calculer l'échelle"],
    },
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
];

export const generateExercise = (topicId?: string) => {
  const topic = topicId ? mathTopics.find((t) => t.id === topicId)! : pick(mathTopics);
  return { topic, ex: topic.generate() };
};
