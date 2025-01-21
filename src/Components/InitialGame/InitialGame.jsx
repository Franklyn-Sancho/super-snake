import React from 'react';
import GameEngine from '../GameEngine/GameEngine';
import GameLayout from '../GameLayout/GameLayout';

const InitialGame = () => {
    return (
        <GameEngine>
            <GameLayout />
        </GameEngine>
    );
};

export default InitialGame;