import React from 'react';
import Food from '../Food/Food';
import Snake from '../Snake/Snake';
import SpecialItems from '../SpecialItems/SpecialItems';
import SurvivalMode from '../SurvivalMode/SurvivalMode';

const GameLayout = ({ gameProps, mode }) => {
    const {
        snake,
        food,
        score,
        gameOver,
        shake,
        snakeEffect,
        foodEffect,
        effectType,
        gridSize,
        gameBoardRef,
        resetGame,
        handleSpecialItemEffect
    } = gameProps;

    return (
        <div className={`game-container ${shake ? 'shake' : ''}`}>
            <div className="game-area">
                <h1>Snake Game - {mode}</h1>
                <p className="score">Score: {score}</p>
                <div
                    className="game-board"
                    ref={gameBoardRef}
                    style={{
                        width: '100%',
                        position: 'relative',
                        margin: '0 auto'
                    }}
                >
                    <Snake snake={snake} snakeEffect={snakeEffect} effectType={effectType} />
                    <Food food={food} foodEffect={foodEffect} />
                    <SpecialItems
                        snake={snake}
                        gridSize={gridSize}
                        onCollectItem={handleSpecialItemEffect}
                    />
                </div>
                 {mode === 'survival' && <SurvivalMode gameProps={gameProps}/>}
                {gameOver && (
                    <div className="game-over-overlay">
                        <div className="game-over-content">
                            <h2>Game Over!</h2>
                            <p>Score Final: {score}</p>
                            <button onClick={resetGame} className="restart-button">
                                Jogar Novamente
                            </button>
                            <p className="restart-hint">Pressione ENTER para reiniciar</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GameLayout;