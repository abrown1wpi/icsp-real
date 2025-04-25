import './App.css';

export const menuBar = ({ onExportClick, onMenuClick, onNewClick }) => {
    return(
        <>
            <ul className='topMenu'>
                <li className='topMenu' onClick={onNewClick}>New Map</li>
                <li className='topMenu'>Save</li>
                <li className='topMenu' onClick={onMenuClick}>Menu</li>
                <li className='topMenu'>Markers</li>
                <li className='topMenu' onClick={onExportClick}>Export</li>
            </ul>
        </>
    )
}

export default menuBar;
