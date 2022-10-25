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

interface SettingsProps {
  settingsState: [settings, React.Dispatch<React.SetStateAction<settings>>];
}

const Settings = ({ settingsState }: SettingsProps) => {
  const [settings, setSettings] = settingsState;

  // height & width = counter
  // solver iterative/recursive = dropdwon
  // generator iterative/recursive = dropdown

  const handleSolverChange = (e: BaseSyntheticEvent) => {
    console.log(e);
  };

  return (
    <Container>
      <div style={{ padding: "10px", display: "flex", width: "500px" }}>
        <Typography id="input-slider" gutterBottom>
          Width
        </Typography>
        <Slider aria-label="Volume" value={5} />
        <Typography id="input-slider" gutterBottom>
          Height
        </Typography>
        <Slider aria-label="Volume" value={5} />
      </div>

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
      <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
        <FormControlLabel
          control={<Checkbox name="iterative" />}
          label="Iterative"
        />
        <FormControlLabel
          control={<Checkbox name="recursive" />}
          label="Recursive"
        />
      </FormGroup>
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
      <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
        <FormControlLabel
          control={<Checkbox name="iterative" />}
          label="Iterative"
        />
        <FormControlLabel
          control={<Checkbox name="recursive" />}
          label="Recursive"
        />
      </FormGroup>
      <div style={{ padding: "10px", display: "flex" }}>
        <Button variant="outlined">Step</Button>
        <Button variant="outlined">Solve</Button>
      </div>
    </Container>
  );
};

export default Settings;
