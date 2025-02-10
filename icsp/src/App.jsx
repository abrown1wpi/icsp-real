import './App.css'
import TopMenu from './TopMenu'
import Workstation from './Workstation'
import PinMenu from './PinMenu'
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://fjwclenccvpxbzjpynje.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqd2NsZW5jY3ZweGJ6anB5bmplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2ODI1NjcsImV4cCI6MjA1NDI1ODU2N30.5MSa0fE-FLIIiQpfZKzTyZNOfPiXq1lpuspb-vxBl7c")

function App() {

  return (
    <div className="flexBox">
      <TopMenu></TopMenu>
      <PinMenu></PinMenu>
      <Workstation supabase={supabase}></Workstation>
    </div>
  )
}

export default App
