import React, { useState } from 'react';
import MenuScreen from '../MenuScreen/MenuScreen';

import './Game.css';
import GameEngine from '../GameEngine/GameEngine';
import GameLayout from '../GameLayout/GameLayout';

const Game = () => {
    const [currentScreen, setCurrentScreen] = useState('menu');
    const [gameMode, setGameMode] = useState('classic');

    const startGame = (mode) => {
        setGameMode(mode);
        setCurrentScreen('game');
    };

    const backToMenu = () => {
        setCurrentScreen('menu');
    };

    return (
        <div className="game-container">
            {currentScreen === 'menu' && (
                <MenuScreen onStartGame={startGame} />
            )}
            {currentScreen === 'game' && (
                <GameEngine mode={gameMode}>
                    <GameLayout onBackToMenu={backToMenu} />
                </GameEngine>
            )}
        </div>
    );
};

export default Game;