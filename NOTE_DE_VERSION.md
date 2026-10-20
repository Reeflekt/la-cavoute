# La Cavoute V.1.1.0 - Lot 2

**Horodatage : 20 octobre 2026 à 13:50**  
**Référence livrée : `la_cavoute_v.1.1.0_20261020_1350`**

## Nomenclature appliquée

- HTML autonome : `la_cavoute_v.1.1.0_20261020_1350.html`
- Dossier PWA : `la_cavoute_v.1.1.0_20261020_1350`
- Archive PWA : `la_cavoute_v.1.1.0_20261020_1350.zip`

## Modifications du lot 2

- Correction de la recherche dans la section **Bouteilles**.
- Le champ de recherche n'est plus recréé après chaque caractère.
- Le focus, le curseur et le clavier Android restent actifs pendant la saisie.
- Seule la liste des résultats est actualisée.
- Recherche étendue au domaine, à la cuvée, au millésime, à l'appellation et à la famille.
- Ajout d'un message clair lorsqu'aucun vin ne correspond.
- Correction des listes ouvertes depuis les statistiques.
- La cuvée est affichée sur la première ligne.
- Le domaine est affiché seul sur la deuxième ligne.
- Le millésime et la famille sont affichés sur la troisième ligne.
- Suppression de la phrase « Affichage dans les racks uniquement ».
- Conservation de la persistance des dimensions des racks du lot 1.
- Nouveau cache PWA : `la-cavoute-v1-1-0-20261020-1350`.

## Non-régression attendue

- Design complet de la référence V.1 conservé.
- Statistiques, valorisation et projection conservées.
- Fiches détaillées conservées.
- Ajout manuel et modes simulés conservés.
- Racks responsive et dimensions persistantes conservés.

## Tests à effectuer

1. Dans **Bouteilles**, saisir plusieurs lettres sans retoucher le champ.
2. Vérifier que le clavier reste ouvert et que le curseur reste dans le champ.
3. Tester une recherche par domaine, cuvée, année, appellation puis famille.
4. Depuis **Stats**, ouvrir les quatre sélections et les quatre stades.
5. Vérifier l'affichage cuvée / domaine / millésime et famille sur trois lignes.
6. Vérifier que la phrase supprimée n'apparaît plus sous les racks.
7. Modifier un rack, relancer l'application et vérifier la persistance du lot 1.
