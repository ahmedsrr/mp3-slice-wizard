# Révisions CREM 2026

Application de révision pour le Concours de recrutement d'élèves-maîtres (CREM, Sénégal) :

- **Mathématiques** : 11 fiches de cours (décimaux, fractions, pourcentages, proportionnalité, vitesse, mesures, géométrie, volumes, partages, commerce et intérêts, échelles) et exercices générés à l'infini, corrigés avec les étapes.
- **Texte suivi de questions (TSQ)** : textes inédits avec questions de compréhension, vocabulaire, grammaire, conjugaison, orthographe et production, corrigés ; QCM de langue ; fiches de grammaire ; méthode.
- **Dissertation** : méthode, gestion des 3 h, banque de sujets avec problématique et plan, atelier de rédaction chronométré avec grille d'auto-évaluation, connecteurs et citations.
- **Examen blanc** chronométré pour chaque épreuve.

La progression est enregistrée dans le navigateur (localStorage).

## Développement

```sh
npm install
npm run dev
```

## Déploiement sur Vercel

Importer le dépôt dans Vercel (preset **Vite**, build `npm run build`, sortie `dist`). Le fichier `vercel.json` redirige toutes les routes vers `index.html` pour que les URL comme `/maths` fonctionnent.
