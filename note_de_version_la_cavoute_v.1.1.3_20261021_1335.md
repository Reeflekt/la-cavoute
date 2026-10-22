# La Cavoute V.1.1.3 - Lot 3

**Horodatage : 21 octobre 2026 à 13:35**

## Fonction principale

- Ajout du bouton **J’ai bu cette bouteille** dans la fiche détaillée.
- Confirmation avant validation.
- Retrait individuel de la bouteille sélectionnée.
- Libération de sa place dans le rack.

## Retrait sans consommation

- Ajout d’une action distincte **Retirer sans la marquer comme bue**.
- Cette action couvre les erreurs de saisie, dons, pertes ou bouteilles cassées.
- Le motif est distingué dans l’historique.

## Historique et persistance

- Ajout d’un historique daté des sorties de cave dans **Stats**.
- Conservation locale après actualisation, fermeture et relance.
- Clé utilisée : `la-cavoute-v1-bottle-history`.

## Mise à jour automatique

Après une sortie, l’application recalcule :

- le contenu des racks ;
- les quantités par référence ;
- les priorités de consommation ;
- les stades de vieillissement ;
- les compteurs statistiques ;
- la valeur basse, moyenne et haute ;
- la répartition par famille ;
- les bouteilles les mieux valorisées.

## Lots précédents conservés

- Lot 1 : persistance des dimensions des racks.
- Lot 2 : recherche sans perte de focus, correction des listes Stats et suppression du texte redondant.
- Design, fiches détaillées, valorisation et parcours d’ajout conservés.

## Tests recommandés

1. Ouvrir une bouteille depuis un rack.
2. Appuyer sur **J’ai bu cette bouteille** puis confirmer.
3. Vérifier la disparition de la bouteille et la mise à jour de Stats.
4. Vérifier l’entrée **Bue** dans l’historique.
5. Relancer l’application et vérifier que la sortie est toujours mémorisée.
6. Tester **Retirer sans la marquer comme bue** et vérifier le libellé **Retirée**.
7. Contrôler la recherche et la persistance des dimensions.

## Nomenclature

- HTML : `la_cavoute_v.1.1.3_20261021_1335.html`
- Dossier : `la_cavoute_v.1.1.3_20261021_1335`
- ZIP : `la_cavoute_v.1.1.3_20261021_1335.zip`
- CDC : `cahier_des_charges_la_cavoute_v.1.1.3_20261021_1335.docx`
