import React, { useEffect,useRef } from 'react';
import { useState } from 'react';
import './App.css';
import './Toggle.css';
import './DimensionBox.css'
import { FaDownload } from "react-icons/fa6";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import downloadPDF from "./utils/pdfDownload";
import Canvas from "./Components/DrawCanvas"; 
import DropdownInput from './Components/DropDownMenu';


function App() {

  const [isToggled, setIsToggled] = useState(false);
  const [alignment, setAlignment] = useState("Niche");
  const [orientation, setOrientation] = useState("Horizontal");
  const [floorDistance , setFloorDistance] = useState(50);
  const [screenDimension, setScreenDimension] = useState({"width":0, "height":0 , "depth":0});
  const [mountDepth, setMountDepth] = useState(0);
  const [mediaDepth, setMediaDepth] = useState(0);
  const [nicheDepthVar , setNicheDepthVar] = useState(0.3);
  const containerRef = useRef(null); // Reference to the entire UI

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment) setAlignment(newAlignment);
  };

  const handleOrientation = (event, newOrientation) => {
    if (newOrientation) setOrientation(newOrientation);
  };

  const fetchScreenDimension = (data) => {
    setScreenDimension({"width":data.width, "height":data.height, "depth":data.depth});
  } 

  const fetchMountDepth = (depth) => {
    console.log("Mount :" + depth)
    setMountDepth(depth);
  } 
  const fetchMediaDepth = (depth) => {
    console.log("Media :" + depth)
    setMediaDepth(depth);
  } 

  useEffect(() => {

  
  }, []);


  return(
    <div className='container' ref={containerRef}> 
      <div className='header'>
       
      </div>
      <div className='main-container'>
       <div className='led-display'>
        <Canvas rotation={orientation == "Horizontal"?1:0} outerWidth={640} outerHeight={440} innerWidth={600} innerHeight={400} 
        screenHeight={screenDimension.height} screenWidth={screenDimension.width}
        nicheHeight = {screenDimension.height + (screenDimension.height  <= 55 ? 3 : 4)}
        nicheWidth = {screenDimension.width + (screenDimension.width <= 55 ? 3 : 4)}
       />
          <div className="dimensions-container">
            {/* Niche Dimensions */}
            <div className="dimension-box">
              <h3 className="dimension-title">Niche Dimensions:</h3>
              <div className="dimension-row">
                <div className="dimension-label">Height</div>
                <div className="dimension-value">{screenDimension.height + (screenDimension.height  <= 55 ? 3 : 4)}"</div>
              </div>
              <div className="dimension-row">
                <div className="dimension-label">Width</div>
                <div className="dimension-value">{screenDimension.width + (screenDimension.width <= 55 ? 3 : 4)}"</div>
              </div>
              <div className="dimension-row">
                <div className="dimension-label">Depth</div>
                <div className="dimension-value">{screenDimension.depth + Math.max(mediaDepth, mountDepth) + nicheDepthVar}"</div>
              </div>
            </div>

            {/* Screen Dimensions */}
            <div className="dimension-box">
              <h3 className="dimension-title">Screen Dimensions:</h3>
              <div className="dimension-row">
                <div className="dimension-label">Height</div>
                <div className="dimension-value">{screenDimension.height}"</div>
              </div>
              <div className="dimension-row">
                <div className="dimension-label">Width</div>
                <div className="dimension-value">{screenDimension.width}"</div>
              </div>
              <div className="dimension-row">
                <div className="dimension-label">Depth</div>
                <div className="dimension-value">{screenDimension.depth}"</div>
              </div>
            </div>
          </div>
        </div>

        <div className='conifguration'>
          
          <div className='config-settings'>
          <h2>Configuration</h2>
              <DropdownInput sendScreenData={fetchScreenDimension} sendMediaDepth={fetchMediaDepth} sendMountDepth={fetchMountDepth}/>

            <div className="toggle-container">
              {/* First Toggle Group: Niche/Flat Wall */}
              <div className="toggle-group">
                <label className="toggle-label"></label>
                <ToggleButtonGroup
                  className="toggle-btn-group"
                  value={alignment}
                  exclusive
                  onChange={handleAlignment}
                  
                >
                  <ToggleButton value="Niche" className="toggle-btn">
                    Niche
                  </ToggleButton>
                  <ToggleButton value="Flat Wall" className="toggle-btn">
                    Flat Wall
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>

              {/* Second Toggle Group: Vertical/Horizontal */}
              <div className="toggle-group">
                <label className="toggle-label"></label>
                <ToggleButtonGroup
                  className="toggle-btn-group"
                  value={orientation}
                  exclusive
                  onChange={handleOrientation}
                 
                >
                  <ToggleButton value="Vertical" className="toggle-btn">
                    Vertical
                  </ToggleButton>
                  <ToggleButton value="Horizontal" className="toggle-btn">
                    Horizontal
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
            </div>
          <div className='dimension'>
            <div className='floor-dimension'>
              <p>Floor Distance </p><p className='floor-dimension-value'>{floorDistance}</p>
            </div>
            <div className='Niche-depth'>
              <p>Niche Depth Var </p><p className='Niche-depth-value'>{nicheDepthVar}</p>
            </div>
            </div>
          </div>


          <div className='description-container'>
            <h2>Description</h2>
            <input placeholder='Title'></input>
            <input placeholder='Drawer'></input>
           <input placeholder='Department'></input>
           <input placeholder='Screen Size'></input>
           <input placeholder='Date' type='date'></input>


          </div>
          <div className='download-btn-container'>
            <button className='download-btn' onClick={() => downloadPDF(containerRef, "full-ui.pdf")} > Download  <FaDownload className='download-icon' /> </button>
            
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default App;
