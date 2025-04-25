import './App.css'
import TopMenu from './TopMenu'
import Workstation from './Workstation'
import PinMenu from './PinMenu'
import UploadModal from './ModalUpload'

import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from 'react';

const supabase = createClient("https://fjwclenccvpxbzjpynje.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqd2NsZW5jY3ZweGJ6anB5bmplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2ODI1NjcsImV4cCI6MjA1NDI1ODU2N30.5MSa0fE-FLIIiQpfZKzTyZNOfPiXq1lpuspb-vxBl7c")

function App() {
  const [showModal, setShowModal] = useState(false);
  const [mapId, setMapId] = useState();  
  const [pinList, setPinList] = useState([]);
  const [pinCounter, setPinCounter] = useState(0);
  
  const handleUpload = async (file) => {
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage.from('maps').upload(fileName, file);

    if (error) {
      console.error("Upload error:", error);
      return;
    }
  
    const publicUrl = supabase.storage.from('maps').getPublicUrl(fileName).data.publicUrl;
    
    const result = await supabase.from("Maps").insert({
      "name": "default",
      "pins": [],
      "file": publicUrl,
    }).select();

    setMapId(result.data[0].id);
    setPinList([]);
    setShowModal(false)
  }

  useEffect(() => {
    console.log(`MAP ID: ${mapId}`);
  }, [mapId]);

  const handlePinStateChange = (pinData) => {
    setPinList(prev => [...prev, pinData]);
  }

  const handlePinUpdate = () => {
    console.log("UPDATED")
    setPinCounter(prev => prev+1);
  }

  return (
    <div className="flexBox">
      {showModal && (
        <UploadModal
          onClose={() => setShowModal(false)}
          onUpload={handleUpload}
        />
      )}
      <TopMenu onNewClick={() => setShowModal(true)}></TopMenu>
      <PinMenu pinUpdate={pinCounter} pinsIds={pinList} supabase={supabase}></PinMenu>
      <Workstation pinUpdate={handlePinUpdate} supabase={supabase} mapId={mapId} sendPinID={handlePinStateChange}></Workstation>
    </div>
  )
}

export default App
