const mazeGeneration = (mazeSettings: MazeSettings): Maze => {
  const { height, width } = mazeSettings;

  const maze = [];

  for (const x of [...Array(height).keys()]) {
    for (const y of [...Array(width).keys()]) {
      const cell: Cell = {
        coordinates: [x, y],
        walls: [true, true, true, true],
      };
      maze.push(cell);
    }
  }

  return maze;
};

export default mazeGeneration;
