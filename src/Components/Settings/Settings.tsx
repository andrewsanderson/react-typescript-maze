import { BaseSyntheticEvent } from "react";
import styled from "styled-components";

import { settings } from "../Maze";
import { options } from "./options";
import {
  Button,
  Slider,
  Typography,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const Container = styled("div")`
  padding: 40px 20px;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
`;

const FormSection = styled("div")``;

interface SettingsProps {
  settingsState: [settings, React.Dispatch<React.SetStateAction<settings>>];
}

const Settings = ({ settingsState }: SettingsProps) => {
  const [settings, setSettings] = settingsState;

  // height & width = counter
  // solver iterative/recursive = dropdwon
  // generator iterative/recursive = dropdown

  const handleSolverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
  };

  const handleDimensionChange = (
    e: Event,
    newValue: number | number[],
    name: string
  ) => {
    setSettings({ ...settings, [name]: newValue });
  };

  return (
    <Container>
      <FormSection>
        <Typography id="maze-settings-header" variant="h4">
          Maze Settings
        </Typography>
        <div style={{ padding: "10px", display: "flex", width: "500px" }}>
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
              handleDimensionChange(e, v, "width");
            }}
            name="width"
            step={1}
            min={2}
            max={20}
            valueLabelDisplay="auto"
          />
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
              handleDimensionChange(e, v, "height");
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
          <InputLabel id="demo-simple-select-label">Repetition</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Generation Algorithm"
            variant="standard"
          >
            {options.algorithmTypes.map((algorithmType) => {
              return <MenuItem value={10}>{algorithmType.title}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </FormSection>
      <FormSection>
        <InputLabel>Solver</InputLabel>

        <FormControl fullWidth style={{ margin: "5px" }}>
          <InputLabel id="demo-simple-select-label">Repetition</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Generation Algorithm"
            variant="standard"
          >
            {options.algorithmTypes.map((algorithmType) => {
              return <MenuItem value={10}>{algorithmType.title}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </FormSection>
      <FormSection>
        <div
          style={{ padding: "10px", display: "flex", justifyContent: "center" }}
        >
          <Button variant="outlined" sx={{ marginRight: "5px" }}>
            Step
          </Button>
          <Button variant="outlined" sx={{ marginLeft: "5px" }}>
            Solve
          </Button>
        </div>
      </FormSection>
    </Container>
  );
};

export default Settings;
