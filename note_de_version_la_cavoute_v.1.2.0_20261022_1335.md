# La Cavoute V.1.2.0 - Lot 4

## Corrections
- Historique Stats aligné sur les listes statistiques : cuvée, domaine, puis millésime et mouvement.
- Taille des cases fixée à 52 x 52 px pour tous les racks.
- Ruban d’apogée et pictogramme conservés lisibles.
- Les coordonnées d’une bouteille sont désormais indépendantes du nombre de colonnes.
- Ajouter une colonne ou une rangée ne déplace plus aucune bouteille.
- Réduction interdite si la zone retirée contient une bouteille.

## Gestion des racks
- Création d’un rack nommé avec famille, colonnes et rangées.
- Renommage d’un rack.
- Classement des racks vers le haut ou le bas.
- Ordre et dimensions persistants.
- Premier rack sélectionné au démarrage.
- Migration automatique des dimensions du lot 1.

## Persistance
- Racks : `la-cavoute-v1-racks`
- Coordonnées : `la-cavoute-v1-positions`
- Historique : `la-cavoute-v1-bottle-history`

## Tests
1. Ajouter une colonne à un rack contenant des bouteilles sur plusieurs rangées.
2. Contrôler que B2, D2, F2 ou E6 restent strictement inchangés.
3. Comparer la taille des cases d’un rack 2 x 4 et 10 x 10.
4. Créer, renommer et réordonner un rack, puis relancer l’application.
5. Vérifier l’historique Stats et les fonctions des lots 1 à 3.
