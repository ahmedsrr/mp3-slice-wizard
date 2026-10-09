export const methodSteps = [
  {
    title: "1. Analyser le sujet (15 min)",
    points: [
      "Recopie le sujet et souligne les mots clés ; définis chacun d'eux.",
      "Repère le type de consigne : « Commentez » / « Expliquez » (analytique), « Discutez » / « Partagez-vous cet avis ? » (dialectique), « Quels sont… » (thématique).",
      "Repère l'auteur de la citation et son contexte s'il y en a un.",
      "Reformule le sujet avec tes propres mots pour être sûr de l'avoir compris.",
    ],
  },
  {
    title: "2. Formuler la problématique",
    points: [
      "C'est la question centrale que pose le sujet, souvent sous forme de tension : « Dans quelle mesure… ? », « En quoi… ? », « … ou bien … ? ».",
      "Elle ne doit pas recopier le sujet, mais en faire apparaître l'enjeu.",
    ],
  },
  {
    title: "3. Chercher les idées et les exemples (30 min)",
    points: [
      "Fais un remue-méninges au brouillon : idées, arguments, exemples.",
      "Varie les exemples : vécu scolaire, réalité sénégalaise et africaine, lectures (Mariama Bâ, Cheikh Hamidou Kane, Amadou Hampâté Bâ…), actualité, réformes éducatives.",
      "Chaque argument = une idée + une explication + un exemple précis.",
    ],
  },
  {
    title: "4. Construire le plan",
    points: [
      "Plan dialectique (thèse / antithèse / synthèse) : pour « Discutez », « Partagez-vous ce point de vue ? ».",
      "Plan analytique (constat / causes / conséquences / solutions) : pour un problème de société (abandon scolaire, violence…).",
      "Plan thématique (aspects successifs) : pour « Quels sont les rôles de… ? ».",
      "2 ou 3 parties, chacune avec 2 ou 3 arguments. Équilibre les parties.",
    ],
  },
  {
    title: "5. Rédiger l'introduction au propre",
    points: [
      "Amorce (phrase d'accroche générale, mais en lien direct avec le sujet).",
      "Sujet posé : cite ou reformule le sujet entre guillemets.",
      "Problématique : la question centrale.",
      "Annonce du plan : « Nous verrons d'abord… puis… enfin… »",
    ],
  },
  {
    title: "6. Développement",
    points: [
      "Un paragraphe par argument, avec un alinéa.",
      "Phrase d'introduction de partie et phrase de transition entre les parties.",
      "Utilise des connecteurs logiques variés.",
    ],
  },
  {
    title: "7. Conclusion",
    points: [
      "Bilan : réponds clairement à la problématique.",
      "Ouverture : élargis vers une question voisine (sans poser une nouvelle problématique impossible à traiter).",
    ],
  },
  {
    title: "8. Relecture (15 min)",
    points: ["Orthographe, accords, conjugaison, ponctuation, majuscules.", "Lisibilité de l'écriture, propreté de la copie, marges.", "Vérifie que tu n'as pas oublié de répondre au sujet."],
  },
];

export const timePlan = [
  { label: "Analyse du sujet + problématique", min: 15 },
  { label: "Recherche d'idées + plan détaillé", min: 35 },
  { label: "Rédaction de l'introduction et de la conclusion au brouillon", min: 15 },
  { label: "Rédaction au propre", min: 100 },
  { label: "Relecture", min: 15 },
];

export const connecteurs = [
  { role: "Introduire / énumérer", words: ["D'abord", "Tout d'abord", "En premier lieu", "Ensuite", "Puis", "De plus", "En outre", "Par ailleurs", "Enfin"] },
  { role: "Opposer / nuancer", words: ["Mais", "Cependant", "Toutefois", "Néanmoins", "Pourtant", "En revanche", "Au contraire", "Certes… mais"] },
  { role: "Expliquer / justifier", words: ["Car", "En effet", "Parce que", "Puisque", "Étant donné que", "C'est-à-dire"] },
  { role: "Illustrer", words: ["Par exemple", "Ainsi", "C'est le cas de", "Comme en témoigne", "Pour preuve"] },
  { role: "Conclure / conséquence", words: ["Donc", "Ainsi", "Par conséquent", "C'est pourquoi", "En somme", "En définitive", "Au total"] },
  { role: "Transition", words: ["Après avoir montré que…, il convient d'examiner…", "Si…, il n'en demeure pas moins que…", "Au-delà de…, il faut également considérer…"] },
];

export const citations = [
  { text: "L'éducation est l'arme la plus puissante que l'on puisse utiliser pour changer le monde.", author: "Nelson Mandela" },
  { text: "En Afrique, quand un vieillard meurt, c'est une bibliothèque qui brûle.", author: "Amadou Hampâté Bâ" },
  { text: "Il faut aller apprendre chez eux l'art de vaincre sans avoir raison.", author: "Cheikh Hamidou Kane, L'Aventure ambiguë (la Grande Royale)" },
  { text: "Ouvrir une école, c'est fermer une prison.", author: "Attribué à Victor Hugo" },
  { text: "Mieux vaut une tête bien faite que bien pleine.", author: "Montaigne, Essais" },
  { text: "Science sans conscience n'est que ruine de l'âme.", author: "Rabelais, Pantagruel" },
  { text: "L'homme ne peut devenir homme que par l'éducation.", author: "Kant, Réflexions sur l'éducation" },
  { text: "Après le pain, l'éducation est le premier besoin d'un peuple.", author: "Danton" },
  { text: "Le travail éloigne de nous trois grands maux : l'ennui, le vice et le besoin.", author: "Voltaire, Candide" },
  { text: "L'esprit n'est pas un vase qu'il faut remplir, mais un feu qu'il faut allumer.", author: "D'après Plutarque" },
];

export type Subject = {
  id: string;
  theme: string;
  sujet: string;
  type: "Dialectique" | "Analytique" | "Thématique";
  motsCles: string[];
  problematique: string;
  plan: { titre: string; idees: string[] }[];
};

export const subjects: Subject[] = [
  {
    id: "ecole-prison",
    theme: "École et société",
    sujet: "« Ouvrir une école, c'est fermer une prison. » Commentez et discutez cette affirmation.",
    type: "Dialectique",
    motsCles: ["école : lieu d'instruction et d'éducation", "prison : symbole de la délinquance, de l'exclusion", "fermer : prévenir, rendre inutile"],
    problematique: "L'école suffit-elle, à elle seule, à prévenir la délinquance et à construire une société plus juste ?",
    plan: [
      { titre: "I. L'école, rempart contre la délinquance", idees: ["Elle transmet des valeurs civiques et morales (respect, discipline, citoyenneté)", "Elle donne des compétences pour s'insérer et gagner sa vie honnêtement", "Elle occupe et encadre les jeunes, les éloigne de la rue"] },
      { titre: "II. Mais l'école ne peut pas tout", idees: ["Des diplômés au chômage peuvent basculer dans la délinquance", "Le rôle de la famille, de la communauté et de l'économie", "La qualité de l'école compte autant que son existence (effectifs pléthoriques, abris provisoires)"] },
      { titre: "III. Une école de qualité, au cœur d'une politique globale", idees: ["Lier l'école à l'emploi (formation professionnelle)", "Associer parents et communauté", "Valoriser l'enseignant"] },
    ],
  },
  {
    id: "role-enseignant",
    theme: "Le métier d'enseignant",
    sujet: "« Le rôle de l'enseignant ne se limite pas à transmettre des connaissances. » Partagez-vous ce point de vue ?",
    type: "Dialectique",
    motsCles: ["rôle : fonction, mission", "transmettre des connaissances : instruire", "ne se limite pas : il y a d'autres missions"],
    problematique: "Quelles sont les missions de l'enseignant au-delà de l'instruction, et jusqu'où peuvent-elles aller ?",
    plan: [
      { titre: "I. Transmettre des savoirs reste la mission première", idees: ["Lire, écrire, compter : les fondamentaux", "Préparer les élèves aux examens et à la suite de leurs études", "La compétence disciplinaire et didactique est indispensable"] },
      { titre: "II. Mais l'enseignant est aussi éducateur", idees: ["Il transmet des valeurs (civisme, respect, teranga)", "Il est un modèle par son comportement (exemplarité)", "Il repère les difficultés (élèves en souffrance, abandon) et accompagne"] },
      { titre: "III. … et acteur du développement local", idees: ["Lien avec les parents et la communauté (CGE, APE)", "Sensibilisation (santé, environnement, scolarisation des filles)", "Limites : il ne peut remplacer la famille ni l'État"] },
    ],
  },
  {
    id: "langues-nationales",
    theme: "Langues et école",
    sujet: "Faut-il enseigner dans les langues nationales à l'école élémentaire au Sénégal ? Discutez.",
    type: "Dialectique",
    motsCles: ["langues nationales : wolof, pulaar, sérère, diola, mandingue, soninké…", "école élémentaire : CI au CM2", "enseigner dans : langue d'enseignement, pas seulement matière"],
    problematique: "L'introduction des langues nationales favorise-t-elle les apprentissages sans compromettre la maîtrise du français ?",
    plan: [
      { titre: "I. Des avantages pédagogiques et culturels", idees: ["L'enfant apprend mieux dans la langue qu'il comprend", "Lien école-famille renforcé, parents impliqués", "Valorisation des cultures et identités"] },
      { titre: "II. Des difficultés réelles", idees: ["Diversité linguistique, choix de la langue dans les zones mixtes", "Manque de manuels et d'enseignants formés", "Crainte des parents pour la réussite en français (langue officielle des examens)"] },
      { titre: "III. Vers un bilinguisme réussi", idees: ["Transition progressive langue nationale → français", "Formation des maîtres et production de matériel didactique", "Sensibilisation des communautés"] },
    ],
  },
  {
    id: "filles",
    theme: "Équité",
    sujet: "La scolarisation des filles : enjeux et obstacles. Analysez.",
    type: "Analytique",
    motsCles: ["scolarisation : accès ET maintien à l'école", "enjeux : ce qu'on gagne", "obstacles : ce qui empêche"],
    problematique: "Pourquoi la scolarisation des filles est-elle essentielle, et comment lever les obstacles qui l'entravent ?",
    plan: [
      { titre: "I. Les enjeux", idees: ["Droit fondamental et équité", "Santé de la famille, recul des mariages précoces", "Développement économique (« éduquer une fille, c'est éduquer une nation »)"] },
      { titre: "II. Les obstacles", idees: ["Mariages et grossesses précoces", "Travaux domestiques, corvée d'eau", "Pauvreté, éloignement des collèges, insécurité, manque de toilettes séparées"] },
      { titre: "III. Les solutions", idees: ["Sensibilisation des parents et leaders religieux", "Bourses, cantines, toilettes séparées", "Modèles féminins (enseignantes), lutte contre les violences"] },
    ],
  },
  {
    id: "abandon",
    theme: "Système éducatif",
    sujet: "L'abandon scolaire : causes, conséquences et solutions.",
    type: "Analytique",
    motsCles: ["abandon : départ définitif avant la fin du cycle", "causes / conséquences / solutions : plan imposé"],
    problematique: "Comment expliquer l'abandon scolaire et comment l'école et la société peuvent-elles le réduire ?",
    plan: [
      { titre: "I. Les causes", idees: ["Pauvreté, travail des enfants, migrations saisonnières", "Échecs répétés, redoublements, classes pléthoriques", "Mariages précoces, éloignement, désintérêt"] },
      { titre: "II. Les conséquences", idees: ["Pour l'individu : analphabétisme de retour, chômage, vulnérabilité", "Pour la société : délinquance, faible productivité", "Gaspillage des ressources investies"] },
      { titre: "III. Les solutions", idees: ["Cantines scolaires, gratuité effective, fournitures", "Remédiation pédagogique, suivi individualisé", "Passerelles : écoles communautaires de base, formation professionnelle"] },
    ],
  },
  {
    id: "violence",
    theme: "Climat scolaire",
    sujet: "« Qui aime bien châtie bien. » Pensez-vous que les châtiments corporels aient leur place à l'école ?",
    type: "Dialectique",
    motsCles: ["châtiments corporels : punitions physiques", "qui aime bien châtie bien : proverbe qui justifie la sévérité"],
    problematique: "La discipline nécessaire à l'apprentissage passe-t-elle par la punition physique ?",
    plan: [
      { titre: "I. Les arguments en faveur de la sévérité", idees: ["Tradition éducative, discipline exigée par les familles", "Peur de la sanction = respect de la règle (apparent)"] },
      { titre: "II. Les châtiments corporels sont nuisibles et interdits", idees: ["Atteinte à la dignité et aux droits de l'enfant", "Peur, rejet de l'école, abandon", "Violence qui engendre la violence"] },
      { titre: "III. Une discipline positive", idees: ["Règles construites avec les élèves", "Sanctions éducatives (réparation), valorisation", "Dialogue avec les parents"] },
    ],
  },
  {
    id: "tic",
    theme: "Numérique",
    sujet: "Les technologies de l'information et de la communication (TIC) : chance ou menace pour l'école ?",
    type: "Dialectique",
    motsCles: ["TIC : internet, téléphone, ordinateur, tablettes", "chance / menace : évaluer"],
    problematique: "Comment l'école peut-elle tirer profit des TIC tout en se protégeant de leurs dérives ?",
    plan: [
      { titre: "I. Une chance", idees: ["Accès à l'information, ressources numériques", "Enseignement à distance, formation continue des maîtres", "Motivation des élèves, compétences du XXIe siècle"] },
      { titre: "II. Des menaces", idees: ["Distraction, triche, dépendance", "Cyberharcèlement, contenus inappropriés", "Fracture numérique (électricité, connexion en milieu rural)"] },
      { titre: "III. Pour une intégration raisonnée", idees: ["Éducation au numérique et à l'esprit critique", "Équipement et formation des enseignants", "Charte d'usage à l'école"] },
    ],
  },
  {
    id: "famille-ecole",
    theme: "Partenariat",
    sujet: "« L'éducation de l'enfant est l'affaire de l'école. » Discutez cette affirmation.",
    type: "Dialectique",
    motsCles: ["éducation : formation globale (savoirs, valeurs, comportements)", "l'affaire de : la responsabilité exclusive"],
    problematique: "L'école peut-elle, à elle seule, assumer l'éducation de l'enfant ?",
    plan: [
      { titre: "I. L'école joue un rôle majeur", idees: ["Elle instruit et socialise", "Elle transmet des valeurs communes (citoyenneté)"] },
      { titre: "II. Mais la famille est la première éducatrice", idees: ["Premières valeurs, langue, comportements", "Suivi des devoirs, santé, nutrition"] },
      { titre: "III. Une coresponsabilité", idees: ["Communauté, médias, religion, société civile", "Partenariat école-parents (APE, CGE)"] },
    ],
  },
  {
    id: "vocation",
    theme: "Le métier d'enseignant",
    sujet: "Enseigner : un métier ou une vocation ? Justifiez votre point de vue.",
    type: "Dialectique",
    motsCles: ["métier : profession apprise, rémunérée, avec des compétences", "vocation : appel intérieur, engagement, passion"],
    problematique: "Suffit-il d'aimer les enfants pour bien enseigner, ou faut-il avant tout une formation professionnelle ?",
    plan: [
      { titre: "I. Une vocation", idees: ["Patience, amour des enfants, sens du sacrifice", "Engagement dans des conditions difficiles"] },
      { titre: "II. Un métier qui s'apprend", idees: ["Didactique, psychologie de l'enfant, gestion de classe", "Formation initiale (CRFPE) et continue", "Droits et devoirs, déontologie"] },
      { titre: "III. Les deux à la fois", idees: ["La vocation donne le sens, la formation donne les moyens", "Ce que j'apporterai, moi, au métier"] },
    ],
  },
  {
    id: "mandela",
    theme: "Éducation et développement",
    sujet: "« L'éducation est l'arme la plus puissante que l'on puisse utiliser pour changer le monde. » (Nelson Mandela). Expliquez et illustrez.",
    type: "Thématique",
    motsCles: ["éducation", "arme : moyen de lutte, de transformation", "changer le monde : progrès social, économique, politique"],
    problematique: "En quoi l'éducation est-elle un levier de transformation de l'individu et de la société ?",
    plan: [
      { titre: "I. Elle transforme l'individu", idees: ["Autonomie, esprit critique, dignité", "Ascenseur social"] },
      { titre: "II. Elle transforme la société", idees: ["Santé, citoyenneté, démocratie", "Développement économique, innovation", "Exemples : pays ayant misé sur l'éducation"] },
      { titre: "III. À condition qu'elle soit de qualité et pour tous", idees: ["Équité (filles, zones rurales)", "Adaptée aux réalités et aux langues", "Limites : une arme peut être mal utilisée (éducation sans valeurs)"] },
    ],
  },
  {
    id: "tete-bien-faite",
    theme: "Pédagogie",
    sujet: "« Mieux vaut une tête bien faite que bien pleine. » (Montaigne). Que pensez-vous de cette affirmation ?",
    type: "Dialectique",
    motsCles: ["tête bien pleine : accumulation de connaissances, mémorisation", "tête bien faite : jugement, raisonnement, esprit critique"],
    problematique: "Faut-il privilégier la formation du jugement ou l'acquisition des connaissances ?",
    plan: [
      { titre: "I. La supériorité d'une tête bien faite", idees: ["Savoir raisonner, résoudre des problèmes", "S'adapter dans un monde qui change", "Critique du par cœur sans compréhension"] },
      { titre: "II. Mais une tête vide ne peut bien raisonner", idees: ["Les connaissances sont la matière du jugement", "La mémoire reste un outil d'apprentissage"] },
      { titre: "III. Concilier savoirs et jugement", idees: ["Approche par compétences, situations-problèmes", "Rôle du maître : faire comprendre avant de faire retenir"] },
    ],
  },
  {
    id: "daara",
    theme: "Système éducatif",
    sujet: "Quelle place pour les daaras modernes dans le système éducatif sénégalais ?",
    type: "Analytique",
    motsCles: ["daara : école coranique", "moderne : intégrant les apprentissages de base (lecture, calcul, langues)", "système éducatif : ensemble des offres de formation"],
    problematique: "Comment intégrer les daaras au système éducatif pour garantir à tous les enfants une éducation de qualité ?",
    plan: [
      { titre: "I. Un constat", idees: ["Forte demande sociale d'éducation religieuse", "Nombreux enfants hors du système formel", "Problème de la mendicité dans certains daaras"] },
      { titre: "II. Les apports des daaras modernes", idees: ["Concilier éducation religieuse et compétences de base", "Passerelles vers l'école formelle et la vie active"] },
      { titre: "III. Les conditions de réussite", idees: ["Encadrement, normes et inspection", "Formation des maîtres coraniques", "Protection des enfants"] },
    ],
  },
  {
    id: "environnement",
    theme: "Citoyenneté",
    sujet: "Quel rôle l'école peut-elle jouer dans la protection de l'environnement ?",
    type: "Thématique",
    motsCles: ["école : élèves, maîtres, programmes", "protection de l'environnement : déchets, eau, reboisement, climat"],
    problematique: "Comment l'école peut-elle former des citoyens responsables vis-à-vis de leur environnement ?",
    plan: [
      { titre: "I. Informer et sensibiliser", idees: ["Contenus d'éducation environnementale (Découverte du monde)", "Journées de sensibilisation"] },
      { titre: "II. Agir concrètement", idees: ["Clubs environnement, jardins scolaires, reboisement", "Gestion des déchets et de l'eau à l'école"] },
      { titre: "III. Rayonner sur la communauté", idees: ["Les élèves, ambassadeurs dans les familles", "Partenariats avec collectivités et ONG"] },
    ],
  },
  {
    id: "effectifs",
    theme: "Système éducatif",
    sujet: "Les effectifs pléthoriques constituent-ils un obstacle insurmontable à la qualité de l'enseignement ?",
    type: "Dialectique",
    motsCles: ["effectifs pléthoriques : classes surchargées", "insurmontable : impossible à dépasser", "qualité : réussite réelle des apprentissages"],
    problematique: "Peut-on assurer un enseignement de qualité dans des classes surchargées ?",
    plan: [
      { titre: "I. Un obstacle réel", idees: ["Suivi individuel difficile, correction des cahiers", "Indiscipline, bruit, manque de tables-bancs"] },
      { titre: "II. Mais pas insurmontable", idees: ["Pédagogie des grands groupes : travail de groupe, tutorat", "Organisation de la classe, rituels, gestion du temps"] },
      { titre: "III. Des solutions structurelles", idees: ["Construction de salles, recrutement", "Double flux, formation des enseignants"] },
    ],
  },
  {
    id: "hampate-ba",
    theme: "Culture",
    sujet: "« En Afrique, quand un vieillard meurt, c'est une bibliothèque qui brûle. » (Amadou Hampâté Bâ). Expliquez cette pensée et montrez son actualité.",
    type: "Thématique",
    motsCles: ["vieillard : dépositaire du savoir traditionnel", "bibliothèque : lieu de conservation du savoir", "brûle : perte irrémédiable", "tradition orale"],
    problematique: "Comment préserver et transmettre le patrimoine oral africain à l'ère de l'école moderne ?",
    plan: [
      { titre: "I. Explication", idees: ["La tradition orale : contes, généalogies, savoirs (pharmacopée, agriculture)", "Le griot, le vieillard : mémoires vivantes"] },
      { titre: "II. Une menace actuelle", idees: ["Urbanisation, déclin des veillées", "Médias et numérique qui remplacent la transmission orale"] },
      { titre: "III. Le rôle de l'école", idees: ["Intégrer contes et savoirs locaux dans les programmes", "Collecter, écrire, enregistrer (projets d'élèves)", "Langues nationales comme vecteurs"] },
    ],
  },
];

export const grille = [
  "J'ai défini les mots clés du sujet",
  "Mon introduction contient amorce, sujet posé, problématique et annonce du plan",
  "Chaque partie commence par une phrase qui annonce l'idée directrice",
  "Chaque argument est illustré par un exemple précis",
  "J'ai utilisé des connecteurs logiques variés",
  "J'ai fait des transitions entre les parties",
  "Ma conclusion répond à la problématique et ouvre le débat",
  "J'ai relu l'orthographe, les accords et la ponctuation",
  "Je n'ai jamais écrit de phrase de plus de 3 lignes",
  "J'ai répondu au sujet posé sans hors-sujet",
];
