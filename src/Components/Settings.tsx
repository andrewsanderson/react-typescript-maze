import React from "react";
import styled from "styled-components";

interface ConfigProps {
  mazeConfigState: [
    MazeConfig,
    React.Dispatch<React.SetStateAction<MazeConfig>>
  ];
}

const Label = styled.div`
  padding-left: 15px;
  padding-right: 5px;
`;

const ConfigContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 10px;
  background-color: #e3e3e3;
`;

const Config = (ConfigProps: ConfigProps) => {
  const { mazeConfigState } = ConfigProps;

  const [mazeConfig, setMazeConfig] = mazeConfigState;

  const { height, width } = mazeConfig;

  const handleChange = (e: any) => {
    const setting: keyof MazeConfig = e.target.attributes["data-setting"].value;

    const newConfig: MazeConfig = { ...mazeConfig };

    newConfig[setting] = parseInt(e.target.value);

    setMazeConfig(newConfig);
  };

  return (
    <ConfigContainer>
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
    </ConfigContainer>
  );
};

export default Config;
