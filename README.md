# Révisions CREM 2026

Application de révision pour le Concours de recrutement d'élèves-maîtres (CREM, Sénégal) :

- **Mathématiques** : 14 thèmes d'exercices générés à l'infini (dont durées et horaires, intervalles, âges) et des problèmes complets à plusieurs questions, tous corrigés étape par étape.
- **Texte suivi de questions (TSQ)** : 8 textes inédits avec questions corrigées, 68 QCM de langue et un exercice « repère les mots fautifs » dans le style de la présélection.
- **Dissertation** : 30 sujets avec problématique et plan, rédaction chronométrée (introduction 20 min, plan détaillé 45 min, copie complète 3 h), exercices « remets l'introduction dans l'ordre » et « quel type de plan ? ».
- **Examen blanc** chronométré pour chaque épreuve.

La progression est enregistrée dans le navigateur (localStorage).

## Développement

```sh
npm install
npm run dev
```

## Déploiement sur Vercel

Importer le dépôt dans Vercel (preset **Vite**, build `npm run build`, sortie `dist`). Le fichier `vercel.json` redirige toutes les routes vers `index.html` pour que les URL comme `/maths` fonctionnent.
