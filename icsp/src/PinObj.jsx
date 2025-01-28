import pin from './assets/locatePin.png';
import {useState} from 'react'
import './App.css';

const PopUp = ({name, docs, onClick}) => {
  const componentStyle = {
    position: 'absolute',
    zIndex: 2,
    width: '10vw',
    height: '10vh',
    background: '#ffffff',
    bottom: '100%',
  }

  const pStyle = {
    fontFamily: 'georgia',
    fontSize: '0.6em',
  }

  const xStyle = {
    fontFamily: 'arial',
    position: 'absolute',
    left: '90%',
    top: '-20%',
    fontSize: '0.7em',
  }

  return(
    <div style={componentStyle}>
      <p style={pStyle}>{name}</p>
      <p style={xStyle} onClick={onClick}>x</p>
    </div>
  );
}

export default function PinObj({x, y}){
  const [showPopUp, setShowPopUp] = useState(false);
  const componentStyle = {
    position: 'absolute',
    left: x,
    top: y,
    zIndex: 2,
  };
  
  return (
    <div style={componentStyle}>
      {(showPopUp)? <PopUp name="you" onClick={() => setShowPopUp(false)}></PopUp>: <></>}
      <img src={pin} alt='pin' className='pinFollow' onClick={() => setShowPopUp(true)}></img>
    </div>
  );
}
