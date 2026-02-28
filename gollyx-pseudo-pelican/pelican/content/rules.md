Title: Rules
Date: 2000-01-01 00:00

# Pseudo Cup Rules

The rules for the Pseudo Cup are mostly the same as the [rules](https://golly.life/rules.html) for the
[Golly](https://golly.life) Hellmouth Cup, only Section 4 changes.

## Section 4. Game Play

1. The game shall commence through the fourth dimension using a set of uniform, explicit time steps.
1. Each square on the grid shall be in a state of being either alive or dead.
1. Each live cell shall have a color associated with a team playing in the game.
1. For each square that is populated:
    1. Each cell with one or no neighbors shall die by solitude.
    1. Each cell with four or neighbors shall die by overpopulation.
    1. Each cell with 2-3 neighbors shall survive to the next generation.
1. For each square that is unpopulated:
    1. Each cell with 3 neighbors shall become populated.
1. For a game of life with 2 colors, each new cell that is birthed shall take on the color of the majority of its
   parent cells.
1. For a game of life with 3 or more colors, each new cell that is birthed shall take on the color of the majority
   of its parent cells, if there are two parents with the same color, or else a random choice from among the
   parent cell colors.
