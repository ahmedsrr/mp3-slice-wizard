import type { Drill, TsqText } from "./tsq";

export const moreTexts: TsqText[] = [
  {
    id: "talibe",
    title: "Le petit talibé",
    source: "Texte d'entraînement rédigé pour l'application",
    text: `Chaque matin, au carrefour, je croise Modou. Il a peut-être huit ans. Pieds nus, une boîte de tomate vide à la main, il tend son récipient aux automobilistes arrêtés au feu rouge. Quand la lumière passe au vert, il court se réfugier sur le trottoir, au milieu de la fumée des pots d'échappement.

Un jour, je lui ai offert un pain et je lui ai demandé s'il allait à l'école. Il a souri, gêné, puis il a récité d'une traite plusieurs versets du Coran. « Mon maître dit que je dois apporter cinq cents francs avant le soir », a-t-il ajouté en baissant les yeux.

Je suis reparti le cœur serré. Cet enfant avait une mémoire prodigieuse ; il aurait pu devenir médecin, ingénieur ou instituteur. Pourtant, il passait ses journées dans la rue, exposé aux accidents, à la faim et aux mauvaises rencontres.

Certes, l'enseignement coranique fait partie de notre héritage et de nombreux maîtres l'exercent avec dévouement. Mais aucune tradition ne justifie qu'un enfant soit livré à la rue. Les daaras modernes, qui associent l'apprentissage du Coran à la lecture, à l'écriture et au calcul, montrent qu'une autre voie est possible.`,
    questions: [
      { section: "Compréhension", q: "Qui est Modou et que fait-il au carrefour ?", points: 2, answer: "Modou est un enfant talibé d'environ huit ans ; il mendie auprès des automobilistes arrêtés au feu rouge avec une boîte de tomate vide." },
      { section: "Compréhension", q: "Relève deux dangers auxquels l'enfant est exposé.", points: 2, answer: "Les accidents (circulation), la faim, la pollution (fumée des pots d'échappement), les mauvaises rencontres." },
      { section: "Compréhension", q: "Quel sentiment le narrateur éprouve-t-il ? Justifie par une expression du texte.", points: 1, answer: "La tristesse, la compassion : « Je suis reparti le cœur serré »." },
      { section: "Compréhension", q: "Quelle solution l'auteur propose-t-il à la fin du texte ?", points: 2, answer: "Les daaras modernes, qui associent l'enseignement coranique à la lecture, l'écriture et le calcul, sans envoyer les enfants mendier." },
      { section: "Vocabulaire", q: "Explique « une mémoire prodigieuse ».", points: 1, answer: "Une mémoire extraordinaire, exceptionnelle." },
      { section: "Vocabulaire", q: "Donne un synonyme de « dévouement ».", points: 1, answer: "Abnégation, engagement, sacrifice, zèle." },
      { section: "Grammaire", q: "Quelle est la valeur de « Certes… Mais » dans le dernier paragraphe ?", points: 1, answer: "Concession puis opposition : l'auteur reconnaît un point (l'héritage de l'enseignement coranique) avant d'affirmer sa thèse (aucune tradition ne justifie la mendicité)." },
      { section: "Grammaire", q: "Mets au discours indirect : « Mon maître dit que je dois apporter cinq cents francs avant le soir », a-t-il ajouté.", points: 2, answer: "Il a ajouté que son maître disait qu'il devait apporter cinq cents francs avant le soir." },
      { section: "Conjugaison", q: "Donne le temps et le mode de « il aurait pu devenir ».", points: 1, answer: "Conditionnel passé (verbe pouvoir) : action possible dans le passé mais non réalisée." },
      { section: "Orthographe", q: "Accorde : « Les enfants (livré) à la rue sont (exposé) à de (grand) dangers. »", points: 1, answer: "Les enfants livrés à la rue sont exposés à de grands dangers." },
      { section: "Production", q: "Écris une lettre (12 lignes) au maire de ta commune pour lui proposer une action en faveur des enfants de la rue.", points: 4, answer: "Attendus : en-tête (lieu, date, destinataire), formule d'appel (Monsieur le Maire), présentation de soi, constat, proposition concrète (recensement, partenariat avec les daaras, cantine), formule de politesse, signature." },
    ],
  },
  {
    id: "pluie",
    title: "Le retour des pluies",
    source: "Texte d'entraînement rédigé pour l'application",
    text: `Depuis des semaines, le ciel restait d'un bleu implacable. Les champs, labourés en attendant l'hivernage, ressemblaient à de grandes plaies ouvertes. Les vieux scrutaient l'horizon du côté de l'est, et les femmes économisaient la moindre goutte du puits.

Un après-midi, un vent chaud se leva brusquement, soulevant des tourbillons de poussière rouge. Les chèvres s'agitèrent, les oiseaux se turent. Puis, au loin, un grondement sourd roula sur la savane. En quelques minutes, d'énormes nuages noirs envahirent le ciel, et les premières gouttes, lourdes comme des pièces de monnaie, s'écrasèrent sur le sol brûlant.

Alors le village tout entier sortit. Les enfants dansaient sous l'averse en criant de joie, les hommes riaient en levant les bras, et même la vieille Coumba, qui ne quittait plus sa natte, se fit porter jusqu'au seuil de sa case pour sentir l'odeur de la terre mouillée.

Le lendemain, dès l'aube, les paysans partirent semer le mil et l'arachide. La terre, gorgée d'eau, promettait une bonne récolte.`,
    questions: [
      { section: "Compréhension", q: "Dans quelle situation se trouve le village au début du texte ?", points: 2, answer: "Le village souffre de la sécheresse : il ne pleut plus depuis des semaines, les champs sont prêts mais secs, l'eau du puits est rationnée." },
      { section: "Compréhension", q: "Relève trois signes annonciateurs de la pluie.", points: 2, answer: "Le vent chaud qui se lève, les tourbillons de poussière, l'agitation des chèvres, le silence des oiseaux, le grondement du tonnerre, les nuages noirs." },
      { section: "Compréhension", q: "Comment les villageois réagissent-ils à l'arrivée de la pluie ?", points: 2, answer: "Par une joie collective : les enfants dansent et crient, les hommes rient en levant les bras, même la vieille Coumba se fait porter dehors." },
      { section: "Compréhension", q: "Pourquoi la vieille Coumba se fait-elle porter jusqu'au seuil ?", points: 1, answer: "Pour sentir l'odeur de la terre mouillée, tant l'événement est important et attendu ; elle est trop âgée pour marcher seule." },
      { section: "Vocabulaire", q: "Relève une comparaison et explique-la.", points: 1, answer: "« des gouttes lourdes comme des pièces de monnaie » : les gouttes sont grosses et lourdes, et précieuses comme de l'argent." },
      { section: "Vocabulaire", q: "Que signifie « hivernage » au Sénégal ?", points: 1, answer: "La saison des pluies (de juin-juillet à octobre)." },
      { section: "Grammaire", q: "Nature et fonction de « implacable » dans la première phrase.", points: 1, answer: "Adjectif qualificatif, épithète de « bleu »." },
      { section: "Grammaire", q: "Relève une proposition subordonnée relative et donne sa fonction.", points: 2, answer: "« qui ne quittait plus sa natte » : complément de l'antécédent « la vieille Coumba »." },
      { section: "Conjugaison", q: "Pourquoi l'auteur emploie-t-il l'imparfait dans le 1er paragraphe et le passé simple dans le 2e ?", points: 2, answer: "L'imparfait décrit une situation qui dure (la sécheresse, le décor) ; le passé simple raconte des actions soudaines et successives (le vent se leva, les nuages envahirent…)." },
      { section: "Orthographe", q: "Écris au pluriel : « Le vieux paysan partit semer son champ. »", points: 1, answer: "Les vieux paysans partirent semer leurs champs." },
      { section: "Production", q: "Décris en 10 à 15 lignes une scène de marché un jour de fête. Utilise au moins deux comparaisons.", points: 4, answer: "Attendus : description organisée (vue d'ensemble puis détails), sensations (bruits, odeurs, couleurs), imparfait de description, deux comparaisons avec « comme », vocabulaire précis." },
    ],
  },
  {
    id: "lecture",
    title: "Le goût de lire",
    source: "Texte d'entraînement rédigé pour l'application",
    text: `Dans ma famille, il n'y avait pas de livres. Mon père lisait le journal le vendredi, ma mère connaissait par cœur les contes que lui avait transmis sa grand-mère, mais aucun roman ne traînait sur une étagère.

C'est à l'école, en classe de CM1, que tout a commencé. Notre maîtresse, Madame Faye, avait installé au fond de la classe une petite caisse en bois remplie de livres usés. Chaque vendredi, nous avions le droit d'en emporter un à la maison. Le premier que j'ai choisi racontait l'histoire d'un enfant qui traversait le désert pour retrouver son père. Je l'ai lu trois fois, à la lumière de la lampe, jusqu'à en connaître des passages entiers.

Depuis ce jour, je n'ai jamais cessé de lire. Les livres m'ont fait voyager sans quitter mon quartier ; ils m'ont appris des mots que personne n'employait autour de moi et m'ont donné le courage de rêver plus grand.

Aujourd'hui, on dit que les jeunes ne lisent plus, qu'ils préfèrent les écrans. C'est peut-être vrai. Mais je reste persuadé qu'un enfant à qui l'on tend le bon livre au bon moment devient un lecteur pour la vie.`,
    questions: [
      { section: "Compréhension", q: "Pourquoi le narrateur n'avait-il pas accès aux livres dans sa famille ?", points: 1, answer: "Il n'y avait pas de livres à la maison : le père lisait seulement le journal, la mère transmettait des contes oralement." },
      { section: "Compréhension", q: "Quel rôle Madame Faye a-t-elle joué ?", points: 2, answer: "Elle a créé une petite bibliothèque de classe et permis aux élèves d'emprunter un livre chaque vendredi : elle a éveillé le goût de la lecture chez le narrateur." },
      { section: "Compréhension", q: "Relève trois apports de la lecture selon le narrateur.", points: 2, answer: "Voyager sans quitter son quartier ; apprendre des mots nouveaux (vocabulaire) ; avoir le courage de rêver plus grand (ambition)." },
      { section: "Compréhension", q: "Reformule la thèse exprimée dans la dernière phrase.", points: 2, answer: "Si l'on propose à un enfant un livre adapté au bon moment, il gardera l'habitude de lire toute sa vie." },
      { section: "Vocabulaire", q: "Que signifie « persuadé » ? Donne un mot de la même famille.", points: 1, answer: "Convaincu, certain. Famille : persuader, persuasion, persuasif." },
      { section: "Vocabulaire", q: "Trouve dans le texte deux mots du champ lexical de la lecture.", points: 1, answer: "livres, roman, journal, lecteur, lire, passages, étagère…" },
      { section: "Grammaire", q: "Quelle est la fonction de « par cœur » ?", points: 1, answer: "Complément circonstanciel de manière du verbe « connaissait »." },
      { section: "Grammaire", q: "Analyse : « C'est à l'école, en classe de CM1, que tout a commencé. » Quelle tournure met en relief « à l'école » ?", points: 1, answer: "La tournure présentative (mise en relief) « C'est… que »." },
      { section: "Conjugaison", q: "Mets au passé simple : « Je l'ai lu trois fois. »", points: 1, answer: "Je le lus trois fois." },
      { section: "Orthographe", q: "Justifie l'accord de « transmis » dans « les contes que lui avait transmis sa grand-mère ».", points: 2, answer: "Participe passé avec avoir ; le COD « que » (= les contes, masculin pluriel) est placé avant : transmis (invariable au masculin pluriel, -s déjà présent)." },
      { section: "Production", q: "En 10 à 15 lignes, propose trois idées pour donner aux élèves le goût de la lecture.", points: 4, answer: "Exemples : bibliothèque de classe, lecture à voix haute quotidienne par le maître, concours de lecture, club de lecture, contes en langues nationales, échanges de livres. Chaque idée expliquée et justifiée." },
    ],
  },
  {
    id: "ville",
    title: "L'exode vers la ville",
    source: "Texte d'entraînement rédigé pour l'application",
    text: `À la fin de chaque hivernage, des milliers de jeunes quittent les villages pour la capitale. Ils partent avec un petit sac, quelques billets cousus dans la doublure de leur veste et beaucoup d'espoir. Dakar, disent-ils, offre du travail, de l'argent et une vie moderne.

La réalité est souvent plus dure. Sans qualification, beaucoup deviennent marchands ambulants, manœuvres ou gardiens. Ils s'entassent à plusieurs dans une chambre louée cher, dans des quartiers inondés à chaque grosse pluie. Certains, découragés, rêvent alors d'un autre départ, plus dangereux encore, au-delà de l'océan.

Pendant ce temps, les campagnes se vident de leurs forces vives. Les vieux restent seuls pour cultiver des champs trop vastes, et les villages perdent peu à peu leurs écoles faute d'élèves.

Pourtant, la terre peut nourrir ceux qui la travaillent. Des jeunes de retour au village ont créé des fermes avicoles, des périmètres maraîchers irrigués ou des ateliers de transformation des céréales. Avec un peu de formation et d'accès au crédit, ils gagnent souvent mieux leur vie qu'en ville. Encore faut-il que l'école leur montre que réussir ne signifie pas forcément partir.`,
    questions: [
      { section: "Compréhension", q: "Quel phénomène est décrit dans ce texte ?", points: 1, answer: "L'exode rural : le départ massif des jeunes des campagnes vers la ville." },
      { section: "Compréhension", q: "Pourquoi les jeunes partent-ils en ville ?", points: 1, answer: "Ils espèrent y trouver du travail, de l'argent et une vie moderne." },
      { section: "Compréhension", q: "Relève deux difficultés qu'ils rencontrent en ville.", points: 2, answer: "Emplois précaires faute de qualification (marchands ambulants, manœuvres) ; logement cher et surpeuplé ; quartiers inondés ; découragement." },
      { section: "Compréhension", q: "Quelles sont les conséquences de l'exode pour les villages ?", points: 2, answer: "Les campagnes perdent leurs forces vives : les vieux cultivent seuls, les champs sont trop grands pour eux, les écoles ferment faute d'élèves." },
      { section: "Compréhension", q: "Quelles solutions sont évoquées dans le dernier paragraphe ?", points: 2, answer: "Créer des activités au village (fermes avicoles, maraîchage irrigué, transformation des céréales) grâce à la formation et au crédit ; une école qui valorise la réussite sur place." },
      { section: "Vocabulaire", q: "Explique l'expression « les forces vives ».", points: 1, answer: "Les personnes jeunes et actives, capables de travailler et de produire." },
      { section: "Grammaire", q: "Quelle est la fonction de « faute d'élèves » ?", points: 1, answer: "Complément circonstanciel de cause." },
      { section: "Grammaire", q: "Relève une phrase qui contient une subordonnée complétive.", points: 1, answer: "« Encore faut-il que l'école leur montre que réussir ne signifie pas forcément partir. » (que l'école leur montre… / que réussir ne signifie pas…)." },
      { section: "Conjugaison", q: "Justifie le mode de « montre » dans « faut-il que l'école leur montre ».", points: 1, answer: "Subjonctif présent, imposé par la tournure « il faut que »." },
      { section: "Orthographe", q: "Corrige : « Les jeune son partie en ville ou ils on trouvé du travail. »", points: 2, answer: "Les jeunes sont partis en ville où ils ont trouvé du travail." },
      { section: "Production", q: "Paragraphe argumentatif (12 lignes) : « Peut-on réussir sa vie en restant au village ? »", points: 4, answer: "Attendus : thèse claire, deux arguments (activités rentables, qualité de vie, solidarité) avec exemples, une concession (manque d'infrastructures), conclusion." },
    ],
  },
];

export const moreDrills: Drill[] = [
  { cat: "Homophones", q: "… enfants ont oublié … cahiers.", options: ["Ses / ces", "Ces / leurs", "Ces / leur", "C'est / leurs"], correct: 1, explain: "« Ces enfants » (ceux-là) ; « leurs cahiers » (déterminant pluriel devant un nom pluriel)." },
  { cat: "Homophones", q: "Il s'est … de bonne heure pour … au marché.", options: ["levé / aller", "lever / allé", "levé / allé", "lever / aller"], correct: 0, explain: "« s'est levé » : participe ; « pour aller » : infinitif après une préposition (remplace par « vendu / vendre »)." },
  { cat: "Homophones", q: "… -tu pris ton cahier ? Il est resté … la maison.", options: ["A / à", "As / à", "As / a", "À / a"], correct: 1, explain: "« As-tu » : verbe avoir (2e pers.) ; « à la maison » : préposition." },
  { cat: "Homophones", q: "Je ne sais pas … il viendra, … demain … après-demain.", options: ["ou / où / ou", "où / ou / où", "quand / ou / ou", "quant / ou / ou"], correct: 2, explain: "« quand » = à quel moment ; « ou » = ou bien. « Quant à » signifie « en ce qui concerne »." },
  { cat: "Homophones", q: "Les élèves … sont attentifs réussissent ; … aux autres, ils doivent travailler.", options: ["qui / quant", "qu'il / quand", "qui / quand", "qu'ils / quant"], correct: 0, explain: "« qui » pronom relatif sujet ; « quant aux autres » = en ce qui concerne les autres." },
  { cat: "Participe passé", q: "La lettre que je t'ai (envoyer) est arrivée.", options: ["envoyé", "envoyée", "envoyés", "envoyer"], correct: 1, explain: "COD « que » (= la lettre, féminin singulier) placé avant l'auxiliaire avoir." },
  { cat: "Participe passé", q: "Combien de livres as-tu (lire) ?", options: ["lu", "lus", "lue", "lues"], correct: 1, explain: "COD « combien de livres » placé avant : accord au masculin pluriel." },
  { cat: "Participe passé", q: "Ils ont (marcher) pendant deux heures.", options: ["marchés", "marché", "marcher", "marchait"], correct: 1, explain: "Pas de COD (pendant deux heures est un CC de temps) : pas d'accord." },
  { cat: "Participe passé", q: "Les fruits qu'elle a (cueillir) sont mûrs.", options: ["cueilli", "cueillie", "cueillis", "cueillies"], correct: 2, explain: "COD « qu' » = les fruits (masculin pluriel) placé avant." },
  { cat: "Participe passé", q: "Les maîtresses se sont (parler) longtemps.", options: ["parlées", "parlé", "parlés", "parler"], correct: 1, explain: "On parle À quelqu'un : « se » est COI, donc pas d'accord." },
  { cat: "Conjugaison", q: "Passé simple de « faire », 1re personne du pluriel :", options: ["nous faisâmes", "nous fîmes", "nous fûmes", "nous faisions"], correct: 1, explain: "faire → je fis, nous fîmes, ils firent. (« fûmes » vient de « être »)." },
  { cat: "Conjugaison", q: "Passé simple de « voir », 3e personne du pluriel :", options: ["ils virent", "ils voyèrent", "ils voirent", "ils vurent"], correct: 0, explain: "voir → il vit, ils virent." },
  { cat: "Conjugaison", q: "Il faut que nous (aller) à l'école.", options: ["allons", "allions", "irions", "aillons"], correct: 1, explain: "Subjonctif présent d'aller : que nous allions." },
  { cat: "Conjugaison", q: "Je veux que tu (venir) demain.", options: ["viens", "viennes", "viendras", "venais"], correct: 1, explain: "« vouloir que » + subjonctif : que tu viennes." },
  { cat: "Conjugaison", q: "Quand tu (finir) tes devoirs, tu pourras sortir.", options: ["finiras", "auras fini", "finis", "aurais fini"], correct: 1, explain: "Antériorité dans le futur : futur antérieur (quand tu auras fini)." },
  { cat: "Conjugaison", q: "Si tu avais travaillé, tu (réussir).", options: ["réussirais", "aurais réussi", "réussiras", "avais réussi"], correct: 1, explain: "Si + plus-que-parfait → conditionnel passé." },
  { cat: "Conjugaison", q: "Futur de « envoyer », 1re personne du singulier :", options: ["j'envoyerai", "j'enverrai", "j'envoirai", "j'enverai"], correct: 1, explain: "Futur irrégulier : j'enverrai." },
  { cat: "Nature & fonction", q: "« Le livre de Fatou est neuf. » Fonction de « de Fatou » :", options: ["COI", "complément du nom", "CC de lieu", "attribut"], correct: 1, explain: "Il complète le nom « livre » : complément du nom." },
  { cat: "Nature & fonction", q: "« Ils l'ont élu président. » Fonction de « président » :", options: ["COD", "attribut du COD", "attribut du sujet", "apposition"], correct: 1, explain: "Il qualifie le COD « l' » par l'intermédiaire du verbe : attribut du COD." },
  { cat: "Nature & fonction", q: "« Il travaille pour réussir. » Fonction de « pour réussir » :", options: ["CC de cause", "CC de but", "COI", "CC de manière"], correct: 1, explain: "« pour » + infinitif exprime le but." },
  { cat: "Nature & fonction", q: "Nature de « dont » dans « l'élève dont je parle » :", options: ["conjonction", "pronom relatif", "préposition", "adverbe"], correct: 1, explain: "« dont » est un pronom relatif (= de qui)." },
  { cat: "Nature & fonction", q: "« La cour est balayée par les élèves. » Fonction de « par les élèves » :", options: ["COI", "complément d'agent", "CC de moyen", "sujet"], correct: 1, explain: "À la voix passive, celui qui fait l'action est le complément d'agent." },
  { cat: "Propositions", q: "« Bien qu'il pleuve, nous sortirons. » La subordonnée exprime :", options: ["la cause", "la concession", "le temps", "la condition"], correct: 1, explain: "« bien que » + subjonctif : concession (opposition)." },
  { cat: "Propositions", q: "« Il a tant couru qu'il est épuisé. » La subordonnée exprime :", options: ["la conséquence", "la comparaison", "le but", "la cause"], correct: 0, explain: "« tant… que » : conséquence." },
  { cat: "Propositions", q: "« J'ai vu l'enfant qui pleurait. » Nombre de propositions :", options: ["1", "2", "3", "0"], correct: 1, explain: "Deux verbes conjugués (ai vu, pleurait) → deux propositions : principale + relative." },
  { cat: "Transformations", q: "Voix passive de « Le maître corrige les copies » :", options: ["Les copies sont corrigées par le maître.", "Les copies ont été corrigées par le maître.", "Le maître est corrigé par les copies.", "Les copies corrigent le maître."], correct: 0, explain: "On garde le temps du verbe actif (présent) : sont corrigées." },
  { cat: "Transformations", q: "Discours indirect : Il dit : « Je viendrai demain. »", options: ["Il dit qu'il viendra demain.", "Il dit qu'il viendrait le lendemain.", "Il dit que je viendrai demain.", "Il dit qu'il venait demain."], correct: 0, explain: "Verbe introducteur au présent : pas de changement de temps ; changement de personne (je → il)." },
  { cat: "Transformations", q: "Discours indirect : Il a dit : « Je viendrai demain. »", options: ["Il a dit qu'il viendra demain.", "Il a dit qu'il viendrait le lendemain.", "Il a dit que je viendrai demain.", "Il a dit qu'il venait demain."], correct: 1, explain: "Verbe introducteur au passé : futur → conditionnel, demain → le lendemain." },
  { cat: "Transformations", q: "Forme négative de « Il a encore faim » :", options: ["Il n'a pas encore faim.", "Il n'a plus faim.", "Il n'a jamais faim.", "Il n'a rien faim."], correct: 1, explain: "« encore » devient « ne… plus » à la forme négative." },
  { cat: "Vocabulaire", q: "Synonyme de « sobre » :", options: ["modéré", "excessif", "ivre", "lourd"], correct: 0, explain: "Sobre = modéré, mesuré, simple." },
  { cat: "Vocabulaire", q: "Le suffixe « -cide » (insecticide, homicide) signifie :", options: ["qui aime", "qui tue", "qui mange", "qui protège"], correct: 1, explain: "-cide vient du latin caedere : tuer." },
  { cat: "Vocabulaire", q: "« Cet élève est un puits de science » est :", options: ["une comparaison", "une métaphore", "une litote", "une antithèse"], correct: 1, explain: "L'élève est assimilé à un puits sans outil de comparaison : métaphore." },
  { cat: "Vocabulaire", q: "« Va, je ne te hais point » (pour dire « je t'aime ») est :", options: ["une hyperbole", "une litote", "un euphémisme", "une métaphore"], correct: 1, explain: "La litote dit moins pour faire entendre plus." },
];

/** Phrases à corriger : les mots fautifs sont notés mot{correction}. */
export const errorSentences: string[] = [
  "Les enfant{enfants} de l'école sont partie{partis} en excursion.",
  "Hier, le maître nous a donner{donné} des exercices difficile{difficiles}.",
  "Il faut que tu fait{fasses} tes devoirs avant de jouer.",
  "Les fille{filles} qui sont venu{venues} ce matin habitent loin.",
  "Nous avons acheter{acheté} du riz et de l'huile au marché.",
  "Elle a mangé les mangues qu'elle a cueilli{cueillies}.",
  "Ces{Ses} parents lui ont offert un vélo pour son anniversaire.",
  "Je leurs{leur} ai donné leur{leurs} cahiers.",
  "Mon frère et moi sommes allé{allés} à Thiès.",
  "Les élèves doit{doivent} respecter le règlement intérieur.",
  "Hier, nous somme{sommes} allés au marché de Tilène.",
  "La maîtresse a félicité les élèves qui ont bien travailler{travaillé}.",
  "Quel{Quelle} belle journée nous avons passé{passée} !",
  "C'est un enfant très gentille{gentil} et serviable.",
  "Si j'aurais{avais} su, je serais venu plus tôt.",
  "Ils se sont lavés{lavé} les mains avant de manger.",
  "Tout{Toute} la classe a réussi l'examen.",
  "Les femmes du village vont puisé{puiser} de l'eau au puit{puits}.",
  "Le directeur et les maîtres est{sont} en réunion.",
  "Malgré{Bien} qu'il soit malade, il est venu à l'école.",
  "Je me rappelle de{∅} cette histoire.",
  "Les leçons que nous avons appris{apprises} étaient intéressantes.",
  "Ou{Où} as-tu mis le livre que je t'ai prêter{prêté} ?",
  "Il a beaucoup de livres mais il les lis{lit} rarement.",
  "Les deux soeurs se ressemble{ressemblent} beaucoup.",
  "Après que vous soyez{êtes} partis, il a commencé à pleuvoir.",
  "Nous nous sommes promené{promenés} au bord du fleuve.",
];

export type ParsedToken = { word: string; correction?: string };

export function parseErrorSentence(s: string): ParsedToken[] {
  const tokens: ParsedToken[] = [];
  const re = /([^\s{]+)(?:\{([^}]*)\})?/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(s))) tokens.push({ word: m[1], correction: m[2] });
  return tokens;
}
