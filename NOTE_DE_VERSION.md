# La Cavoute V.1 - Lot 1

**Date : 20 octobre 2026**  
**Référence : `la_cavoute_v.1.html`**

## Objet de la livraison

Premier chantier de la V.1 : rendre persistantes les dimensions des racks sans modifier le design, les statistiques, les fiches détaillées, la valorisation ou le parcours d’ajout déjà validés.

## Modifications apportées

- Enregistrement local des dimensions de chaque rack après chaque agrandissement ou réduction.
- Restauration automatique des dimensions après actualisation, fermeture et relance de l’application.
- Sauvegarde distincte pour Blancs, Rouges, Champagnes et Divers.
- Validation des données sauvegardées avec une plage autorisée de 1 à 30 colonnes ou rangées.
- Retour automatique aux dimensions 10 x 10 en cas de données locales absentes ou invalides.
- Blocage de la suppression de la dernière colonne lorsqu’une bouteille se trouve dans cette colonne.
- Blocage de la suppression de la dernière rangée lorsqu’une bouteille se trouve dans cette rangée.
- Conservation de la limite empêchant un rack de devenir plus petit que le nombre de bouteilles à afficher.
- Nouveau cache PWA afin d’éviter le maintien d’une ancienne version sur le téléphone.

## Éléments conservés sans régression attendue

- Interface visuelle de la référence V.1.
- Navigation Cave, Bouteilles, À boire, Stats et Alertes.
- Statistiques interactives et estimation patrimoniale.
- Valeurs basse, moyenne et haute.
- Répartition par famille et projection indicative.
- Fiches détaillées.
- Ruban d’apogée, pastille de stade et dégradés par famille.
- Formulaire d’ajout et ses quatre modes simulés.
- Racks responsive sans ascenseur vertical interne.

## Procédure de test

1. Ouvrir un rack et modifier le nombre de colonnes et de rangées.
2. Actualiser la page : les dimensions doivent rester identiques.
3. Fermer complètement La Cavoute puis la relancer : les dimensions doivent être restaurées.
4. Répéter le test avec plusieurs familles de racks.
5. Tenter de retirer une colonne occupée : l’application doit refuser.
6. Tenter de retirer une rangée occupée : l’application doit refuser.
7. Vérifier que les écrans Stats, Bouteilles, À boire et les fiches fonctionnent toujours.

## Stockage utilisé

Clé locale : `la-cavoute-v1-rack-dimensions`.

La suppression des données du site ou du stockage de l’application réinitialisera les dimensions à 10 x 10. Une future fonction d’export et de restauration couvrira ces préférences.

## Prochains lots planifiés

- Correction du focus de recherche et des listes statistiques.
- Gestion d’une bouteille bue et historique de consommation.
- Création, renommage et classement des racks.
- Déplacement d’une bouteille depuis sa fiche.
- Persistance complète des bouteilles, emplacements et mouvements.

## Retour arrière

En cas de comportement anormal, republier le dernier paquet de restauration validé. Ne pas supprimer la référence `la_cavoute_v.1.html`.
