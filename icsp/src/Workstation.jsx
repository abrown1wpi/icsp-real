import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import map from './assets/mapRS.jpg'
import pin from './assets/locatePin.png'

const PinButton = ({onClick}) => {
    return(
        <img src={pin} alt='pin button' className='pinButton' onClick={onClick}></img>
    )
}

const FollowPinObj = ({onClick}) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    useEffect(() => {
        const handleMouseMove = (e) => {
          setMousePosition({ x: e.clientX, y: e.clientY });
        };
    
        window.addEventListener('mousemove', handleMouseMove);
    
        return () => {
          window.removeEventListener('mousemove', handleMouseMove);
        };
      }, []); 
      const componentStyle = {
        position: 'absolute',
        left: mousePosition.x,
        top: mousePosition.y,
        zIndex: 2,
      };

      const handleClick = () => {
        onClick(mousePosition);
      }
    
      return (
          <div style={componentStyle} onClick={handleClick}>
            <img src={pin} alt='pin button' className='pinFollow'></img>
          </div>
      );
}

const Workstation = () => {
    const [followPins, setFollowPins] = useState([]);

    const createFollowPin = () => {
        setFollowPins([...followPins, <FollowPinObj key={followPins.length}></FollowPinObj>])
    }

    return (
        <div className="mapRule">
            <img src={map} alt="map" className="imgMapRule"/>
            <PinButton onClick={createFollowPin}></PinButton>
            {followPins}
        </div>

    )
}

export default Workstation;