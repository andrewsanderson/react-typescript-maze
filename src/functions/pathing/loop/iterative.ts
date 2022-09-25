const iterative: LoopMethod = (
  startingCriteria: StartingCriteria,
  winConditions: WinConditions
) => {
  const returnFn = (maze: Maze, traversalMethod: TraversalAlgorithm) => {
    const startingCell = startingCriteria(maze);

    const path: Path = {
      traversed: [],
      queued: [startingCell],
      exhausted: [],
    };

    while (!winConditions(path) && path.exhausted.length < maze.cells.length) {
      traversalMethod(maze, path);
    }

    return maze;
  };
  return returnFn;
};

export default iterative;
