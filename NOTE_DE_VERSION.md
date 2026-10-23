# La Cavoute V.1.3.0 — Lot 6 : persistance complète et sauvegarde

Livraison du 23 octobre 2026 (build 20261023-1345). Cette version réalise le lot 6 de la feuille de route
(proposé avant le lot 5 et validé), y ajoute les modifications demandées sur le Dashboard et
corrige la gestion des racks. Le design et les fonctions des lots 1 à 4 sont conservés.

## Demandes de cette version
- **Onglet « Stats » renommé « Dashboard »**, placé en **première position** et affiché au lancement
  de l'application.
- **Estimation patrimoniale masquée** à l'ouverture. Elle regroupe la valeur basse / moyenne / haute,
  la répartition par famille, la projection indicative et les bouteilles les mieux valorisées.
  Un clic sur « ESTIMATION PATRIMONIALE » révèle l'ensemble ; un second clic le masque.
  Pour la confidentialité, la section se masque aussi quand l'application passe en arrière-plan
  et quand on change d'onglet.
- **Bouteilles les mieux valorisées** : l'année n'est plus collée au domaine ; le domaine et le nombre
  de bouteilles passent sur la ligne du dessous.
- **Gestion des racks (+)** : le nom n'est plus collé à la famille (« BlancsBlancs ») ; la famille, les
  dimensions et le nombre de bouteilles s'affichent sur la ligne du dessous.
- **Suppression d'un rack** (bouton 🗑) : refusée si le rack contient des bouteilles ou s'il est le
  dernier ; confirmation avant suppression ; avertissement si c'est le dernier rack de sa famille.

## Lot 6 — Persistance complète des données
- **Tous les vins sont enregistrés dans le stockage local** (`la-cavoute-v1-wines`). Les six vins de
  démonstration ne servent plus que d'amorçage à la première ouverture.
- **Migration automatique depuis la V.1.2.1** : les vins de démonstration et les vins ajoutés sont repris,
  les emplacements, l'historique et les racks sont conservés tels quels.
- **Schéma de données versionné** (`la-cavoute-v1-meta`, schéma 2).
- **Préférences enregistrées** : vue des bouteilles (bouteille / bouchon / dessous) et niveau de
  valorisation (basse / moyenne / haute). Le premier rack reste sélectionné au démarrage.
- **Sauvegarde JSON** (bloc « Sauvegarde et restauration » en bas du Dashboard) : téléchargement d'un fichier
  `la-cavoute-sauvegarde-AAAAMMJJ-HHMM.json`, et partage via le menu Android quand le navigateur le permet.
  Contenu : vins, racks, emplacements, historique, préférences.
- **Import JSON** avec aperçu (nombre de vins, bouteilles, racks, sorties), validation stricte,
  champs manquants complétés, lignes invalides signalées, **copie de sécurité automatique**
  et bouton « Annuler le dernier import ».
- **Écriture protégée** : si l'enregistrement d'un import échoue, les données précédentes sont restaurées.
- **Rappel de sauvegarde** sur le Dashboard s'il n'y a jamais eu d'export ou depuis plus de 30 jours.
- **Stockage persistant** demandé au navigateur (état affiché dans le bloc Données) pour limiter le risque
  de nettoyage automatique.
- **Données illisibles** : une copie du contenu corrompu est conservée sous la clé `…-corrompu`
  avant tout amorçage.
- Identifiants uniques conservés : un nouveau vin ne réutilise jamais un identifiant déjà présent
  dans les vins, l'historique ou les emplacements.

## Clés de stockage local
| Clé | Contenu |
| --- | --- |
| `la-cavoute-v1-wines` | Tous les vins (nouveau) |
| `la-cavoute-v1-racks` | Racks : nom, famille, dimensions, ordre |
| `la-cavoute-v1-positions` | Coordonnées de chaque bouteille |
| `la-cavoute-v1-bottle-history` | Historique des sorties de cave |
| `la-cavoute-v1-prefs` | Vue des bouteilles, niveau de valorisation (nouveau) |
| `la-cavoute-v1-meta` | Version du schéma, date de la dernière sauvegarde exportée (nouveau) |
| `la-cavoute-v1-pre-import` | Copie de sécurité avant le dernier import (nouveau) |
| `la-cavoute-v1-added-wines` | Ancienne liste des vins ajoutés (V.1.2.1) : lue une seule fois lors de la migration |

## Format du fichier de sauvegarde (schéma 2)
```
{ "app": "La Cavoute", "schema": 2, "wines": [...], "racks": [...], "positions": {...}, "history": [...], "prefs": {...} }
```
Seuls `app`, `schema` et `wines` sont obligatoires. Pour chaque vin : `id`, `qty`, `family`
(Blancs, Rouges, Champagnes ou Divers), `domain` ou `name`, `year`. Tous les autres champs
(appellation, cépages, valeurs, stade, fenêtre, etc.) sont facultatifs et complétés par défaut.
Sans `positions`, les bouteilles sont placées automatiquement dans les racks de leur famille.
Ce format servira à importer l'inventaire Excel (lot 7).

## PWA
- Nom du cache : `la-cavoute-v1-3-0-20261023-1345` (service worker inchangé hors ce nom).

## Mise à jour depuis la V.1.2.1
Aucune action manuelle. Au premier lancement, les données sont migrées automatiquement.
**Faites une première sauvegarde JSON dès que possible** (bloc Données, en bas du Dashboard).

## Tests effectués
Exécution simulée de l'application : lancement sur le Dashboard, estimation masquée puis révélée et
re-masquée (clic, arrière-plan, changement d'onglet), mise en page des listes, suppression de racks
(occupé, dernier, confirmation refusée), migration depuis la V.1.2.1, données illisibles, persistance des
vins et des préférences, export, import (aller-retour, fichier minimal, fichiers invalides, cave vide,
échec d'écriture avec retour en arrière), annulation d'import, et régressions de la V.1.2.1.
Service worker : installation, mise à jour, hors ligne. Tous les tests passent.
Non vérifié sur téléphone : rendu visuel et sélecteur de fichiers Android.

## Tests à faire sur le téléphone
1. Lancement : le Dashboard s'affiche, l'estimation est masquée (••••••).
2. Toucher « ESTIMATION PATRIMONIALE » : tout se révèle ; le retoucher : tout se masque.
3. Mettre l'application en arrière-plan puis la rouvrir : l'estimation est masquée.
4. Bouteilles les mieux valorisées : domaine et nombre de bouteilles sur la ligne du dessous.
5. Cave > « + » (racks) : nom puis famille sur deux lignes ; supprimer un rack vide ; un rack occupé est refusé.
6. Ajouter un vin, fermer complètement l'application, la rouvrir : le vin est toujours là.
7. Bas du Dashboard : « Télécharger la sauvegarde » ; le fichier apparaît dans Téléchargements.
8. « Importer une sauvegarde » avec ce fichier : aperçu, remplacement, puis « Annuler le dernier import ».
9. Alertes > À propos : V.1.3.0, cache `la-cavoute-v1-3-0-20261023-1345`.
10. Mode avion : l'application s'ouvre.

## Retour arrière
Republier le ZIP de la V.1.2.1. Attention : la V.1.2.1 ne lit pas la nouvelle base `la-cavoute-v1-wines` ;
elle ne verra donc pas les vins ajoutés après la mise à jour. **Exporter une sauvegarde JSON avant tout retour arrière.**
