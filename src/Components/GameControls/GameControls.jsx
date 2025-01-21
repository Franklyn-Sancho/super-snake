import React from 'react';
import './GameControls.css'

const GameControls = ({ setSnakeSpeed }) => {
    const handleSpeedChange = (event) => {
        setSnakeSpeed(Number(event.target.value));
    };

    return (
        <div>
            <label>Velocidade:</label>
            <input
                type="range"
                min="50"
                max="500"
                defaultValue="200"
                onChange={handleSpeedChange}
            />
        </div>
    );
};

export default GameControls;
