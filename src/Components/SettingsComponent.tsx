import styled, { keyframes } from "styled-components";
import { settings } from "./MazeComponent";
import {
  Button,
  Slider,
  Typography,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Switch,
} from "@mui/material";
import SyncIcon from "@mui/icons-material/Sync";
import ClearIcon from "@mui/icons-material/Clear";

import generators from "../Algorithms/Generators";
import solvers from "../Algorithms/Solvers";

const rotation = keyframes`{
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}`;

const RotatingIcon = styled(SyncIcon)`
  animation: ${rotation} 2s infinite linear;
  background-color: #90caf9;
  border-radius: 50%;
  color: white;
`;

const DefaultIcon = styled(ClearIcon)`
  background-color: #90caf9;
  border-radius: 50%;
  color: white;
`;

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
}

const Settings = ({ settingsState, setSettingsState }: SettingsProps) => {
  const { height, width, solver, generator, solve } = settingsState;

  const handleDimensionChange = (e: Event) => {
    const { value, name } = e.target as HTMLInputElement;
    setSettingsState({ ...settingsState, [name]: value });
  };

  const handleAlgorithmChange = (e: any) => {
    const { value, name } = e.target as HTMLInputElement;
    setSettingsState({ ...settingsState, [name]: value });
  };

  return (
    <Container>
      <FormSection>
        <Typography
          id="maze-settings-header"
          variant="h4"
          style={{
            textAlign: "center",
            fontWeight: "900",
            paddingBottom: "25px",
          }}
        >
          MAZE SETTINGS
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
            max={15}
            valueLabelDisplay="auto"
            onChange={handleDimensionChange}
          />
          {/* Height */}
          <Typography
            id="input-slider"
            gutterBottom
            sx={{ padding: "0 10px 0 20px" }}
          >
            Height
          </Typography>
          <Slider
            aria-label="Volume"
            value={height}
            name="height"
            step={1}
            min={2}
            max={15}
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
          style={{
            padding: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "600",
          }}
        >
          Solve
          <Switch
            icon={<DefaultIcon />}
            checkedIcon={<RotatingIcon />}
            checked={solve}
            onChange={(e, val) => {
              const newSettings: settings = { ...settingsState, solve: val };
              setSettingsState(newSettings);
            }}
          />
        </div>
      </FormSection>
    </Container>
  );
};

export default Settings;
