import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Graph from "../Models/Maze/Graph";
import Settings from "./Settings/Settings";
import common from "@mui/material/colors/common";
import Node from "../Models/Pathing/Node";
import Cell from "../Models/Maze/Cell";
import CellComponent from "./CellComponent";
import generators from "../Algorithms/Generators";
import solvers from "../Algorithms/Solvers";
import { Button } from "@mui/material";
import LoopIcon from "@mui/icons-material/Loop";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Tree from "../Models/Pathing/Tree";

// Hook
function usePrevious<T>(value: T): T {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref: any = useRef<T>();
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

let tree: Tree<Cell>;
let treeGenerator: Generator<Node<Cell>[] | void>;

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
    generator: "Randomised Depth First",
    solver: "Depth First",
  });

  const { height, width, solver, generator } = settingsState;

  const [mazeState, setMazeState] = useState<Graph>(
    new Graph({ height, width })
  );

  const [nodesState, setNodesState] = useState<Array<Node<Cell> | undefined>>();

  const setNewTree = (solver: keyof typeof solvers, mazeState: Graph) => {
    tree = solvers[solver](mazeState);
    treeGenerator = tree.generator();
  };

  const prevSettings: settings = usePrevious<settings>(settingsState);

  useEffect(() => {
    if (JSON.stringify(prevSettings) !== JSON.stringify(settingsState)) {
      const newMaze = new Graph({ height, width });
      setMazeState(generators[generator](newMaze));
      tree = solvers[solver](newMaze);
      treeGenerator = tree.generator();
    } else if (tree !== undefined) {
      setTimeout(() => {
        if (tree.paths.length > 0) {
          let endValue;
          for (const next of tree.paths) {
            endValue = treeGenerator.next().value;
          }
          setNodesState(endValue);
        } else {
          setNodesState(treeGenerator.next().value);
        }
      }, 200);
    }
  }, [
    height,
    width,
    generator,
    solver,
    prevSettings,
    settingsState,
    mazeState,
    nodesState,
  ]);

  const onClick = () => {
    setNodesState(treeGenerator.next().value);
  };

  return (
    <Wrapper>
      <MazeContainer>
        <Button onClick={onClick}>
          <LoopIcon />
          <PlayArrowIcon />
        </Button>

        <MazeBorder>
          {[...Array(mazeState.height).keys()].map((yVal) => {
            return (
              <Row key={yVal}>
                {mazeState.cells
                  .filter((cell) => {
                    return cell.coordinates.y === yVal;
                  })
                  .map((cell) => {
                    // // find the position of the node in the solution
                    // const position = solutionState?.findIndex(
                    //   (solutionNode) => {
                    //     return solutionNode.value === cell;
                    //   }
                    // ) as settings;

                    // // Get the previous node in the solution
                    // const lastNeighbor =
                    //   !!position &&
                    //   !!solutionState &&
                    //   solutionState[position - 1];

                    // // Get the direction of said node.
                    // const direction = !!lastNeighbor
                    //   ? cell.getCellDirection(lastNeighbor.value)
                    //   : undefined;

                    // const length = !!solutionState ? solutionState.length : 0;

                    // const last =
                    //   cell.id ===
                    //   settingsState.height * settingsState.width - 1;

                    const status =
                      nodesState !== undefined &&
                      Array.from(nodesState).find((node) => {
                        return node?.value.id === cell.id;
                      })?.status;

                    return (
                      <CellComponent
                        key={cell.id}
                        cell={cell}
                        status={status}
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
      />
    </Wrapper>
  );
};

export default MazeComponent;
