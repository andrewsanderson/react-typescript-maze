import boundaryCheck from "./boundaryCheck";

const findNeighbor = (
  maze: Maze,
  current: Cell,
  direction: number,
  mazeSettings: MazeSettings
): Cell | undefined => {
  const goalCoordinates: Coordinates = [...current.coordinates];
  switch (direction) {
    case 0:
      goalCoordinates[1]--;
      break;
    case 1:
      goalCoordinates[0]++;
      break;
    case 2:
      goalCoordinates[1]++;
      break;
    case 3:
      goalCoordinates[0]--;
      break;
    default:
      break;
  }
  const neighbor = boundaryCheck(goalCoordinates, mazeSettings)
    ? maze.find((cell) => {
        return cell.coordinates.toString() === goalCoordinates.toString();
      })
    : undefined;
  return neighbor;
};
export default findNeighbor;
