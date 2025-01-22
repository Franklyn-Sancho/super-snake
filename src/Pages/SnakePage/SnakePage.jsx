import React from 'react';
import './SnakePage.css';
import Game from '../../Components/Game/Game';

const SnakePage = () => {
    return (
        <div className="snake-page">
            <div className="game-area">
                <Game />
            </div>
        </div>
    );
};

export default SnakePage;


