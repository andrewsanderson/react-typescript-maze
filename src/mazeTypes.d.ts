interface MazeSettings {
  height: number;
  width: number;
}

type Coordinates = [number, number];

interface Cell {
  coordinates: Coordinates;
  walls: [boolean, boolean, boolean, boolean];
}

type Path = Array<Cell>;

type Maze = Array<Cell>;
