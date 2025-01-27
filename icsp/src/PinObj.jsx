import pin from './assets/locatePin.png';
import './App.css';

const PopUp = ({name, docs, onCLick}) => {
  // Pin name
  // Upload docs
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
      <p style={xStyle} onCLick={onCLick}>x</p>
    </div>
  );
}

export default function PinObj({x, y}){
  const componentStyle = {
    position: 'absolute',
    left: x,
    top: y,
    zIndex: 2,
  };
  
  return (
    <div style={componentStyle}>
      <PopUp name="you"></PopUp>
      <img src={pin} alt='pin' className='pinFollow'></img>
    </div>
  );
}
