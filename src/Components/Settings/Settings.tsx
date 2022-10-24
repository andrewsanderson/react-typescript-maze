import styled from "styled-components";
import { Iterative, Recursive } from "../../Algorithms/Framework";
import iterativeConstructor from "../../Algorithms/Framework/iterative";
import recursiveConstructor from "../../Algorithms/Framework/recursive";
import randomisedDepthFirst from "../../Algorithms/Generators/randomisedDepthFirst";
import breadthFirst from "../../Algorithms/Solvers/breadthFirst";
import depthFirst from "../../Algorithms/Solvers/depthFirst";
import { settings } from "../Maze";

const options = {
  algorithmTypes: [
    { title: "Recursive", fn: recursiveConstructor },
    { title: "Iterative", fn: iterativeConstructor },
  ],
  solvers: [
    { title: "breadthFirst", fn: breadthFirst },
    { title: "depthFirst", fn: depthFirst },
  ],
  generators: [{ title: "randomisedDepthFirst", fn: randomisedDepthFirst }],
};

const Container = styled("div")`
  padding: 40px 20px;
  display: flex;
  justify-content: space-evenly;
`;

interface SettingsProps {
  settingsState: [settings, React.Dispatch<React.SetStateAction<settings>>];
}

const Settings = ({ settingsState }: SettingsProps) => {
  const [settings, setSettings] = settingsState;

  // height & width = counter
  // solver iterative/recursive = dropdwon
  // generator iterative/recursive= dropdown

  const handleSolverChange = (e) => {
    console.log(e);
  };

  return (
    <Container>
      <label>
        Maze Solver:
        <select value={"bread"} onChange={handleSolverChange}>
          {options.algorithmTypes.map((algorithmType) => {
            return (
              <optgroup label={algorithmType.title}>
                {options.solvers.map((solver) => {
                  return (
                    <option key={solver.title} value={solver.title}>
                      {algorithmType.title} {solver.title}
                    </option>
                  );
                })}
              </optgroup>
            );
          })}
        </select>
      </label>
      <label>
        Maze Generator:
        <select value={"bread"} onChange={handleSolverChange}>
          {options.algorithmTypes.map((algorithmType) => {
            return (
              <optgroup label={algorithmType.title}>
                {options.generators.map((generator) => {
                  return (
                    <option key={generator.title} value={generator.title}>
                      {algorithmType.title} {generator.title}
                    </option>
                  );
                })}
              </optgroup>
            );
          })}
        </select>
      </label>
      <label>
        Maze Width
        <input type="number" />
      </label>
      <label>
        Maze Height
        <input type="number" />
      </label>
    </Container>
  );
};

export default Settings;
