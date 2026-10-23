# La Cavoute V.1.2.1 — Correctifs

Livraison du 22 octobre 2026 (build 20261022-1847). Aucune nouvelle fonction structurante :
cette version corrige les défauts constatés dans la V.1.2.0 (lot 4) avant d'aborder le lot suivant.
Le design et les fonctions validées des lots 1 à 4 sont conservés.

## Corrections de bugs
- **Valorisation** : les boutons Basse / Moyenne / Haute de l'onglet Stats ne fonctionnaient plus
  (appel à une fonction inexistante `renderValue`). Corrigé.
- **Noms de racks avec apostrophe ou guillemet** (ex. « Cave d'été ») : l'ouverture des fiches
  dans ce rack plantait. L'emplacement n'est plus transmis par le nom du rack mais recalculé
  depuis l'identifiant de la bouteille.
- **Texte saisi non échappé** : domaine, cuvée, notes, noms de racks sont désormais échappés
  partout (grille, listes, fiches, statistiques, historique).
- **Vins ajoutés perdus au rechargement** : les vins ajoutés sont maintenant conservés
  (clé `la-cavoute-v1-added-wines`). Avant, ils disparaissaient alors que leurs emplacements restaient.
- **Réutilisation d'identifiants** : un nouveau vin pouvait reprendre l'identifiant d'un ancien vin
  et hériter de son historique (bouteille invisible). Le nouvel identifiant tient désormais compte
  des vins, de l'historique et des emplacements existants.
- **Emplacements orphelins** : au démarrage, les positions sans bouteille, doublonnées, sorties des
  limites du rack ou pointant vers un rack inconnu sont nettoyées. Elles ne bloquent plus
  la réduction d'un rack ni le placement automatique.
- **Placement automatique** : si le premier rack d'une famille est plein, la bouteille est placée
  dans le rack suivant de la même famille. S'il n'y a plus de place, un bandeau « N bouteille(s)
  sans emplacement » s'affiche sur l'écran Cave.
- **Fiche détaillée** : « Emplacement » affiche la vraie position (rack, colonne, rangée) quelle que soit
  l'origine de l'ouverture, au lieu de « Placement automatique ».
- **Mise en page** : l'en-tête du rack (`.rack-top`) et le bouton « Créer le rack » (`.submit-add`)
  n'avaient aucun style. Ils utilisent maintenant les classes existantes.
- **Validation des racks au chargement** : minimum 1, maximum 30, repli sur 10 × 10 si les données
  sont invalides (cette validation du lot 1 avait disparu au lot 4). La création d'un rack est
  aussi plafonnée à 30 × 30.
- **Stockage local** : une erreur d'écriture (quota, navigation privée) n'interrompt plus l'action
  et affiche un avertissement.
- **Statistiques** : plus de division par zéro dans la projection quand la cave est vide.

## PWA et service worker
- Installation tolérante : seuls `index.html` et `./` sont indispensables. Manifeste et icônes sont
  mis en cache s'ils existent ; leur absence n'empêche plus l'installation du mode hors ligne.
- Page principale en **réseau d'abord**, cache en secours hors connexion : la nouvelle version
  est servie dès la première ouverture en ligne.
- Mise en cache avec `cache: 'reload'` pour éviter de stocker une ancienne version conservée
  par GitHub Pages.
- Seuls les anciens caches `la-cavoute-*` sont supprimés (le domaine github.io peut héberger
  d'autres applications).
- Un fichier introuvable hors connexion renvoie une erreur propre et non plus la page d'accueil.
- Nom du cache : `la-cavoute-v1-2-1-20261022-1847`.
- Message « Nouvelle version installée » lorsqu'une mise à jour remplace l'ancienne.
- Onglet **Alertes** : section « À propos » avec la version, le build et le cache actif,
  pour vérifier quelle version tourne sur le téléphone.

## Fichiers ajoutés ou régénérés
- `manifest.webmanifest` (absent des fichiers de référence) et `icons/icon-192.png`, `icons/icon-512.png`
  (nouvelles icônes : verre de vin sur fond bordeaux, compatibles icône adaptative Android).
- `Cahier_des_charges_La_Cavoute.docx` refondu : spécifications à jour, feuille de route, historique.
- Code mort du lot 1 supprimé (`loadRackDims`, `saveRackDims`, `state.dims`).

## Clés de stockage local
| Clé | Contenu |
| --- | --- |
| `la-cavoute-v1-racks` | Racks : nom, famille, dimensions, ordre |
| `la-cavoute-v1-positions` | Coordonnées de chaque bouteille |
| `la-cavoute-v1-bottle-history` | Historique des sorties de cave |
| `la-cavoute-v1-added-wines` | Vins ajoutés par l'utilisateur (nouveau) |

## Mise à jour depuis la V.1.2.0
Aucune migration manuelle : les clés existantes sont conservées. Les vins ajoutés dans la V.1.2.0
avaient déjà disparu au rechargement ; ils ne peuvent pas être retrouvés.

## Tests effectués
Exécution simulée de l'application (tous les onglets, valorisation, apostrophes, ajout puis
rechargement, sortie de cave, identifiants, positions orphelines, rack plein, données corrompues,
stockage indisponible) et du service worker (installation sans icônes, mise à jour, hors ligne,
caches étrangers). Tous les tests passent.

## Tests à faire sur le téléphone
1. Ouvrir l'application, aller dans Alertes > À propos : version `V.1.2.1`, cache `la-cavoute-v1-2-1-20261022-1847`.
2. Stats : toucher Basse, Moyenne, Haute ; les montants et la tuile active doivent changer.
3. Créer un rack nommé « Cave d'été », y placer ou ouvrir une bouteille, ouvrir sa fiche.
4. Ajouter un vin, fermer complètement l'application, la rouvrir : le vin est toujours là.
5. Ouvrir une fiche depuis l'onglet Bouteilles : l'emplacement affiché est une vraie case.
6. Mode avion : l'application s'ouvre toujours.

## Retour arrière
Republier le ZIP de la version précédente. Les données locales sont conservées ; seule la clé
`la-cavoute-v1-added-wines` est ignorée par la V.1.2.0.
