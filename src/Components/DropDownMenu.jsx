import React, { useState ,useEffect} from "react";
import "./DropdownInput.css";
import jsonData from "../data/json_data/Screen.json";
import MfgjsonData from "../data/json_data/MFG.json"
import MountjsonData from "../data/json_data/MOUNT.json"
import RecjsonData from "../data/json_data/REC.json"

const DropdownInput = ({ sendScreenData , sendMediaDepth, sendMountDepth}) => {
  const [screenOptions, setScreenOptions] = useState([]);
  const [selectedScreenOption, setSelectedScreenOption] = useState("");

  const [mfgPartOptions, setMfgPartOptions] = useState([]);
  const [selectedMfgPart, setSelectedMfgPart] = useState("");

  const [mountOptions, setMountOptions] = useState([]);
  const [selectedMountOption, setselectedMountOption] = useState("");
  const [isMountDropdownOpen, setIsMountDropdownOpen] = useState(false);


  const [recOptions, setRecOptions] = useState([]);
  const [selectedRecOption, setSelectedRecOption] = useState("");
  const [isRecDropdownOpen, setIsRecDropdownOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [mediaOpen, setMediaOpen] = useState(false);

  useEffect(() => {
    const screenMFRs = jsonData.map((item) => item["Screen MFR"]);
    setScreenOptions(screenMFRs);
    const mfgParts = MfgjsonData.map((item) => item["MFG. PART"]);
    setMfgPartOptions(mfgParts);
    const mountParts = MountjsonData.map((item) => item["MFG. PART"]);
    setMountOptions(mountParts);
    const recParts = RecjsonData.map((item) => item["MFG. PART"]);
    setRecOptions(recParts);
  }, []);


  const handleScreenSelect = (screenOptions) => {
    const result = jsonData
  .filter((item) => item["Screen MFR"] === screenOptions) // Filter for matching Screen MFR
  .map(screen => ({
    width: screen.Width,
    height: screen.Height,
    depth: screen.Depth
  }));
    sendScreenData(result[0]);
    setSelectedScreenOption(screenOptions);
    setIsOpen(false);
  };

  const handleMediaSelect = (mediaPlayerOptions) => {
    const result = MfgjsonData
  .filter((item) => item["MFG. PART"] === mediaPlayerOptions) // Filter for matching Screen MFR
  .map(screen => ({
    depth: screen.Depth
  }));
    sendMediaDepth(result[0].depth);
    setSelectedMfgPart(mediaPlayerOptions);
    setMediaOpen(false);
  };

  const handleMountSelect = (mountOptions) => {
    const result = MountjsonData
  .filter((item) => item["MFG. PART"] === mountOptions) // Filter for matching Screen MFR
  .map(screen => ({
    depth: screen["Depth (in)"]
  }));
    sendMountDepth(result[0].depth);
    setselectedMountOption(mountOptions);
    setIsMountDropdownOpen(false);
  };

  const handleRecSelect = (recOptions) => {
    setSelectedRecOption (recOptions);
    setIsRecDropdownOpen(false);
  };
  return (
    <div>
    {/* Screen Dropdown */}
    <div className="dropdown-container">
      <div
        className="dropdown-input"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selectedScreenOption || "Screen MPN"}
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          {screenOptions.map((screenOption, index) => (
            <div
              key={index}
              className="dropdown-option"
              onClick={() => handleScreenSelect(screenOption)}
            >
              {screenOption}
            </div>
          ))}
        </div>
      )}
    </div>
  
    {/* Media Dropdown */}
    <div className="dropdown-container">
      <div
        className="dropdown-input"
        onClick={() => setMediaOpen((prev) => !prev)}
      >
        {selectedMfgPart  || "Media MPN"}
      </div>
      {mediaOpen && (
        <div className="dropdown-menu">
          {mfgPartOptions.map((mfgPartOptions, index) => (
            <div
              key={index}
              className="dropdown-option"
              onClick={() => handleMediaSelect(mfgPartOptions)}
            >
              {mfgPartOptions}
            </div>
          ))}
        </div>
      )}
    </div>
  
    {/* Mount Dropdown */}
    <div className="dropdown-container">
      <div
        className="dropdown-input"
        onClick={() => setIsMountDropdownOpen((prev) => !prev)}
      >
        {selectedMountOption  || "Mount MPN"}
      </div>
      {isMountDropdownOpen  && (
        <div className="dropdown-menu">
          {mountOptions.map((mountOption, index) => (
            <div
              key={index}
              className="dropdown-option"
              onClick={() => handleMountSelect(mountOption)}
            >
              {mountOption}
            </div>
          ))}
        </div>
      )}
    </div>
  
    {/* Receptacle Dropdown */}
    <div className="dropdown-container">
      <div
        className="dropdown-input"
        onClick={() => setIsRecDropdownOpen((prev) => !prev)}
      >
        {selectedRecOption  || "Receptacle MPN"}
      </div>
      {isRecDropdownOpen  && (
        <div className="dropdown-menu">
          {recOptions.map((recOptions, index) => (
            <div
              key={index}
              className="dropdown-option"
              onClick={() => handleRecSelect(recOptions)}
            >
              {recOptions}
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
  );
};

export default DropdownInput;
