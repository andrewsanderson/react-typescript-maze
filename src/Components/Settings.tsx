import React from "react";
import styled from "styled-components";

interface SettingsProps {
  mazeSettingsState: [
    MazeSettings,
    React.Dispatch<React.SetStateAction<MazeSettings>>
  ];
}

const Label = styled.div`
  padding-left: 15px;
  padding-right: 5px;
`;

const SettingsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 10px;
  background-color: #e3e3e3;
`;

const Settings = (settingsProps: SettingsProps) => {
  const { mazeSettingsState } = settingsProps;

  const [mazeSettings, setMazeSettings] = mazeSettingsState;

  const { height, width } = mazeSettings;

  const handleChange = (e: any) => {
    const setting: keyof MazeSettings =
      e.target.attributes["data-setting"].value;

    const newSettings: MazeSettings = { ...mazeSettings };

    newSettings[setting] = parseInt(e.target.value);

    setMazeSettings(newSettings);
  };

  return (
    <SettingsContainer>
      <Label>height</Label>
      <input
        type="number"
        data-setting="height"
        defaultValue={height}
        onChange={handleChange}
      />
      <Label>width</Label>
      <input
        type="number"
        data-setting="width"
        defaultValue={width}
        onChange={handleChange}
      />
    </SettingsContainer>
  );
};

export default Settings;
