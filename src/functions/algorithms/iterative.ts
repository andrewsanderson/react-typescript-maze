type ChildAcquisition = (cell: Cell, maze: Maze) => Array<Cell>;
type ChildMutator = (children: Array<Cell>) => Array<Cell>;
type PathMutator = (
  children: Array<Cell>,
  path: Path,
  childMutator?: ChildMutator
) => Path;

const iterative = (
  startingCell: Cell,
  maze: Maze,
  mazeSettings: MazeSettings,
  childAcquisition: ChildAcquisition,
  pathMutator: PathMutator,
  childMutator: ChildMutator
) => {
  const path: Path = [startingCell];

  const children = childAcquisition(path[path.length], maze);

  if (children.length > 0) {
    childMutator(child);
  }

  //acquire children from the maze given the starting position and the child acquirer
  // send these children to the child mutator
  // the child mutator must return 'goal reached' or a cell
  // on goal reached we stop
  // on cell returned we continue with the new cell as the 'current position'
};

export default iterative;
