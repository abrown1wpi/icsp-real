import './App.css';

export const menuBar = ({ onExportClick, onMenuClick }) => {
    return(
        <>
            <ul className='topMenu'>
                <li className='topMenu'>Home</li>
                <li className='topMenu'>Save</li>
                <li className='topMenu' onClick={()=>onMenuClick(true)}>Menu</li>
                <li className='topMenu'>Markers</li>
                <li className='topMenu' onClick={()=>onExportClick(true)}>Export</li>
            </ul>
        </>
    )
}

export default menuBar;