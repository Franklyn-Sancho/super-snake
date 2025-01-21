import React, { useEffect, useState } from 'react';
import './SurvivalMode.css'

const SurvivalMode = ({ gameProps }) => {
    const [obstacles, setObstacles] = useState([]);
    const { snake, gridSize, gameOver, setGameOver, gameBoardRef } = gameProps;

    const generateObstacle = () => {
        if (!gameBoardRef.current) return null;
        
        const boardRect = gameBoardRef.current.getBoundingClientRect();
        const cellSize = 20;
        const maxRows = Math.floor(boardRect.height / cellSize);
        const maxCols = Math.floor(boardRect.width / cellSize);

        let newObstacle;
        do {
            newObstacle = [
                Math.floor(Math.random() * maxRows),
                Math.floor(Math.random() * maxCols)
            ];
        } while (
            snake.some(segment => 
                segment[0] === newObstacle[0] && 
                segment[1] === newObstacle[1]
            ) ||
            newObstacle[0] >= maxRows || 
            newObstacle[1] >= maxCols
        );
        
        return newObstacle;
    };

    useEffect(() => {
        const obstacleInterval = setInterval(() => {
            if (!gameOver) {
                const newObstacle = generateObstacle();
                if (newObstacle) {
                    setObstacles(prev => [...prev, newObstacle]);
                }
            }
        }, 5000);

        return () => clearInterval(obstacleInterval);
    }, [gameOver, gridSize]);

    return (
        <>
            {obstacles.map((obstacle, index) => (
                <div
                    key={index}
                    className="obstacle"
                    style={{
                        top: `${obstacle[0] * 20}px`,
                        left: `${obstacle[1] * 20}px`,
                        width: '20px',
                        height: '20px'
                    }}
                />
            ))}
        </>
    );
}

export default SurvivalMode