import styled from "styled-components";
import { settings } from "../MazeComponent";
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
import Graph from "../../Models/Maze/Graph";
import Node from "../../Models/Pathing/Node";
import Cell from "../../Models/Maze/Cell";
import generators from "../../Algorithms/Generators";
import solvers from "../../Algorithms/Solvers";

const Container = styled("div")`
  padding: 40px 20px;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
`;

const DropDownWrapper = styled("div")`
  padding: 20px;
`;

const FormSection = styled("div")``;

interface SettingsProps {
  settingsState: settings;
  setSettingsState: React.Dispatch<React.SetStateAction<settings>>;
  solve: () => void;
}

const Settings = ({
  settingsState,
  setSettingsState,
  solve,
}: SettingsProps) => {
  const { height, width, solver, generator } = settingsState;

  const handleDimensionChange = (e: Event) => {
    const { value, name } = e.target as HTMLInputElement;
    setSettingsState({ ...settingsState, [name]: value });
  };

  const handleAlgorithmChange = (e: any) => {
    const { value, name } = e.target as HTMLInputElement;
    setSettingsState({ ...settingsState, [name]: value });
  };

  const handleSolveClick = () => {
    solve();
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
            value={width}
            name="width"
            step={1}
            min={2}
            max={20}
            valueLabelDisplay="auto"
            onChange={handleDimensionChange}
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
            value={height}
            name="height"
            step={1}
            min={2}
            max={20}
            valueLabelDisplay="auto"
            onChange={handleDimensionChange}
          />
        </div>
      </FormSection>
      <DropDownWrapper>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Generator</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={generator}
            name="generator"
            label="Generator"
            onChange={handleAlgorithmChange}
          >
            {Object.entries(generators).map(([key]) => {
              return (
                <MenuItem key={key} value={key}>
                  {key}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </DropDownWrapper>
      <DropDownWrapper>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Solver</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={solver}
            label="Solver"
            name="solver"
            onChange={handleAlgorithmChange}
          >
            {Object.entries(solvers).map(([key]) => {
              return (
                <MenuItem key={key} value={key}>
                  {key}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </DropDownWrapper>

      {/* Buttons */}
      <FormSection>
        <div
          style={{ padding: "10px", display: "flex", justifyContent: "center" }}
        >
          <Button
            variant="outlined"
            sx={{ marginRight: "5px" }}
            onClick={handleSolveClick}
          >
            Solve
          </Button>
        </div>
      </FormSection>
    </Container>
  );
};

export default Settings;
