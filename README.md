# Calculateur de prescription

[Calculateur de prescription](https://eleurent.github.io/prescription/) de l'action publique du viol et de l'infraction sexuelle.

## Fonctionnement

Le calculateur fonctionne à partir de deux composants:

* le `contexte`, l'ensemble des informations remplies dans le questionnaire
* l'`arbre de décision`, décrivant l'ensemble des lois et leurs ramifications

L'arbre de décision est implémenté dans [src/backend/rules.js](src/backend/rules.js). 

Il est composé d'un ensemble de noeuds `Node`, comprenant:
* un nom,
* une description,
* une règle de décision, qui lit le contexte, le modifie éventuellement, et renvoie vers une autre noeud de l'arbre indexé par son nom.
