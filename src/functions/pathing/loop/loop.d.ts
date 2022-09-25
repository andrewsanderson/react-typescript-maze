/** Provided the maze and a path, this function will return true if the current last node meets the win criteria. */
type WinConditions = (path: Path) => boolean;

/** Returns the first node in the maze that meets the starting criteria. */
type StartingCriteria = (maze: Maze) => Cell;

/** Combines the above criteria to loop using a traversal function. */
type LoopMethod = (
  startingCriteria: StartingCriteria,
  winConditions: WinConditions
) => (maze: Maze, traversaleAlgorithm: TraversaleAlgorithm) => Nodes;
