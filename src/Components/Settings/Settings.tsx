import styled from "styled-components";
import { settings } from "../Maze";
import {
  Button,
  Slider,
  Typography,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Switch,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { solvers, generators, algorithmBuilder } from "../../Algorithms";
import defaultSolution from "../../Algorithms/Framework/Conditionals/lastNodeFound";
import Plot from "../../Models/Plot";
import { Recursive } from "../../Algorithms/Framework/RecursiveConstructor";
import { Iterative } from "../../Algorithms/Framework/IterativeConstructor";
import Graph from "../../Models/Graph";

const Container = styled("div")`
  padding: 40px 20px;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
`;

const FormSection = styled("div")``;

interface SettingsProps {
  settingsState: [settings, React.Dispatch<React.SetStateAction<settings>>];
  solutionState: [
    Plot | null,
    React.Dispatch<React.SetStateAction<Plot | null>>
  ];
  maze: Graph;
}

const Settings = ({
  settingsState: [settings, setSettings],
  solutionState: [solution, setSolution],
  maze,
}: SettingsProps) => {
  const changeController = (event: any, key: string, newValue: any) => {
    setSettings({ ...settings, [key]: newValue });
  };

  const solveClick = () => {
    const algorithm = algorithmBuilder(
      settings.solver.type,
      settings.solver.method,
      defaultSolution
    );
    const solve = algorithm(maze);
    setSolution(solve);
  };

  return (
    <Container>
      <FormSection>
        <Typography id="maze-settings-header" variant="h4">
          Maze Settings
        </Typography>

        <div style={{ padding: "10px", display: "flex", width: "500px" }}>
          {/* Width */}
          <Typography
            id="input-slider"
            gutterBottom
            sx={{ padding: "0 10px 0 10px" }}
          >
            Width
          </Typography>
          <Slider
            aria-label="Volume"
            value={settings.width}
            onChange={(e, v) => {
              changeController(e, "width", v);
            }}
            name="width"
            step={1}
            min={2}
            max={20}
            valueLabelDisplay="auto"
          />
          {/* Height */}
          <Typography
            id="input-slider"
            gutterBottom
            sx={{ padding: "0 10px 0 10px" }}
          >
            Height
          </Typography>
          <Slider
            aria-label="Volume"
            value={settings.height}
            onChange={(e, v) => {
              changeController(e, "height", v);
            }}
            name="height"
            step={1}
            min={2}
            max={20}
            valueLabelDisplay="auto"
          />
        </div>
      </FormSection>
      <FormSection>
        <InputLabel>Generator</InputLabel>
        <FormControl fullWidth style={{ margin: "5px" }}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Generation Algorithm"
            variant="standard"
            onChange={(e) => {
              changeController(e, "generator", e.target.value);
            }}
            value={settings.generator.method}
          >
            {Object.keys(generators).map((algorithmType) => {
              console.log(algorithmType);
              return <MenuItem value={algorithmType}>{algorithmType}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <FormGroup
          aria-label="position"
          row
          style={{ justifyContent: "flex-end" }}
        >
          <FormControlLabel
            value={settings.generator.type}
            control={
              <Switch
                defaultChecked
                color="default"
                onChange={(e) => {
                  changeController(e, "generator", {
                    type: e.target.checked ? "iterative" : "recursive",
                    method: settings.generator.method,
                  });
                }}
              />
            }
            label={settings.generator.type}
            labelPlacement="start"
          />
        </FormGroup>
      </FormSection>
      <FormSection>
        <InputLabel>Solver</InputLabel>
        <FormControl fullWidth style={{ margin: "5px" }}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Generation Algorithm"
            variant="standard"
            value={settings.solver.method}
            onChange={(e) => {
              changeController(e, "solver", {
                type: "iterative",
                method: e.target.value,
              });
            }}
          >
            {Object.keys(solvers).map((algorithmType) => {
              return <MenuItem value={algorithmType}>{algorithmType}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <FormGroup
          aria-label="position"
          row
          style={{ justifyContent: "flex-end" }}
        >
          <FormControlLabel
            value={settings.solver.type}
            control={
              <Switch
                defaultChecked
                color="default"
                onChange={(e) => {
                  changeController(e, "solver", {
                    type: e.target.checked ? "iterative" : "recursive",
                    method: settings.solver.method,
                  });
                }}
              />
            }
            label={settings.solver.type}
            labelPlacement="start"
          />
        </FormGroup>
      </FormSection>
      {/* Buttons */}
      <FormSection>
        <div
          style={{ padding: "10px", display: "flex", justifyContent: "center" }}
        >
          <Button
            variant="outlined"
            sx={{ marginRight: "5px" }}
            onClick={solveClick}
          >
            Solve
          </Button>
        </div>
      </FormSection>
    </Container>
  );
};

export default Settings;
