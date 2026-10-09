import { moreDrills, moreTexts } from "./tsqExtra";

export type TsqQuestion = {
  section: "Compréhension" | "Vocabulaire" | "Grammaire" | "Conjugaison" | "Orthographe" | "Production";
  q: string;
  points: number;
  answer: string;
};

export type TsqText = {
  id: string;
  title: string;
  source: string;
  text: string;
  questions: TsqQuestion[];
};

const baseTexts: TsqText[] = [
  {
    id: "maitre-village",
    title: "Le maître du village",
    source: "Texte d'entraînement rédigé pour l'application",
    text: `Quand Monsieur Diop arriva à Keur Massamba, l'école n'était qu'un abri de paille où s'entassaient une soixantaine d'enfants. Il n'y avait ni table-banc ni tableau digne de ce nom. Les parents, occupés aux travaux des champs, venaient rarement s'enquérir des résultats de leurs enfants.

Le jeune instituteur aurait pu se décourager. Il choisit au contraire de réunir les notables sous l'arbre à palabres. Il leur parla longuement de l'avenir de leurs fils et de leurs filles, de ce que l'école pouvait leur apporter et de ce qu'elle attendait d'eux. Quelques semaines plus tard, les hommes moulaient des briques tandis que les femmes apportaient l'eau du puits. À la rentrée suivante, deux salles de classe en dur accueillaient les élèves.

Mais Monsieur Diop savait qu'un bâtiment ne fait pas une école. Chaque soir, à la lumière d'une lampe-tempête, il préparait ses leçons et corrigeait les cahiers. Il connaissait chaque enfant par son nom, savait qui venait sans avoir mangé et qui devait garder le troupeau le jeudi. Il exigeait beaucoup, mais il ne levait jamais la main sur un élève : « Un enfant qui a peur n'apprend pas, il obéit », aimait-il répéter.

Dix ans plus tard, lorsque ses premiers élèves revinrent au village, l'un infirmier, l'autre professeur, une troisième sage-femme, les anciens comprirent que le maître avait semé bien plus que de l'alphabet.`,
    questions: [
      { section: "Compréhension", q: "Donne un titre personnel au texte et justifie-le.", points: 1, answer: "Ex. : « Un maître bâtisseur » — car Monsieur Diop construit à la fois l'école matérielle (salles de classe) et l'avenir des enfants." },
      { section: "Compréhension", q: "Décris la situation de l'école à l'arrivée de Monsieur Diop. Relève deux indices.", points: 2, answer: "L'école était dans un état précaire : « un abri de paille », « une soixantaine d'enfants » entassés, « ni table-banc ni tableau ». De plus, les parents s'en désintéressaient." },
      { section: "Compréhension", q: "Comment l'instituteur obtient-il l'aide de la communauté ?", points: 2, answer: "Il réunit les notables sous l'arbre à palabres et les sensibilise à l'importance de l'école pour l'avenir de leurs enfants. Les hommes moulent alors les briques et les femmes apportent l'eau." },
      { section: "Compréhension", q: "Explique la phrase : « Un enfant qui a peur n'apprend pas, il obéit ».", points: 2, answer: "La peur (châtiments corporels) produit une soumission apparente mais bloque la compréhension et la confiance ; l'apprentissage véritable demande un climat sécurisant et bienveillant." },
      { section: "Compréhension", q: "Que signifie la dernière phrase : « le maître avait semé bien plus que de l'alphabet » ?", points: 1, answer: "Il n'a pas seulement appris à lire et écrire : il a transmis des valeurs, de l'ambition et a contribué au développement du village (métiers de santé, d'enseignement)." },
      { section: "Vocabulaire", q: "Donne le sens de « s'enquérir de » dans le texte.", points: 1, answer: "Se renseigner sur, demander des nouvelles de." },
      { section: "Vocabulaire", q: "Trouve dans le texte un mot de la même famille que « décourager » et forme son contraire.", points: 1, answer: "Décourager → courage ; contraire : encourager." },
      { section: "Grammaire", q: "Donne la nature et la fonction de « jeune » et de « sous l'arbre à palabres ».", points: 2, answer: "« jeune » : adjectif qualificatif, épithète de « instituteur ». « sous l'arbre à palabres » : groupe nominal prépositionnel, complément circonstanciel de lieu de « réunir »." },
      { section: "Grammaire", q: "Analyse la phrase : « Quand Monsieur Diop arriva à Keur Massamba, l'école n'était qu'un abri de paille. »", points: 2, answer: "Phrase complexe : proposition subordonnée circonstancielle de temps « Quand Monsieur Diop arriva à Keur Massamba » + proposition principale « l'école n'était qu'un abri de paille »." },
      { section: "Conjugaison", q: "Réécris au présent : « Il exigeait beaucoup, mais il ne levait jamais la main sur un élève. »", points: 1, answer: "Il exige beaucoup, mais il ne lève jamais la main sur un élève." },
      { section: "Conjugaison", q: "Justifie l'emploi du passé simple dans « Il choisit au contraire de réunir les notables ».", points: 1, answer: "Le passé simple exprime une action ponctuelle, achevée, de premier plan dans le récit (par opposition à l'imparfait de description ou d'habitude)." },
      { section: "Production", q: "En 10 à 15 lignes, dis quelles qualités, selon toi, un bon maître doit posséder. Appuie-toi sur le texte et sur ton expérience.", points: 4, answer: "Pistes : compétence et préparation (préparer ses leçons), bienveillance et refus de la violence, connaissance de chaque élève, capacité à mobiliser la communauté, exemplarité, persévérance. Structure : introduction courte, 2 ou 3 qualités illustrées, conclusion." },
    ],
  },
  {
    id: "eau-precieuse",
    title: "L'eau, trésor fragile",
    source: "Texte d'entraînement rédigé pour l'application",
    text: `À Ndiaganiao, le forage est tombé en panne il y a trois jours. Depuis, dès le premier chant du coq, les femmes et les fillettes prennent la route du vieux puits, à quatre kilomètres du village, une bassine sur la tête et un seau à la main. Fatou, douze ans, a déjà manqué l'école deux fois cette semaine.

On oublie trop souvent que l'eau potable n'est pas un don inépuisable. Dans nos villes, des robinets coulent pour rien pendant des heures ; on lave les voitures à grande eau tandis que, dans les campagnes, chaque litre est compté. La nappe phréatique baisse, l'avancée de la mer sale les terres de certaines zones côtières et les pluies deviennent irrégulières.

Pourtant, des solutions existent. Des villages ont construit des bassins de rétention qui recueillent l'eau de pluie pour l'arrosage des jardins maraîchers. Des comités de gestion veillent à l'entretien des forages et fixent un prix modeste au bidon afin de financer les réparations. À l'école, des clubs environnement apprennent aux élèves à fermer le robinet, à réparer une fuite et à protéger les points d'eau.

Économiser l'eau n'est pas seulement un geste écologique ; c'est un acte de solidarité envers ceux qui en manquent et envers les générations futures. Car, comme le dit un proverbe, c'est quand le puits est sec que l'on connaît la valeur de l'eau.`,
    questions: [
      { section: "Compréhension", q: "Quel est le thème du texte ?", points: 1, answer: "La rareté de l'eau potable et la nécessité de l'économiser / la préserver." },
      { section: "Compréhension", q: "Quelles sont les conséquences de la panne du forage pour les filles du village ?", points: 2, answer: "Elles doivent marcher longtemps (4 km) pour puiser l'eau dès l'aube ; cela entraîne de l'absentéisme scolaire (Fatou a manqué l'école deux fois)." },
      { section: "Compréhension", q: "Relève deux causes de la raréfaction de l'eau évoquées dans le texte.", points: 2, answer: "Le gaspillage (robinets qui coulent, lavage des voitures), la baisse de la nappe phréatique, la salinisation des terres par l'avancée de la mer, l'irrégularité des pluies." },
      { section: "Compréhension", q: "Quel rôle l'école peut-elle jouer d'après le texte ?", points: 1, answer: "Par les clubs environnement, elle éduque les élèves aux bons gestes : fermer le robinet, réparer une fuite, protéger les points d'eau." },
      { section: "Compréhension", q: "Explique le proverbe final.", points: 2, answer: "On n'apprécie la valeur d'une chose qu'au moment où elle vient à manquer ; il faut donc préserver l'eau avant d'en être privé." },
      { section: "Vocabulaire", q: "Que signifie « inépuisable » ? Décompose le mot.", points: 1, answer: "Qui ne peut pas s'épuiser, se tarir. in- (préfixe négatif) + épuis(er) (radical) + -able (suffixe : qui peut être)." },
      { section: "Vocabulaire", q: "Donne deux mots du champ lexical de l'eau présents dans le texte.", points: 1, answer: "forage, puits, robinets, nappe phréatique, pluies, bassins de rétention, points d'eau, bidon…" },
      { section: "Grammaire", q: "Relève une proposition subordonnée relative et donne son antécédent.", points: 2, answer: "« qui recueillent l'eau de pluie » ; antécédent : « bassins de rétention »." },
      { section: "Grammaire", q: "Quelle est la valeur du connecteur « Pourtant » au début du 3e paragraphe ?", points: 1, answer: "Opposition / concession : malgré la situation difficile décrite, il existe des solutions." },
      { section: "Conjugaison", q: "Mets la phrase au futur simple : « Des comités de gestion veillent à l'entretien des forages. »", points: 1, answer: "Des comités de gestion veilleront à l'entretien des forages." },
      { section: "Orthographe", q: "Corrige : « Les femme du village sont partie puisé de l'eau au puit. »", points: 1, answer: "Les femmes du village sont parties puiser de l'eau au puits." },
      { section: "Production", q: "Rédige un court texte (10 lignes) pour convaincre tes camarades d'économiser l'eau à l'école.", points: 4, answer: "Attendus : apostrophe aux camarades, constat (rareté), 2 arguments (solidarité, coût, avenir), 2 ou 3 gestes concrets, formule finale mobilisatrice. Utiliser l'impératif et des connecteurs logiques." },
    ],
  },
  {
    id: "telephone",
    title: "Le téléphone dans le cartable",
    source: "Texte d'entraînement rédigé pour l'application",
    text: `Il y a vingt ans, rares étaient les élèves qui possédaient un téléphone. Aujourd'hui, même au collège, beaucoup en ont un dans leur cartable. Ce petit appareil fascine autant qu'il inquiète.

Pour ses défenseurs, le smartphone est une bibliothèque de poche. En quelques secondes, un élève peut vérifier la définition d'un mot, regarder une vidéo qui explique une expérience de sciences ou réviser grâce à des applications gratuites. Pendant la fermeture des écoles, certains enseignants ont même continué leurs cours à distance grâce aux groupes de messagerie.

Ses détracteurs, eux, dénoncent ses ravages. Les notifications incessantes dispersent l'attention ; les nuits passées sur les réseaux sociaux se paient le lendemain par la somnolence en classe. Plus grave encore, des photos circulent sans le consentement des intéressés et certains élèves deviennent victimes de moqueries ou de menaces en ligne.

Faut-il alors bannir le téléphone de l'école ? Interdire est simple, mais éduquer est plus utile. Car l'outil n'est ni bon ni mauvais en soi : tout dépend de l'usage qu'on en fait. L'école a précisément pour mission d'apprendre aux enfants à s'en servir avec discernement.`,
    questions: [
      { section: "Compréhension", q: "Quel est le type dominant de ce texte ? Justifie.", points: 2, answer: "Texte argumentatif : il présente une question (faut-il bannir le téléphone ?), des arguments pour et contre, et une prise de position finale (éduquer plutôt qu'interdire)." },
      { section: "Compréhension", q: "Relève deux arguments des défenseurs du téléphone.", points: 2, answer: "Accès rapide aux connaissances (définitions, vidéos, applications de révision) ; continuité pédagogique à distance grâce aux groupes de messagerie." },
      { section: "Compréhension", q: "Relève deux arguments de ses détracteurs.", points: 2, answer: "Dispersion de l'attention (notifications) ; manque de sommeil et somnolence ; atteintes à la vie privée (photos sans consentement) ; harcèlement en ligne." },
      { section: "Compréhension", q: "Quelle est la position de l'auteur ?", points: 1, answer: "Plutôt que d'interdire, l'école doit éduquer à un usage raisonné du téléphone, car l'outil n'est ni bon ni mauvais en soi." },
      { section: "Vocabulaire", q: "Donne un synonyme de « détracteurs » et son antonyme dans le texte.", points: 1, answer: "Synonyme : critiques, adversaires. Antonyme : défenseurs." },
      { section: "Vocabulaire", q: "Que signifie « avec discernement » ?", points: 1, answer: "Avec jugement, en faisant la part des choses, de façon réfléchie." },
      { section: "Grammaire", q: "Donne la nature et la fonction de « une bibliothèque de poche » dans : « le smartphone est une bibliothèque de poche ».", points: 2, answer: "Groupe nominal ; attribut du sujet « le smartphone » (après le verbe d'état « être »)." },
      { section: "Grammaire", q: "Transforme à la voix passive : « Les notifications dispersent l'attention. »", points: 1, answer: "L'attention est dispersée par les notifications." },
      { section: "Conjugaison", q: "Conjugue « éduquer » au subjonctif présent : « Il faut que l'école … les enfants. »", points: 1, answer: "Il faut que l'école éduque les enfants." },
      { section: "Orthographe", q: "Choisis : « Les élèves (leur / leurs) montrent (leur / leurs) téléphones. »", points: 1, answer: "« Les élèves leur montrent leurs téléphones. » (leur pronom invariable devant le verbe ; leurs déterminant pluriel devant le nom)." },
      { section: "Production", q: "Rédige un paragraphe argumentatif (10-12 lignes) : « Le téléphone devrait-il être autorisé en classe ? »", points: 4, answer: "Attendus : thèse claire, 2 arguments illustrés d'exemples, connecteurs (d'abord, en outre, cependant, ainsi), conclusion qui nuance (usage encadré par l'enseignant)." },
    ],
  },
  {
    id: "teranga",
    title: "La teranga mise à l'épreuve",
    source: "Texte d'entraînement rédigé pour l'application",
    text: `Mon grand-père répétait souvent qu'un étranger n'arrive jamais les mains vides : il apporte des nouvelles, des histoires, parfois une autre façon de voir le monde. Dans notre concession, il y avait toujours un bol de plus autour du plat commun, et personne ne demandait au voyageur combien de temps il comptait rester.

Cette hospitalité, que nous appelons la teranga, fait la fierté de notre pays. Mais, en ville, je la vois s'effriter. Les portes se ferment, les voisins se saluent à peine et chacun court après son pain quotidien. Certains disent que la vie est devenue trop chère pour partager ; d'autres, que la méfiance a remplacé la confiance.

Je ne crois pas que la teranga soit morte. Je l'ai retrouvée l'an dernier, quand l'inondation a chassé des familles entières de leur maison : des inconnus ont ouvert leurs portes, des jeunes ont organisé des collectes, des commerçants ont offert du riz. Elle sommeille peut-être, mais il suffit d'une épreuve pour la réveiller.

Encore faut-il la transmettre. Si les enfants ne voient plus leurs parents partager, comment apprendraient-ils à le faire ? C'est à la famille d'abord, à l'école ensuite, qu'il revient d'entretenir cette flamme.`,
    questions: [
      { section: "Compréhension", q: "Qui parle dans ce texte ? Justifie.", points: 1, answer: "Un narrateur à la première personne (« mon grand-père », « je la vois », « je ne crois pas »), un adulte qui témoigne de son expérience." },
      { section: "Compréhension", q: "Qu'est-ce que la teranga d'après le texte ? Donne deux exemples.", points: 2, answer: "L'hospitalité, le sens du partage et de l'accueil. Exemples : un bol de plus autour du plat commun, ne pas demander au voyageur combien de temps il reste, l'entraide lors de l'inondation." },
      { section: "Compréhension", q: "Pourquoi, selon certains, la teranga s'affaiblit-elle en ville ?", points: 2, answer: "À cause de la cherté de la vie (difficile de partager) et de la méfiance qui a remplacé la confiance ; chacun est absorbé par sa survie." },
      { section: "Compréhension", q: "Quel événement prouve que la teranga n'est pas morte ?", points: 1, answer: "L'inondation : des inconnus ont hébergé des familles, des jeunes ont fait des collectes, des commerçants ont donné du riz." },
      { section: "Compréhension", q: "Selon l'auteur, à qui revient la transmission de cette valeur ?", points: 1, answer: "À la famille d'abord, puis à l'école." },
      { section: "Vocabulaire", q: "Explique « s'effriter » dans le texte.", points: 1, answer: "Se désagréger peu à peu, s'affaiblir progressivement." },
      { section: "Vocabulaire", q: "Relève une métaphore dans le dernier paragraphe et explique-la.", points: 1, answer: "« entretenir cette flamme » : la teranga est comparée à une flamme qu'il faut alimenter pour qu'elle ne s'éteigne pas." },
      { section: "Grammaire", q: "Quelle est la fonction de « que nous appelons la teranga » ?", points: 1, answer: "Proposition subordonnée relative, complément de l'antécédent « Cette hospitalité »." },
      { section: "Grammaire", q: "Analyse : « Si les enfants ne voient plus leurs parents partager, comment apprendraient-ils à le faire ? »", points: 2, answer: "Subordonnée circonstancielle de condition (« Si … partager ») + principale interrogative au conditionnel présent." },
      { section: "Conjugaison", q: "Mets au passé composé : « des inconnus ouvrent leurs portes ». Accorde correctement.", points: 1, answer: "Des inconnus ont ouvert leurs portes (pas d'accord : COD placé après l'auxiliaire avoir)." },
      { section: "Orthographe", q: "Complète avec ces / ses / c'est / s'est : « … grâce à … voisins qu'il … relevé ; … gestes l'ont touché. »", points: 2, answer: "« C'est grâce à ses voisins qu'il s'est relevé ; ces gestes l'ont touché. »" },
      { section: "Production", q: "Raconte (10-15 lignes) une scène où tu as été témoin d'un geste de solidarité.", points: 4, answer: "Attendus : récit au passé (imparfait/passé simple ou passé composé), situation initiale, l'événement, le geste solidaire, tes sentiments, une phrase de leçon/morale." },
    ],
  },
];

export type Drill = { cat: string; q: string; options: string[]; correct: number; explain: string };

const baseDrills: Drill[] = [
  { cat: "Homophones", q: "Il … reçu un livre … la bibliothèque.", options: ["a / à", "à / a", "a / a", "à / à"], correct: 0, explain: "« a » = avait (verbe avoir) ; « à » = préposition." },
  { cat: "Homophones", q: "Le maître … ses élèves … partis en excursion.", options: ["et / sont", "est / son", "et / son", "est / sont"], correct: 0, explain: "« et » = et puis ; « sont » = étaient." },
  { cat: "Homophones", q: "Je … donne … cahiers.", options: ["leurs / leur", "leur / leurs", "leur / leur", "leurs / leurs"], correct: 1, explain: "Devant un verbe, « leur » est un pronom invariable ; devant un nom pluriel, « leurs » est un déterminant." },
  { cat: "Homophones", q: "… livres sont ceux de mon frère ; il a perdu … clés.", options: ["Ses / ces", "Ces / ses", "C'est / ses", "Ces / ces"], correct: 1, explain: "« ces » = ceux-là ; « ses » = les siens." },
  { cat: "Homophones", q: "… bonne nouvelle ! Je crois … viendra demain.", options: ["Qu'elle / quelle", "Quelle / qu'elle", "Quel / qu'elle", "Quelle / quelle"], correct: 1, explain: "« Quelle » détermine le nom ; « qu'elle » = que + elle (on peut remplacer par « qu'il »)." },
  { cat: "Homophones", q: "Il … de livres, mais il … encore en acheter.", options: ["a peu / peut", "a peut / peu", "à peu / peux", "a peu / peu"], correct: 0, explain: "« peu » = pas beaucoup ; « peut » = pouvait." },
  { cat: "Homophones", q: "Elle … levée tôt ; … une habitude.", options: ["c'est / s'est", "s'est / c'est", "ses / c'est", "s'est / ces"], correct: 1, explain: "« s'est » : verbe pronominal (se lever) ; « c'est » = cela est." },
  { cat: "Homophones", q: "Le village … je suis né se trouve près du fleuve … de la mer ?", options: ["ou / où", "où / ou", "où / où", "ou / ou"], correct: 1, explain: "« où » indique le lieu ; « ou » = ou bien." },
  { cat: "Participe passé", q: "Les leçons que le maître a (expliquer) étaient difficiles.", options: ["expliqué", "expliquées", "expliqués", "expliquée"], correct: 1, explain: "Avec avoir, accord avec le COD « que » (= les leçons) placé avant." },
  { cat: "Participe passé", q: "Les élèves ont (recevoir) leurs bulletins.", options: ["reçus", "reçu", "reçues", "reçue"], correct: 1, explain: "Avec avoir et COD placé après : pas d'accord." },
  { cat: "Participe passé", q: "Les filles sont (arriver) en retard.", options: ["arrivé", "arrivés", "arrivées", "arrivée"], correct: 2, explain: "Avec être : accord avec le sujet féminin pluriel." },
  { cat: "Participe passé", q: "Elles se sont (laver) les mains.", options: ["lavées", "lavé", "lavés", "lavée"], correct: 1, explain: "Le COD « les mains » est placé après : pas d'accord." },
  { cat: "Participe passé", q: "Elles se sont (réveiller) à l'aube.", options: ["réveillé", "réveillés", "réveillées", "réveiller"], correct: 2, explain: "Pronominal sans COD après : accord avec le sujet." },
  { cat: "Conjugaison", q: "Passé simple de « venir », 3e personne du pluriel :", options: ["ils venèrent", "ils vinrent", "ils venirent", "ils vinent"], correct: 1, explain: "venir → je vins, il vint, ils vinrent." },
  { cat: "Conjugaison", q: "Passé simple de « prendre », 3e personne du singulier :", options: ["il prena", "il prenit", "il prit", "il prenda"], correct: 2, explain: "prendre → il prit, ils prirent." },
  { cat: "Conjugaison", q: "Il faut que tu (faire) tes devoirs.", options: ["fais", "fasses", "ferais", "feras"], correct: 1, explain: "« Il faut que » + subjonctif : que tu fasses." },
  { cat: "Conjugaison", q: "Bien qu'il (être) fatigué, il travaille.", options: ["est", "était", "soit", "serait"], correct: 2, explain: "« Bien que » + subjonctif : qu'il soit." },
  { cat: "Conjugaison", q: "Si j'avais le temps, je (lire) davantage.", options: ["lirai", "lirais", "lisais", "lise"], correct: 1, explain: "Si + imparfait → conditionnel présent." },
  { cat: "Conjugaison", q: "Demain, je (aller) au marché.", options: ["irai", "irais", "allerai", "aille"], correct: 0, explain: "Futur simple d'aller : j'irai (le conditionnel serait « j'irais »)." },
  { cat: "Conjugaison", q: "Quand nous étions enfants, nous (jouer) sous le baobab.", options: ["jouâmes", "jouions", "jouons", "jouerons"], correct: 1, explain: "Habitude dans le passé → imparfait : nous jouions." },
  { cat: "Nature & fonction", q: "« Les élèves attentifs comprennent vite. » Fonction de « attentifs » :", options: ["attribut du sujet", "épithète", "apposition", "COD"], correct: 1, explain: "Adjectif directement relié au nom, sans verbe d'état : épithète." },
  { cat: "Nature & fonction", q: "« Le maître semble satisfait. » Fonction de « satisfait » :", options: ["épithète", "COD", "attribut du sujet", "complément du nom"], correct: 2, explain: "Après le verbe d'état « sembler » : attribut du sujet." },
  { cat: "Nature & fonction", q: "« Il parle à ses parents. » Fonction de « à ses parents » :", options: ["COD", "COI", "CC de lieu", "attribut"], correct: 1, explain: "Parler à qui ? → complément d'objet indirect (avec préposition)." },
  { cat: "Nature & fonction", q: "« Chaque matin, Awa balaie la cour. » Fonction de « Chaque matin » :", options: ["sujet", "COD", "CC de temps", "COI"], correct: 2, explain: "Déplaçable et supprimable, indique le moment : CC de temps." },
  { cat: "Nature & fonction", q: "Nature de « rapidement » :", options: ["adjectif", "adverbe", "préposition", "nom"], correct: 1, explain: "Mot invariable qui modifie le verbe : adverbe (souvent en -ment)." },
  { cat: "Nature & fonction", q: "Nature de « car » :", options: ["conjonction de subordination", "préposition", "conjonction de coordination", "adverbe"], correct: 2, explain: "mais, ou, et, donc, or, ni, car : conjonctions de coordination." },
  { cat: "Nature & fonction", q: "« Dakar, capitale du Sénégal, est très peuplée. » Fonction de « capitale du Sénégal » :", options: ["épithète", "apposition", "attribut", "sujet"], correct: 1, explain: "Groupe nominal détaché par des virgules : apposition au nom « Dakar »." },
  { cat: "Propositions", q: "« Je sais que tu travailles. » La proposition « que tu travailles » est :", options: ["relative", "complétive", "circonstancielle de cause", "indépendante"], correct: 1, explain: "Introduite par la conjonction « que », COD de « sais » : complétive." },
  { cat: "Propositions", q: "« Le livre que tu m'as prêté est passionnant. » « que tu m'as prêté » est :", options: ["complétive", "relative", "circonstancielle", "principale"], correct: 1, explain: "« que » est ici un pronom relatif qui reprend l'antécédent « livre »." },
  { cat: "Propositions", q: "« Il est resté à la maison parce qu'il était malade. » La subordonnée exprime :", options: ["le but", "la conséquence", "la cause", "le temps"], correct: 2, explain: "« parce que » introduit la cause." },
  { cat: "Propositions", q: "« Il parle fort pour que tous l'entendent. » La subordonnée exprime :", options: ["la cause", "le but", "la condition", "la concession"], correct: 1, explain: "« pour que » + subjonctif : but." },
  { cat: "Vocabulaire", q: "Le préfixe « in- » dans « inutile » exprime :", options: ["la répétition", "la négation / le contraire", "l'intérieur", "l'excès"], correct: 1, explain: "in-/im-/il-/ir- marquent souvent le contraire : inutile, impossible, illisible, irrégulier." },
  { cat: "Vocabulaire", q: "Antonyme de « prolixe » :", options: ["bavard", "concis", "long", "confus"], correct: 1, explain: "Prolixe = trop long, bavard ; concis = qui dit beaucoup en peu de mots." },
  { cat: "Vocabulaire", q: "« Il a les yeux plus gros que le ventre » est :", options: ["une comparaison", "une expression figurée", "une litote", "un euphémisme"], correct: 1, explain: "Expression figurée (idiomatique) : vouloir plus qu'on ne peut consommer ou faire." },
  { cat: "Vocabulaire", q: "« Cette école est une ruche » : figure de style ?", options: ["comparaison", "métaphore", "personnification", "hyperbole"], correct: 1, explain: "Rapprochement sans outil de comparaison : métaphore (une comparaison utiliserait « comme »)." },
];

export const tsqTexts: TsqText[] = [...baseTexts, ...moreTexts];
export const drills: Drill[] = [...baseDrills, ...moreDrills];
