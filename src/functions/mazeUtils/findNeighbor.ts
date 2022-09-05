import boundaryCheck from "./boundaryCheck";

const findNeighbor = (
  maze: Maze,
  current: Cell,
  direction: number,
  mazeSettings: MazeSettings
) => {
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
  return boundaryCheck(goalCoordinates, mazeSettings)
    ? goalCoordinates
    : console.log("OOB", JSON.stringify(goalCoordinates));
};

export default findNeighbor;
