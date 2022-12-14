import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Graph from "../Models/Maze/Graph";
import Settings from "./SettingsComponent";
import common from "@mui/material/colors/common";
import Node from "../Models/Pathing/Node";
import Cell from "../Models/Maze/Cell";
import CellComponent from "./CellComponent";
import generators from "../Algorithms/Generators";
import solvers from "../Algorithms/Solvers";
import Tree from "../Models/Pathing/Tree";
import KeyComponent from "./KeyComponent";

// Simple use prevous hook.
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
  solve: boolean;
};

// simple wrapper styling
const Wrapper = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  align-content: center;
  height: 100%;
  padding-left: 10%;
  padding-right: 10%;
  @media (max-width: 1150px) {
    flex-direction: column;
    padding-top: 100px;
  }
`;

// Styling for the maze component container
const MazeContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 50%;
  min-width: 50%;
`;

// Entire maze requires a border.
const MazeBorder = styled("div")`
  border: 2px solid ${common.white};
`;

const MazeComponent = () => {
  const [settingsState, setSettingsState] = useState<settings>({
    width: 7,
    height: 7,
    generator: "Randomised Depth First",
    solver: "Depth First",
    solve: false,
  });

  const { height, width, solver, generator, solve } = settingsState;

  const interval = 10 / (height * width);

  const [mazeState, setMazeState] = useState<Graph>(
    generator !== "Manual"
      ? generators[generator](new Graph({ height, width }))
      : new Graph({ height, width })
  );

  const [manualPath, setManualPath] = useState<Array<Cell>>([]);

  const [solutionState, setSolutionState] = useState<Array<Node<Cell>>>();

  const [nodesState, setNodesState] = useState<Array<Node<Cell> | undefined>>();

  const prevSettings: settings = usePrevious<settings>(settingsState);

  useEffect(() => {
    // using the given keys, compare the old and new settings state to identify if any have changed.
    const hasChanged = (...keys: Array<keyof typeof settingsState>) => {
      if (!!prevSettings) {
        for (const key of keys) {
          if (prevSettings[key] !== settingsState[key]) {
            return true;
          }
        }
      }
      return false;
    };

    if (manualPath.length === 2) {
      const newM = new Graph(settingsState, mazeState.cells);
      const newState = generators[generator](
        newM,
        manualPath[0],
        manualPath[1]
      );
      setMazeState(newState);
      setManualPath([]);
    }

    // if this is the first assignment of settings
    if (prevSettings === undefined) {
      // if just the solver changes set a new tree from the solver.
      tree = solvers[solver](mazeState);
      // reasign the treeGenerator variable with the generator of the new tree
      treeGenerator = tree.generator();
    }

    // If the listed settings change
    else if (hasChanged("height", "width", "generator")) {
      // generate a new maze with the given generator
      const newMaze = new Graph({ height, width });

      if (generator !== "Manual") {
        setMazeState(generators[generator](newMaze));
      } else {
        setMazeState(newMaze);
      }

      // generate a new tree for use with the new maze.
      tree = solvers[solver](newMaze);
      // reassign the treeGenerator variable with the generator of this new tree.
      treeGenerator = tree.generator();

      // remove current nodes.
      setNodesState(undefined);
    }

    // if the solver metho changes
    else if (hasChanged("solver")) {
      // if just the solver changes set a new tree from the solver.
      tree = solvers[solver](mazeState);
      // reasign the treeGenerator variable with the generator of the new tree
      treeGenerator = tree.generator();
      setSolutionState(undefined);
      setNodesState(undefined);
    }

    // if the tree is being solves
    else if (solve) {
      if (tree !== undefined) {
        const step = async () => {
          // If there is more than a single 'path' we'll progress them all so we can effectively illustrate tree progression.

          // Otherwise simply progress to the next node
          const nextVal = treeGenerator.next().value;
          if (nextVal === undefined) {
            setSettingsState({ ...settingsState, solve: false });
            setSolutionState(tree.solution);
          } else {
            setNodesState(nextVal);
          }
        };
        step();
      }
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
    solve,
    interval,
    manualPath,
  ]);

  const handleCellClick = (cell: Cell) => {
    const newPath = [...manualPath];
    newPath.push(cell);
    setManualPath(newPath);
  };

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
                    const solutionIndex = solutionState?.findIndex((node) => {
                      return node.value === cell;
                    });

                    const status =
                      nodesState !== undefined &&
                      Array.from(nodesState).find((node) => {
                        return node?.value.id === cell.id;
                      })?.status;

                    const from =
                      !!solutionState &&
                      !!solutionIndex &&
                      solutionIndex > -1 &&
                      cell.getCellDirection(
                        solutionState[solutionIndex - 1]?.value
                      );

                    const to =
                      !!solutionState &&
                      typeof solutionIndex === "number" &&
                      solutionIndex > -1 &&
                      solutionIndex < solutionState.length - 1 &&
                      cell.getCellDirection(
                        solutionState[solutionIndex + 1]?.value
                      );

                    const manual = settingsState.generator === "Manual";

                    const isInManual = manualPath.includes(cell);

                    return (
                      <div
                        key={cell.cellString}
                        onClick={() => handleCellClick(cell)}
                      >
                        <CellComponent
                          key={cell.id}
                          cell={cell}
                          status={status}
                          solutionIndex={solutionIndex}
                          from={from}
                          to={to}
                          interval={interval}
                          manual={manual}
                          isInManual={isInManual}
                        />
                      </div>
                    );
                  })}
              </Row>
            );
          })}
        </MazeBorder>

        <KeyComponent />
      </MazeContainer>
      <Settings
        settingsState={settingsState}
        setSettingsState={setSettingsState}
      />
    </Wrapper>
  );
};

export default MazeComponent;
