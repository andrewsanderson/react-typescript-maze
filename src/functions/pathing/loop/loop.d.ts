/** Provided the maze and a path, this function will return true if the current last node meets the win criteria. */
type WinConditions = (path: Path) => boolean;

/** Required for iterative functions to hault to halt their functionality (likely if the number of exhausted nodes is equal to the number of nodes in the maze). */
type LoseConditions = (path: Path) => boolean;

/** Returns the first node in the maze that meets the starting criteria. */
type StartingCriteria = (maze: Maze) => Cell;

/** Combines the above criteria to loop using a traversal function. */
type LoopMethod = (
  startingCriteria: StartingCriteria,
  winConditions: WinConditions,
  loseConditions?: LoseConditions
) => (maze: Maze, traversaleAlgorithm: TraversaleAlgorithm) => Nodes;
