import React from 'react';
import Snake from '../Snake/Snake';
import Food from '../Food/Food';
import SpecialItems from '../SpecialItems/SpecialItems';
import SurvivalMode from '../SurvivalMode/SurvivalMode';
import TouchControls from '../TouchControl/TouchControl';

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
        handleSpecialItemEffect,
        obstacles,
        handleDirectionChange: changeDirection,
    } = gameProps;

    const handleMove = (direction) => {
        switch (direction) {
            case 'up':
                changeDirection('ArrowUp');
                break;
            case 'down':
                changeDirection('ArrowDown');
                break;
            case 'left':
                changeDirection('ArrowLeft');
                break;
            case 'right':
                changeDirection('ArrowRight');
                break;
            case 'pause':
                // Add pause logic here
                break;
            default:
                break;
        }
    };

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
                    {mode === 'survival' && obstacles && obstacles.length > 0 && (
                        <SurvivalMode
                            gameProps={{
                                ...gameProps,
                                gridSize: {
                                    ...gridSize,
                                    cellSize: 20
                                }
                            }}
                        />
                    )}
                </div>
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
                <TouchControls onMove={handleMove} />
            </div>
        </div>
    );
};

export default GameLayout;