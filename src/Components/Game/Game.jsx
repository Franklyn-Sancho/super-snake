import React, { useState } from 'react';
import GameBoard from '../GameBoard/GameBoard';
import MenuScreen from '../MenuScreen/MenuScreen';

const Game = () => {
    const [currentScreen, setCurrentScreen] = useState('menu'); // 'menu' ou 'game'
    const [gameMode, setGameMode] = useState('classic'); // Modo padrão

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
                <GameBoard gameMode={gameMode} onBackToMenu={backToMenu} />
            )}
        </div>
    );
};

export default Game;