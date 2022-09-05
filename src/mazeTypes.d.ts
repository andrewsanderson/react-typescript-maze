interface MazeSettings {
  height: number;
  width: number;
}

type Coordinates = [number, number];

interface Cell {
  coordinates: Coordinates;
  walls: [boolean, boolean, boolean, boolean];
}

type Maze = Array<Cell>;
