import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import map from './assets/mapRS.jpg'
import pin from './assets/locatePin.png'
import PinObj from './PinObj';

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

const Workstation = ({supabase, mapId, sendPinID, pinUpdate}) => {
    const [followPins, setFollowPins] = useState([]);
    const [pins, setPins] = useState([]);
    const [pinIDs, setPinIDs] = useState([]);
    const [mapImage, setMapImage] = useState(map);
    useEffect(() => {
      
      const fetchMap = async () => {
        if (!mapId) return;
        
        const { data, error } = await supabase.from("Maps").select().eq('id', mapId).single();
        if (data && data.file) {
          setMapImage(data.file);
        }
      };
      fetchMap();
    }, [mapId]);
    

    const createFollowPin = () => {
        setFollowPins([...followPins, <FollowPinObj key={followPins.length} onClick={createPin}></FollowPinObj>])
    }

    const createPin = (mousePosition) => {
      const { x, y } = mousePosition;

      supabase.from("Pins").insert({
        "Pin_Name": "",
        "Attached_Files": [],
        "Map_ID": mapId,
      }).select().then((result) => {
        setPins([...pins, <PinObj mapID={mapId} pinUpdate={pinUpdate} supabase={supabase} key={pins.length} x={x} y={y} id={result.data[0].id}></PinObj>])
        setPinIDs([...pinIDs, result.data[0].id])
        sendPinID(result.data[0].id);
        console.log(result.data[0].id);
      });

      setFollowPins([]);
      
    }

    return (
        <div className="mapRule">
            <img src={mapImage} alt="map" className="imgMapRule"/>
            <PinButton onClick={createFollowPin}></PinButton>
            {followPins}
            {pins}
        </div>

    )
}

export default Workstation;
