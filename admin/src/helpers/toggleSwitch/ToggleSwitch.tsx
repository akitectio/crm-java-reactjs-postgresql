import React, { useState } from "react";
import "./ToggleSwitch.css";

const ToggleSwitch: React.FC = () => {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  return (
    <div
      className={`toggle-switch ${isOn ? "on" : "off"}`}
      onClick={toggleSwitch}
    >
      <div className="switch-handle"></div>
    </div>
  );
};

export default ToggleSwitch;
