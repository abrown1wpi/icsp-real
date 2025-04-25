import pin from './assets/locatePin.png';
import {useState, useEffect} from 'react'
import './App.css';

const PopUp = ({onClick, id, supabase, pinUpdate}) => {
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
    fontFamily: 'helvetica',
    position: 'absolute',
    left: '90%',
    top: '-20%',
    fontSize: '0.7em',
  }
  const [pinName, setPinName] = useState("");

  // Fetch the pin name when component loads
  useEffect(() => {
    const fetchPinName = async () => {
      const { data, error } = await supabase.from("Pins").select("Pin_Name").eq("id", id).single();
      if (error) {
        console.error("Error fetching pin name:", error);
      } else {
        setPinName(data.Pin_Name || ""); // Set default empty string if null
      }
    };
    fetchPinName();
  }, [id, supabase]);

  // Update Supabase when user finishes editing (onBlur)
  const handleBlur = async () => {
    const { error } = await supabase.from("Pins").update({ Pin_Name: pinName }).eq("id", id);
    pinUpdate();
    console.log("Ran");
    if (error) {
      console.error("Error updating pin name:", error);
    }
  };

  return(
    <div style={componentStyle}>
      <input style={pStyle} type="text" placeholder="Enter pin name" value={pinName} onChange={(e) => setPinName(e.target.value)} onBlur={handleBlur}></input>
      <p style={xStyle} onClick={onClick}>x</p>
    </div>
  );
}

export default function PinObj({supabase, x, y, id, pinUpdate, mapID}){
  const [showPopUp, setShowPopUp] = useState(true);

  useEffect(()=>{
    const updateMap = async () => {
      const response = (await supabase.from("Maps").select("pins").eq("id", mapID).single()).data.pins;
      console.log(`RESPONSE: ${JSON.stringify(response)}`);
      const newPin = [...response, id];
      console.log(newPin);

      const { error } = await supabase.from("Maps").update({ pins: newPin }).eq("id", mapID);
      if (error) {
        console.error("Error updating map pin list:", error);
      }
    }

    updateMap()

    return () => {
      console.log("Component destroyed");
    }
  },[])

  const componentStyle = {
    position: 'absolute',
    left: x,
    top: y,
    zIndex: 2,
  };
  
  return (
    <div style={componentStyle}>
      {(showPopUp)? <PopUp id={id} pinUpdate={pinUpdate} supabase={supabase} onClick={() => setShowPopUp(false)}></PopUp>: <></>}
      <img src={pin} alt='pin' className='pinFollow' onClick={() => setShowPopUp(true)}></img>
    </div>
  );
}
