
  
  import React, {useRef, useEffect, useState} from 'react';

  const Canvas = props => {
    const canvasRef = useRef(null);

    useEffect(() => {
        console.log("re render");
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        // Canvas size
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
    
        // Outer box (Niche)
        const outerWidth = props.rotation?props.outerWidth:props.outerHeight; // Width of the outer box
        const outerHeight = props.rotation?props.outerHeight:props.outerWidth; // Height of the outer box
        const outerX = (canvasWidth - outerWidth) / 2;
        const outerY = (canvasHeight - outerHeight) / 2;
    
        // Inner box (LED Screen)
        const innerWidth = props.rotation?props.innerWidth:props.innerHeight; // Width of the inner box
        const innerHeight = props.rotation?props.innerHeight:props.innerWidth; // Height of the inner box
        const innerX = (canvasWidth - innerWidth) / 2;
        const innerY = (canvasHeight - innerHeight) / 2;
        
        //Dotted line inside LED screen
        const dottedinnerWidth = props.rotation?530:330; // Width of the Dotted box
        const dottedinnerHeight = props.rotation?330:530; // Height of the Dotted box
        const dottedinnerX = (canvasWidth - innerWidth) / 2 + 35;
        const dottedinnerY = (canvasHeight - innerHeight) / 2 + 35;
    
        //Receptacle box
        const receptaclewidth = 100; // Width of the Dotted box
        const receptacleHeight = 100; // Height of the Dotted box
        const receptacleinnerX = (canvasWidth - 600) / 2 + 250;
        const receptacleinnerY = (canvasHeight - 400) / 2 + 250;
    
        //Inner Receptacle box
        const innerReceptaclewidth = 80; // Width of the Dotted box
        const innerReceptacleHeight = 80; // Height of the Dotted box
        const innerReceptacleinnerX = (canvasWidth - 600) / 2 + 260;
        const innerReceptacleinnerY = (canvasHeight - 400) / 2 + 260;
        // Clear Canvas
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
        // Draw Outer Box (Thick Border)
        if(props.alignment){
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#000";
        ctx.strokeRect(outerX, outerY, outerWidth, outerHeight);
        }
        // Draw Inner Box (Thin Border)
        ctx.lineWidth = 5;
        ctx.strokeRect(innerX, innerY, innerWidth, innerHeight);
    
        //Draw Dotted Inner box 
        ctx.lineWidth = 1;
        ctx.setLineDash([10, 8]); // 
        ctx.strokeRect(dottedinnerX, dottedinnerY, dottedinnerWidth, dottedinnerHeight);
        ctx.setLineDash([]); // Reset line dash to solid for other shapes
    
        //Draw receptacle box
        ctx.lineWidth = 1;
        ctx.setLineDash([10, 8]); // 
        ctx.strokeRect(receptacleinnerX, receptacleinnerY, receptaclewidth, receptacleHeight);
        ctx.setLineDash([]); // Reset line dash to solid for other shapes
    
        //Draw inner receptacle box
        ctx.lineWidth = 1;
        ctx.setLineDash([10, 8]); // 
        ctx.strokeRect(innerReceptacleinnerX, innerReceptacleinnerY, innerReceptaclewidth, innerReceptacleHeight);
        ctx.setLineDash([]); // Reset line dash to solid for other shapes
    
        // Draw Dimension Lines and Arrows
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000";
    
        // Top Horizontal Dimension
        ctx.beginPath();
        ctx.moveTo(innerX, outerY - 20); // Start from inner rectangle's left edge
        ctx.lineTo(innerX + innerWidth, outerY - 20); // End at inner rectangle's right edge
        ctx.moveTo(innerX, outerY - 25); // Left tick mark
        ctx.lineTo(innerX, outerY - 15);
        ctx.moveTo(innerX + innerWidth, outerY - 25); // Right tick mark
        ctx.lineTo(innerX + innerWidth, outerY - 15);
        ctx.stroke();
        
        if(props.alignment){
        // Left Vertical Dimension
        ctx.beginPath();
        ctx.moveTo(outerX - 20, outerY);
        ctx.lineTo(outerX - 20, outerY + outerHeight);
        ctx.moveTo(outerX - 25, outerY);
        ctx.lineTo(outerX - 15, outerY);
        ctx.moveTo(outerX - 25, outerY + outerHeight);
        ctx.lineTo(outerX - 15, outerY + outerHeight);
        ctx.stroke();
        }
        if(props.alignment){
        // Bottom Horizontal Dimension
        ctx.beginPath();
        ctx.moveTo(outerX, outerY + outerHeight + 20);
        ctx.lineTo(outerX + outerWidth, outerY + outerHeight + 20);
        ctx.moveTo(outerX, outerY + outerHeight + 25);
        ctx.lineTo(outerX, outerY + outerHeight + 15);
        ctx.moveTo(outerX + outerWidth, outerY + outerHeight + 25);
        ctx.lineTo(outerX + outerWidth, outerY + outerHeight + 15);
        ctx.stroke();
        }
        

        
        // Right Vertical Dimension
        ctx.beginPath();
        ctx.moveTo(outerX + outerWidth + 20, innerY); // Start from inner rectangle's top edge
        ctx.lineTo(outerX + outerWidth + 20, innerY + innerHeight); // End at inner rectangle's bottom edge
        ctx.moveTo(outerX + outerWidth + 25, innerY); // Top tick mark
        ctx.lineTo(outerX + outerWidth + 15, innerY);
        ctx.moveTo(outerX + outerWidth + 25, innerY + innerHeight); // Bottom tick mark
        ctx.lineTo(outerX + outerWidth + 15, innerY + innerHeight);
        ctx.stroke();
        
        //Bottom floor line
        ctx.beginPath();
        const floorLineY = outerY + outerHeight + 150; // Position further below the outer box
        ctx.moveTo(outerX - 20, floorLineY); // Start slightly left for padding
        ctx.lineTo(outerX + outerWidth + 20, floorLineY); // Extend slightly right
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 1;
        ctx.stroke();
        
        ctx.beginPath();
        const centerX = innerX + innerWidth / 2; // Center X coordinate of the screen
        const centerY = innerY + innerHeight / 2; // Center Y coordinate of the screen
        
        ctx.setLineDash([3, 3]); // Set dotted line style [dash length, gap length]
        
        // Draw horizontal line passing through the center
        ctx.moveTo(innerX - 100, centerY); // Start slightly to the left of the screen
        ctx.lineTo(innerX + innerWidth + 100, centerY); // End slightly to the right of the screen
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Center Vertical Line (Dotted and Extended)
        ctx.beginPath();
        // Draw vertical line passing through the center
        ctx.moveTo(centerX, innerY - 100); // Start slightly above the screen
        ctx.lineTo(centerX, innerY + innerHeight + 100); // End slightly below the screen
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Reset Line Dash to Solid (for future drawings)
        ctx.setLineDash([]);
    
        //Draw line From floor to center
        ctx.beginPath();
    
        // Starting point (Floor Line)
        const floorLineStartX = outerX - 70; // Slightly left of the outer rectangle
        const floorLineStartY = outerY + outerHeight + 150; // Position of the floor line
        //Draw the line outside of the box
        ctx.moveTo(floorLineStartX, floorLineStartY); // Start from the floor line
        ctx.lineTo(floorLineStartX, centerY); // Extend vertically to center of the screen
        ctx.moveTo(floorLineStartX - 10 / 2, centerY); // Left end of tick
        ctx.lineTo(floorLineStartX + 10 / 2, centerY); // Right end of tick
        ctx.moveTo(floorLineStartX - 10 / 2, floorLineStartY); // Left end of tick
        ctx.lineTo(floorLineStartX + 10 / 2, floorLineStartY); // Right end of tick
        ctx.strokeStyle = "#000"; // Black color for line
        ctx.lineWidth = 1;
        ctx.stroke();
    
    
    
        
    
        // Add Labels
        ctx.font = "14px Arial";
        ctx.fillStyle = "#000";
        ctx.fillText(props.rotation?props.screenWidth:props.screenHeight, outerX + outerWidth / 2 - 40, outerY - 30); // Top label
        if(props.alignment){ctx.fillText(props.rotation?props.nicheHeight:props.nicheWidth, outerX - 60, outerY + outerHeight / 2 + 35);} // Left label
        if(props.alignment){ctx.fillText(props.rotation?props.nicheWidth:props.nicheHeight, outerX + outerWidth / 2 - 40, outerY + outerHeight + 35);} // Bottom label
        ctx.fillText(props.rotation?props.screenHeight:props.screenWidth, outerX + outerWidth + 35, outerY + outerHeight / 2 - 20 ); // Right label
        ctx.fillText("Floor Line", outerX + outerWidth / 2 - 30, floorLineY + 15);
        ctx.fillText("50", outerX + outerWidth / 2 - 380, floorLineY - 55);
        
    },[ props.outerWidth,
        props.outerHeight,
        props.innerWidth,
        props.innerHeight,
        props.screenWidth,
        props.screenHeight,
        props.rotation,
        props.alignment]);

    return <canvas ref={canvasRef} height={1000} width={800} />
  }
  


  export default Canvas;