import "./compass.css";


const Compass = ({ degrees }) => {
  const angle = parseFloat(degrees.split(" ")[0]);

  return (
    <div className="compass-wrapper">
      <div className="compass-ring">
        {/* Cardinal Markers */}
        <span className="mark n">N</span>
        <span className="mark e">E</span>
        <span className="mark s">S</span>
        <span className="mark w">W</span>
        
        {/* The Rotating Needle */}
        <div 
          className="needle" 
          style={{ transform: `rotate(${angle}deg)` }}
        >
          <div className="needle-pointer"></div>
        </div>
        
        {/* Center hub */}
        <div className="compass-hub"></div>
      </div>
      <div className="compass-value">{angle}°</div>
    </div>
  );
};

export default Compass;