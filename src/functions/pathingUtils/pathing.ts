type ChildAcquisition = (cell: Cell) => Array<Cell>;
type ChildMutator = (children: Array<Cell>) => Array<Cell>;

const pathing = (
  maze: Maze,
  mazeSettings: MazeSettings,
  childAcquisition: ChildAcquisition,
  childMutator: ChildMutator
) => {};

export default pathing;
