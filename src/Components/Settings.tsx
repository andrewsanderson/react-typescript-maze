import React from "react";

interface SettingsProps {
  mazeSettingsState: [
    MazeSettings,
    React.Dispatch<React.SetStateAction<MazeSettings>>
  ];
}

const Settings = (settingsProps: SettingsProps) => {
  const { mazeSettingsState } = settingsProps;

  const [mazeSettings, setMazeSettings] = mazeSettingsState;

  const { height, width } = mazeSettings;

  const handleChange = (e: any) => {
    const setting: keyof MazeSettings =
      e.target.attributes["data-setting"].value;
    const newSettings: MazeSettings = { ...mazeSettings };
    newSettings[setting] = e.target.value;
    setMazeSettings(newSettings);
    console.log(mazeSettings);
  };

  return (
    <div>
      height
      <input
        type="number"
        data-setting="height"
        defaultValue={height}
        onChange={handleChange}
      />
      width
      <input
        type="number"
        data-setting="width"
        defaultValue={width}
        onChange={handleChange}
      />
    </div>
  );
};

export default Settings;
