import React, { useRef, forwardRef, useEffect } from 'react';
import './App.css';
import map from './assets/mapRS.jpg'

const Workstation = () => {
    
    
    return (
        <div className="mapRule">
            <img src={map} alt="map" className="mapRule"/>
        </div>
    )
}

export default Workstation;