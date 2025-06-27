# Projet Full-Stack (back + front) E3 DAD
Lien application : 
https://scrumy-app.vercel.app

## Grille technique

- Le projet doit utiliser NextJS
J’ai utilisé Next.js avec App Router pour construire mon projet. Ce framework m’a permis d’avoir une architecture claire côté frontend et backend, avec des routes API intégrées dans le dossier app/api.

- Le projet sera déployé chez Vercel (App + BDD)
J’ai déployé l’application sur Vercel, et j’ai utilisé Neon comme base de données PostgreSQL. C’est une solution cloud rapide et gratuite, très bien intégrée à Vercel.
Tout est connecté, fonctionnel et accessible en ligne.

## Grille backend

- La BDD peut être SQL ou noSQL (au choix, argumenté)

- La BDD doit être gérée avec un framework. Le versionning du schéma doit être géré. Par exemple:
  J’ai choisi PostgreSQL comme système de base de données relationnelle, car il est robuste, bien adapté aux relations complexes entre projets, participants, stories, etc.
J’ai utilisé Prisma comme ORM pour :

Définir mon schéma
Gérer les relations entre entités
Générer les requêtes
Faire les migrations versionnées

- Les exigences fonctionnelles de l'app sont respectées (cf **features**)

J’ai implémenté les fonctionnalités suivantes :

Création et accès à un projet par code
Attribution de rôles (CP, PO, etc.)
Possibilité de bannir ou supprimer un participant
Ajout, suppression et validation de stories
Stockage persistant avec actualisation
Rôles modifiables par le CP uniquement

- Le projet doit avoir des tests unitaires pour la logique métier
Je n’ai pas encore écrit de tests unitaires, par manque de temps.
Mais je comprends leur utilité, et j’aurais pu tester :

Les routes API (POST /api/story, PATCH /api/participant)
La logique de validation d’une story
Le calcul du champ resteAFaire

## Grille frontend

- Les exigences fonctionnelles de l'app sont respectées (cf **features**)

Mon interface en React fonctionne entièrement :

Formulaire de création de projet
Page de connexion via code + pseudo
Visualisation des participants + rôles
Section des stories avec ajout, suppression, et case à cocher
Sécurité côté rôle : seuls les CP peuvent modifier.

- Le projet doit avoir des tests composants pour l'UI
Je n'ai pas fais cette partie la par manque de temps.

## Livrables

- Repository Git
  - README avec URL de l'app déployée.
  Mon projet est bien hébergé sur GitHub avec :
Un README clair
Le lien vers l’application déployée

Je dirais une note de 12/20 au global avec les fonctionnalités implémentées actuellement et avec le temps donné.