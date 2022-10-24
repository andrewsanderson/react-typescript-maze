// Start with a grid full of walls.
// Pick a cell, mark it as part of the maze. Add the walls of the cell to the wall list.
// While there are walls in the list:
// Pick a random wall from the list. If only one of the cells that the wall divides is visited, then:
// Make the wall a passage and mark the unvisited cell as part of the maze.
// Add the neighboring walls of the cell to the wall list.
// Remove the wall from the list.

// Start with a random cell
// if the cell has more than 3 unbroken walls break down a neighboring wall
// remove that wall from the list
// choose another random cell

export {};
