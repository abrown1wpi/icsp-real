import pin from './assets/locatePin.png';
import { useState, useEffect } from 'react';
import './App.css';

export default function FollowPinObj({onClick}){
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
