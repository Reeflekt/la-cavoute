# La Cavoute V.1.5.0 — Lot 7a : modèle de données (schéma 3) et stades

Livraison du 25 novembre 2026 (build `20261125-1335`). Cette version réalise le **lot 7a** de la feuille de route, prérequis indispensable avant l'import de l'inventaire complet v3.8 (lot 7b). Toutes les fonctions des lots 1 à 6 sont conservées.

## Modèle de données — Schéma 3
- **Nouveaux champs conservés et normalisés** (alignés sur `Inventaire_La_Cavoute_v3_8.xlsx`) :
  - `format` (75 cl, 150 cl Magnum, etc.), `style`, `region`
  - `nm` (champagnes non millésimés, affichés `NM (~année)`)
  - `windowStart`, `windowEnd`, `windowOrigin` (fenêtre chiffrée et son origine)
  - `peakStart`, `peakEnd` (apogée propre à un vin)
  - `palateBasis` (profil aromatique `Cuvée` ou `Type d'appellation`, affiché explicitement sur la fiche)
  - `barcode` (EAN), `purchasePrice` (prix d'achat), `notes` (notes personnelles), `reliability`, `sources`
- **Champs vides respectés** : aucun texte de remplissage (« À compléter. », « À définir ») n'est plus injecté ; les sections vides ne sont pas affichées sur la fiche.
- **Migration sans perte depuis la V.1.4.0 (schéma 2 → schéma 3)** :
  - L'ancien stade `Évolution` est migré automatiquement vers `Maturité`.
  - Les fenêtres texte existantes (`2024–2028`) alimentent automatiquement `windowStart` et `windowEnd`.
  - Les sauvegardes JSON de schéma 2 restent entièrement importables.

## Quatre stades et onglet « Stades »
- **Quatre stades alignés sur l'Excel v3.8** :
  - **Jeunesse** (violet `#a78bfa`)
  - **Maturité** (bleu `#60a5fa`)
  - **Déclin** (jaune `#facc15`, distinct du doré du ruban d'apogée)
  - **Sénescence** (rouge `#ef4444`)
- **Onglet « Alertes » renommé « Stades »** : affiche le guide de dégustation complet des 4 stades et de l'indicateur d'apogée (robe, arômes, structure, équilibre, durée, verdict), le rappel sur les arômes tertiaires, et le bloc **À propos**.

## Fiche détaillée, racks et formulaire d'ajout
- **Tarif visible directement sur la fiche** (décision validée du 25/11/2026) : valorisation unitaire (basse / moyenne / haute) et prix d'achat affichés directement dans la fiche, sans masquage. L'estimation patrimoniale globale du Dashboard reste masquée par défaut.
- **Affichage NM et Magnums** : les champagnes non millésimés s'affichent `NM (~année)` partout (fiche, listes, infobulle, bandeau) ; les formats ≠ 75 cl affichent un badge `Magnum 150 cl` (ou `${format} cl`).
- **Option « Exclure du placement automatique » par rack (`racks[].autoPlace`)** : réglable par rack dans **Gestion des racks** (`+`) et à la création d'un rack, pour protéger les caisses en bois (racks 7 et 8) et le rack Magnums (rack 9).
- **Teinte CSS dédiée à la famille Divers** sur les cases des racks.
- **Formulaire d'ajout manuel complété** : ajout de `Format`, `Non millésimé (NM)`, `Région`, `Style`, `Début/Fin de fenêtre`, `Prix d'achat`, et sauvegarde effective du champ `Code-barres (EAN)` et des `Notes personnelles`.

## Performance
- Mise en cache des quantités actives, des bouteilles actives et de l'index par `uid` via `Map` (`invalidateCache()` sur chaque mutation), supprimant la complexité `O(N × M)` pour garantir une interface instantanée sur 180 références / 341 bouteilles.

## Autres
- Nom du cache hors ligne : `la-cavoute-v1-5-0-20261125-1335`.
- Aucune donnée personnelle ni inventaire réel dans cette livraison.

## Contrôles à faire sur le téléphone
1. **Stades > À propos** : vérifier `V.1.5.0`, `build 20261125-1335`, `schéma 3` et le cache `la-cavoute-v1-5-0-20261125-1335`.
2. **Stades** : vérifier les 4 stades + Apogée et le rappel sur les arômes tertiaires.
3. **Dashboard** : vérifier les 4 cartes de stades (Jeunesse violet, Maturité bleu, Déclin jaune, Sénescence rouge) et que l'estimation patrimoniale reste masquée par défaut.
4. **Fiche détaillée** : vérifier la visibilité directe du bloc *Tarif & valorisation* (valeurs basse / moyenne / haute et prix d'achat).
5. **Gestion des racks (`+`)** : décocher « Autoriser le placement automatique » sur un rack, vérifier le badge « Placement auto exclu » sur l'en-tête du rack et qu'un nouvel ajout ne s'y place pas.
6. **Ajout manuel (`+`)** : créer un vin avec `Magnum 150 cl`, `NM`, `Région`, `Code-barres (EAN)` et `Prix d'achat`, puis vérifier sa fiche et un aller-retour Export / Import JSON.
7. **Mode avion** : fermer et rouvrir l'application hors connexion.

## Retour arrière
Exporter une sauvegarde JSON avant mise à jour. Une version antérieure (V.1.4.0) ignore les champs du schéma 3 et ramène le stade `Déclin` à `Jeunesse` : en cas de retour arrière en V.1.4.0, réimporter la sauvegarde JSON faite avant la mise à jour.
