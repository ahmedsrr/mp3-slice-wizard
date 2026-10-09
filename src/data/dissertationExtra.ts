import type { Subject } from "./dissertation";

export const moreSubjects: Subject[] = [
  {
    id: "lecture-ecrans",
    theme: "Numérique",
    sujet: "« Les jeunes ne lisent plus. » Que pensez-vous de cette affirmation ?",
    type: "Dialectique",
    motsCles: ["jeunes : élèves, adolescents", "lire : livres, mais aussi presse, écrans", "ne… plus : déclin par rapport au passé"],
    problematique: "La lecture a-t-elle réellement disparu chez les jeunes, ou a-t-elle changé de forme ?",
    plan: [
      { titre: "I. Un recul réel de la lecture de livres", idees: ["Concurrence des écrans, réseaux sociaux, vidéos", "Coût des livres, rareté des bibliothèques", "Faiblesse des compétences en lecture constatée à l'école"] },
      { titre: "II. Mais les jeunes lisent autrement", idees: ["Messages, articles, contenus numériques", "Bandes dessinées, mangas, livres numériques", "Clubs de lecture et concours qui mobilisent"] },
      { titre: "III. Redonner le goût de la lecture", idees: ["Bibliothèques de classe, lecture quotidienne", "Rôle du maître et des parents comme modèles", "Livres en langues nationales et adaptés au vécu des élèves"] },
    ],
  },
  {
    id: "travail-enfants",
    theme: "Équité",
    sujet: "Le travail des enfants : causes, conséquences et solutions.",
    type: "Analytique",
    motsCles: ["travail des enfants : activités qui privent l'enfant de scolarité, de santé ou de jeu", "causes / conséquences / solutions : plan imposé"],
    problematique: "Pourquoi tant d'enfants travaillent-ils encore et comment les ramener à l'école ?",
    plan: [
      { titre: "I. Les causes", idees: ["Pauvreté des familles", "Traditions (apprentissage précoce, aide aux champs)", "Éloignement ou coût de l'école"] },
      { titre: "II. Les conséquences", idees: ["Abandon scolaire, analphabétisme", "Risques pour la santé, accidents, exploitation", "Reproduction de la pauvreté"] },
      { titre: "III. Les solutions", idees: ["Application des lois et conventions (CDE)", "Cantines, bourses, gratuité réelle", "Sensibilisation des parents, alternatives éducatives"] },
    ],
  },
  {
    id: "civisme",
    theme: "Citoyenneté",
    sujet: "« L'école doit former des citoyens avant de former des diplômés. » Discutez.",
    type: "Dialectique",
    motsCles: ["citoyen : personne qui connaît et respecte ses droits et devoirs", "diplômé : titulaire d'un titre scolaire", "avant : priorité"],
    problematique: "La mission première de l'école est-elle de transmettre des valeurs ou de délivrer des diplômes ?",
    plan: [
      { titre: "I. Former le citoyen, une priorité", idees: ["Valeurs : respect, civisme, tolérance, bien commun", "Un diplômé sans morale peut nuire (corruption)", "Cohésion nationale"] },
      { titre: "II. Mais le diplôme reste indispensable", idees: ["Insertion professionnelle, attentes des familles", "Compétences nécessaires au développement"] },
      { titre: "III. Deux missions complémentaires", idees: ["Éducation civique intégrée à toutes les disciplines", "Gouvernements scolaires, clubs, exemplarité du maître"] },
    ],
  },
  {
    id: "redoublement",
    theme: "Pédagogie",
    sujet: "Le redoublement est-il une solution à l'échec scolaire ?",
    type: "Dialectique",
    motsCles: ["redoublement : refaire la même classe", "échec scolaire : difficultés durables à atteindre les objectifs"],
    problematique: "Faire recommencer une année permet-il vraiment à l'élève en difficulté de progresser ?",
    plan: [
      { titre: "I. Les arguments en faveur du redoublement", idees: ["Seconde chance de consolider les bases", "Éviter d'envoyer un élève non préparé dans la classe supérieure"] },
      { titre: "II. Ses limites", idees: ["Démotivation, perte d'estime de soi", "Coût pour le système, effectifs pléthoriques", "Risque accru d'abandon"] },
      { titre: "III. Des alternatives", idees: ["Remédiation immédiate, soutien scolaire", "Évaluation formative, pédagogie différenciée", "Implication des parents"] },
    ],
  },
  {
    id: "maitre-modele",
    theme: "Le métier d'enseignant",
    sujet: "« Le maître doit être un modèle pour ses élèves et pour la communauté. » Commentez.",
    type: "Thématique",
    motsCles: ["modèle : exemple à imiter", "élèves et communauté : double public"],
    problematique: "En quoi l'exemplarité du maître conditionne-t-elle la réussite de sa mission ?",
    plan: [
      { titre: "I. Un modèle pour les élèves", idees: ["Ponctualité, tenue, langage", "Justice, équité, maîtrise de soi"] },
      { titre: "II. Un modèle pour la communauté", idees: ["Respect des valeurs locales, intégration", "Engagement dans la vie associative"] },
      { titre: "III. Une exigence lourde", idees: ["Pression sociale, conditions de vie difficiles", "Nécessité d'être soutenu et valorisé"] },
    ],
  },
  {
    id: "sante-ecole",
    theme: "Citoyenneté",
    sujet: "Quel rôle l'école peut-elle jouer dans l'éducation à la santé ?",
    type: "Thématique",
    motsCles: ["éducation à la santé : hygiène, nutrition, prévention des maladies", "rôle de l'école : missions possibles"],
    problematique: "Comment l'école peut-elle contribuer à la santé des élèves et de leurs familles ?",
    plan: [
      { titre: "I. Transmettre de bonnes pratiques", idees: ["Hygiène (lavage des mains), nutrition", "Prévention du paludisme, des maladies hydriques"] },
      { titre: "II. Agir dans l'école", idees: ["Points d'eau, latrines, cantines équilibrées", "Visites médicales, déparasitage"] },
      { titre: "III. Rayonner vers les familles", idees: ["Les élèves, relais de l'information", "Partenariat avec les postes de santé"] },
    ],
  },
  {
    id: "inclusion",
    theme: "Équité",
    sujet: "L'école inclusive : accueillir les enfants handicapés dans les classes ordinaires est-il possible ?",
    type: "Dialectique",
    motsCles: ["école inclusive : école qui accueille tous les enfants", "handicap : moteur, sensoriel, intellectuel", "possible : faisabilité"],
    problematique: "L'école ordinaire peut-elle donner à chaque enfant, quel que soit son handicap, les moyens de réussir ?",
    plan: [
      { titre: "I. Une exigence de justice", idees: ["Droit à l'éducation pour tous", "Lutte contre l'exclusion, bénéfices pour tous les élèves"] },
      { titre: "II. Des obstacles importants", idees: ["Bâtiments inadaptés, manque de matériel (braille…)", "Maîtres peu formés, classes pléthoriques", "Préjugés"] },
      { titre: "III. Les conditions de la réussite", idees: ["Formation des enseignants", "Aménagements, accompagnants", "Sensibilisation des élèves et des parents"] },
    ],
  },
  {
    id: "devoirs-maison",
    theme: "Pédagogie",
    sujet: "Les devoirs à la maison sont-ils utiles ?",
    type: "Dialectique",
    motsCles: ["devoirs à la maison : travail scolaire hors de la classe", "utiles : efficaces pour apprendre"],
    problematique: "Les devoirs à la maison renforcent-ils les apprentissages ou creusent-ils les inégalités ?",
    plan: [
      { titre: "I. Leur utilité", idees: ["Consolider, mémoriser", "Autonomie, habitude de travail", "Lien avec les parents"] },
      { titre: "II. Leurs limites", idees: ["Inégalités (aide des parents, lumière, temps)", "Fatigue, travaux domestiques"] },
      { titre: "III. Repenser les devoirs", idees: ["Courts, adaptés, déjà compris en classe", "Études surveillées, coins de lecture"] },
    ],
  },
  {
    id: "culture-tradition",
    theme: "Culture",
    sujet: "L'école moderne menace-t-elle les valeurs traditionnelles africaines ?",
    type: "Dialectique",
    motsCles: ["école moderne : héritée de la colonisation", "valeurs traditionnelles : respect des aînés, solidarité, oralité", "menace : danger de disparition"],
    problematique: "L'école peut-elle moderniser la société sans couper l'enfant de ses racines ?",
    plan: [
      { titre: "I. Une menace réelle", idees: ["Langue étrangère, contenus éloignés du vécu", "Individualisme, perte de l'autorité des aînés", "L'Aventure ambiguë de Cheikh Hamidou Kane"] },
      { titre: "II. Mais l'école peut aussi les préserver", idees: ["Langues nationales, contes, histoire africaine", "Valeurs universelles compatibles avec la tradition"] },
      { titre: "III. Une école enracinée et ouverte", idees: ["Curricula adaptés", "Participation de la communauté"] },
    ],
  },
  {
    id: "orientation",
    theme: "Système éducatif",
    sujet: "Faut-il développer la formation professionnelle dès la sortie de l'école élémentaire ?",
    type: "Dialectique",
    motsCles: ["formation professionnelle : apprentissage d'un métier", "dès la sortie de l'élémentaire : vers 12 ans"],
    problematique: "Orienter tôt vers un métier favorise-t-il l'insertion des jeunes ou limite-t-il leurs chances ?",
    plan: [
      { titre: "I. Des avantages", idees: ["Répondre aux besoins de l'économie", "Insertion rapide, lutte contre le chômage", "Valoriser les métiers manuels"] },
      { titre: "II. Des risques", idees: ["Orientation trop précoce, choix subi", "Bases générales insuffisantes"] },
      { titre: "III. Des passerelles", idees: ["Socle commun solide puis spécialisation", "Passerelles entre filières"] },
    ],
  },
  {
    id: "evaluation",
    theme: "Pédagogie",
    sujet: "« Les notes découragent plus qu'elles n'encouragent. » Partagez-vous cet avis ?",
    type: "Dialectique",
    motsCles: ["notes : évaluation chiffrée", "décourager / encourager : effet sur la motivation"],
    problematique: "L'évaluation chiffrée est-elle un moteur ou un frein pour l'apprentissage ?",
    plan: [
      { titre: "I. Les notes peuvent décourager", idees: ["Stigmatisation des mauvaises notes", "Compétition, peur de l'échec"] },
      { titre: "II. Elles peuvent aussi motiver", idees: ["Repère clair des progrès", "Émulation, récompense de l'effort"] },
      { titre: "III. Une évaluation au service de l'élève", idees: ["Évaluation formative, appréciations", "Valoriser les progrès"] },
    ],
  },
  {
    id: "ecole-emploi",
    theme: "Éducation et développement",
    sujet: "« L'école fabrique des chômeurs. » Que pensez-vous de cette affirmation ?",
    type: "Dialectique",
    motsCles: ["fabrique : produit, est responsable de", "chômeurs : diplômés sans emploi"],
    problematique: "L'école est-elle responsable du chômage des jeunes diplômés ?",
    plan: [
      { titre: "I. Une part de vérité", idees: ["Formations éloignées des besoins du marché", "Valorisation excessive des diplômes généraux"] },
      { titre: "II. Mais l'école n'est pas seule responsable", idees: ["Faiblesse du tissu économique", "Les diplômés ont plus de chances que les non-diplômés"] },
      { titre: "III. Rapprocher école et emploi", idees: ["Formation professionnelle, entrepreneuriat", "Partenariats avec les entreprises"] },
    ],
  },
  {
    id: "mere-ecole",
    theme: "Partenariat",
    sujet: "« Éduquer une fille, c'est éduquer une nation. » Expliquez et discutez.",
    type: "Thématique",
    motsCles: ["éduquer une fille : scolariser, former", "une nation : effet multiplicateur sur la société"],
    problematique: "Pourquoi l'éducation des filles a-t-elle des effets sur toute la société ?",
    plan: [
      { titre: "I. Explication", idees: ["La femme, première éducatrice des enfants", "Santé, nutrition, scolarisation des générations suivantes"] },
      { titre: "II. Illustrations", idees: ["Recul de la mortalité infantile", "Participation économique et politique des femmes"] },
      { titre: "III. Nuances", idees: ["L'éducation des garçons compte aussi", "Obstacles persistants (mariages précoces)"] },
    ],
  },
  {
    id: "jeu",
    theme: "Pédagogie",
    sujet: "Le jeu a-t-il sa place à l'école ?",
    type: "Dialectique",
    motsCles: ["jeu : activité libre et plaisante", "place à l'école : rôle pédagogique"],
    problematique: "Peut-on apprendre en jouant, ou le jeu détourne-t-il l'élève du travail scolaire ?",
    plan: [
      { titre: "I. Le jeu comme outil d'apprentissage", idees: ["Motivation, mémorisation", "Coopération, respect des règles", "Jeux mathématiques, jeux de rôle"] },
      { titre: "II. Les limites", idees: ["Risque de désordre, perte de temps", "Tout ne s'apprend pas en jouant (effort)"] },
      { titre: "III. Un jeu encadré", idees: ["Objectifs clairs, temps limité", "Alternance jeu / exercices"] },
    ],
  },
  {
    id: "discipline-autorite",
    theme: "Climat scolaire",
    sujet: "Comment le maître peut-il asseoir son autorité sans recourir à la violence ?",
    type: "Thématique",
    motsCles: ["autorité : capacité à se faire respecter et écouter", "violence : châtiments, humiliations"],
    problematique: "Quels sont les fondements d'une autorité respectée et non violente ?",
    plan: [
      { titre: "I. Une autorité fondée sur la compétence", idees: ["Maîtrise des contenus, préparation", "Clarté des consignes"] },
      { titre: "II. Une autorité fondée sur la relation", idees: ["Respect, écoute, justice", "Règles claires et constantes"] },
      { titre: "III. Des sanctions éducatives", idees: ["Réparation, responsabilisation", "Collaboration avec les parents"] },
    ],
  },
];

/** Introductions modèles : [amorce, sujet posé, problématique, annonce du plan] */
export const intros: { subjectId: string; parts: [string, string, string, string] }[] = [
  {
    subjectId: "ecole-prison",
    parts: [
      "Partout dans le monde, l'instruction a toujours été présentée comme un rempart contre la misère et la délinquance.",
      "C'est dans ce sens qu'il faut comprendre la pensée attribuée à Victor Hugo : « Ouvrir une école, c'est fermer une prison. »",
      "L'école suffit-elle, à elle seule, à prévenir la délinquance et à bâtir une société plus juste ?",
      "Nous montrerons d'abord que l'école éloigne les jeunes du crime, puis nous verrons ses limites, avant de proposer les conditions d'une école réellement protectrice.",
    ],
  },
  {
    subjectId: "role-enseignant",
    parts: [
      "Dans la société traditionnelle comme dans l'école moderne, celui qui enseigne a toujours occupé une place respectée.",
      "Pourtant, certains affirment que « le rôle de l'enseignant ne se limite pas à transmettre des connaissances ».",
      "Quelles sont donc les missions de l'enseignant au-delà de l'instruction ?",
      "Après avoir rappelé que la transmission des savoirs reste sa mission première, nous montrerons qu'il est aussi un éducateur et un acteur du développement local.",
    ],
  },
  {
    subjectId: "filles",
    parts: [
      "Depuis plusieurs décennies, la scolarisation des filles figure parmi les priorités des politiques éducatives en Afrique.",
      "Le sujet nous invite à analyser les enjeux et les obstacles de la scolarisation des filles.",
      "Pourquoi cette scolarisation est-elle essentielle et comment lever les obstacles qui l'entravent encore ?",
      "Nous examinerons d'abord ses enjeux, ensuite les obstacles qui persistent, enfin les solutions envisageables.",
    ],
  },
  {
    subjectId: "tic",
    parts: [
      "Le téléphone portable et Internet ont bouleversé en quelques années notre manière de communiquer et de nous informer.",
      "L'école ne peut ignorer cette révolution, d'où la question : les TIC sont-elles une chance ou une menace pour elle ?",
      "Comment l'école peut-elle tirer profit des technologies tout en se protégeant de leurs dérives ?",
      "Nous verrons d'abord les opportunités qu'offrent les TIC, puis les dangers qu'elles comportent, avant de plaider pour une intégration raisonnée.",
    ],
  },
  {
    subjectId: "mandela",
    parts: [
      "Les nations qui se sont développées rapidement ont presque toutes fait de l'éducation une priorité.",
      "Nelson Mandela, qui a passé vingt-sept ans en prison, affirmait : « L'éducation est l'arme la plus puissante que l'on puisse utiliser pour changer le monde. »",
      "En quoi l'éducation est-elle un levier de transformation de l'individu et de la société ?",
      "Nous montrerons qu'elle transforme d'abord l'individu, puis la société tout entière, à condition toutefois qu'elle soit de qualité et accessible à tous.",
    ],
  },
  {
    subjectId: "abandon",
    parts: [
      "Chaque année, de nombreux élèves quittent l'école avant la fin du cycle élémentaire.",
      "Ce phénomène, appelé abandon scolaire, constitue un défi majeur pour notre système éducatif.",
      "Comment expliquer l'abandon scolaire et comment l'école et la société peuvent-elles le réduire ?",
      "Nous analyserons successivement ses causes, ses conséquences et les solutions qui permettraient d'y remédier.",
    ],
  },
  {
    subjectId: "vocation",
    parts: [
      "On entend souvent dire qu'on ne devient pas enseignant par hasard.",
      "La question se pose alors : enseigner est-il un métier ou une vocation ?",
      "Suffit-il d'aimer les enfants pour bien enseigner, ou faut-il avant tout une formation professionnelle ?",
      "Nous verrons d'abord ce qui fait de l'enseignement une vocation, puis ce qui en fait un véritable métier, avant de montrer que les deux dimensions sont inséparables.",
    ],
  },
  {
    subjectId: "langues-nationales",
    parts: [
      "La langue est le premier outil de la pensée et de l'apprentissage.",
      "Au Sénégal, l'introduction des langues nationales à l'école élémentaire suscite un débat : faut-il enseigner dans ces langues ?",
      "Leur usage favorise-t-il les apprentissages sans compromettre la maîtrise du français ?",
      "Nous présenterons d'abord leurs avantages, ensuite les difficultés de leur mise en œuvre, enfin les conditions d'un bilinguisme réussi.",
    ],
  },
];

export const introRoles = ["Amorce", "Sujet posé", "Problématique", "Annonce du plan"];
