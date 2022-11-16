import { useEffect, useState } from "react";
import styled from "styled-components";
import Graph from "../Models/Maze/Graph";
import Settings from "./Settings/Settings";
import common from "@mui/material/colors/common";
import Node from "../Models/Pathing/Node";
import Cell from "../Models/Maze/Cell";
import CellComponent from "./CellComponent";
import generators from "../Algorithms/Generators";
import solvers from "../Algorithms/Solvers";

const Row = styled("div")`
  display: flex;
`;

export type settings = {
  height: number;
  width: number;
  solver: keyof typeof solvers;
  generator: keyof typeof generators;
};

const Wrapper = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  align-content: center;
  height: 100%;
  padding-left: 10%;
  padding-right: 10%;
`;

const MazeContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 50%;
  min-width: 50%;
`;
const MazeBorder = styled("div")`
  border: 2px solid ${common.white};
`;

const MazeComponent = () => {
  const [settingsState, setSettingsState] = useState<settings>({
    width: 7,
    height: 7,
    generator: "randomisedDepthFirst",
    solver: "depthFirst",
  });

  const { height, width, solver, generator } = settingsState;

  const [mazeState, setMazeState] = useState<Graph>(
    new Graph({ height, width })
  );

  const [solutionState, setSolutionState] = useState<
    Array<Node<Cell>> | undefined
  >();

  const solveMaze = () => {
    return setSolutionState(solvers[solver](mazeState));
  };

  useEffect(() => {
    const newMaze = new Graph({ height, width });
    setMazeState(generators[generator](newMaze));
    setSolutionState(undefined);
  }, [height, width, generator, solver]);

  return (
    <Wrapper>
      <MazeContainer>
        <MazeBorder>
          {[...Array(mazeState.height).keys()].map((yVal) => {
            return (
              <Row key={yVal}>
                {mazeState.cells
                  .filter((cell) => {
                    return cell.coordinates.y === yVal;
                  })
                  .map((cell) => {
                    // find the position of the node in the solution
                    const position = solutionState?.findIndex(
                      (solutionNode) => {
                        return solutionNode.value === cell;
                      }
                    ) as number;

                    // Get the previous node in the solution
                    const lastNeighbor =
                      !!position &&
                      !!solutionState &&
                      solutionState[position - 1];

                    // Get the direction of said node.
                    const direction = !!lastNeighbor
                      ? cell.getCellDirection(lastNeighbor.value)
                      : undefined;

                    const length = !!solutionState ? solutionState.length : 0;

                    const last =
                      cell.id ===
                      settingsState.height * settingsState.width - 1;

                    return (
                      <CellComponent
                        key={cell.id}
                        cell={cell}
                        position={position}
                        length={length}
                        direction={direction}
                        last={last}
                      />
                    );
                  })}
              </Row>
            );
          })}
        </MazeBorder>
      </MazeContainer>
      <Settings
        settingsState={settingsState}
        setSettingsState={setSettingsState}
        solve={solveMaze}
      />
    </Wrapper>
  );
};

export default MazeComponent;
