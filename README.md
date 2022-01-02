# [Calculateur de prescription](https://eleurent.github.io/prescription/) de l'action publique des infractions en matière de sexualité en droit pénal français. 

## Notions

La notion d'action publique peut être entendue comme l'action de poursuivre un fait pénalement répréhensible. Cette mission incombe, sauf cas particuliers, au procureur de la République qui a le pouvoir de "mettre en mouvement l'action publique" c'est à dire diligenter une enquête. Il peut aussi s'agir du juge d'instruction directement saisi par une victime se constituant partie civile. 

L'action publique peut s'éteindre de plusieurs manières, soit parce que l'auteur des faits est décédé, soit parce que l'auteur des faits a été jugé pour les faits dénoncés, soit lorsqu'un délai trop important s'est écoulé depuis la commission des faits. C'est ce dernier cas que nous appelons la prescription de l'action publique. 

Passé ce délai, déterminé par la loi en fonction de divers facteurs, il n'est plus possible de mettre en mouvement l'action publique, et donc de punir les faits. 

Actuellement, le délai de prescription de l'action publique est de 6 ans s'agissant des délits, et de 20 ans s'agissant des crimes. Il n'en a toutefois pas toujours été ainsi : jusqu'en 2017, les délits se prescrivaient par 3 ans, et les crimes par 10 ans. De plus, les réformes procedurales successives ont eu pour effet d'ajouter sous les articles 7 et 8 du code de procédure pénale de nombreux cas particuliers tenant à la condition de la victime (mineure, vulnérable...) ou aux catégories d'infractions (terrorisme...). 

Aucune loi ne peut revenir sur un fait déjà prescrit. En revanche, lorsqu'un fait apparaît non-encore prescrit au moment de l'entrée en vigueur d'une loi nouvelle portant allongement du délai de prescription (par exemple : passage de 3 à 6 ans), il peut bénéficier de ces nouvelles dispositions (le principe de non rétroactivité de la loi pénale n'est pas applicable aux lois de procédures). 

Ainsi, un fait delictuel commis en 2015, se prescrivant alors par 3 ans, pourra bénéficier de la réforme de 2017 portant allongement du délai de 3 à 6 ans. Les faits ne seront alors plus prescrits en 2018 mais en 2021.

## Fonctionnement

Le calculateur fonctionne à partir de deux composants:

* le `contexte`, l'ensemble des informations remplies dans le questionnaire
* l'`arbre de décision`, décrivant l'ensemble des lois et leurs ramifications

L'arbre de décision est implémenté dans [src/backend/rules.js](src/backend/rules.js). 

Il est composé d'un ensemble de noeuds `Node`, comprenant:
* un nom,
* une description,
* une règle de décision, qui lit le contexte, le modifie éventuellement, et renvoie vers une autre noeud de l'arbre indexé par son nom.
