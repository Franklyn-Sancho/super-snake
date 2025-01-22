import React from 'react';
import './SurvivalMode.css'
import Obstacle from '../Obstacle/Obstacle';

const SurvivalMode = React.memo(({ gameProps }) => {
    const { obstacles, gridSize } = gameProps; // Remove setObstacles

    return (
        <>
            {obstacles.map(obstacle => (
                <Obstacle
                    key={obstacle.id}
                    type={obstacle.type}
                    positions={obstacle.positions}
                    size={gridSize.cellSize}
                />
            ))}
        </>
    );
});

export default SurvivalMode;
