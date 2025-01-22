import React from 'react';
import './TouchControl.css'

const TouchControls = ({ onMove }) => (
    <div className="touch-controls">
        <button onClick={() => onMove('up')}>&uarr;</button>
        <div>
            <button onClick={() => onMove('left')}>&larr;</button>
            <button onClick={() => onMove('pause')}>⏸</button>
            <button onClick={() => onMove('right')}>&rarr;</button>
        </div>
        <button onClick={() => onMove('down')}>&darr;</button>
    </div>
);

export default TouchControls;
