import React from 'react';
import './Snake.css';

const Snake = ({ snake, snakeEffect, effectType }) => {
    // Gera o caminho SVG para a cobra
    const generatePath = (snake) => {
        return snake
            .map((segment, index) => {
                const [x, y] = [segment[1] * 20 + 10, segment[0] * 20 + 10];
                return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
            })
            .join(' ');
    };

    return (
        <svg width="400" height="400" className="snake-container">
            <path
                d={generatePath(snake)}
                className={`snake-body ${snakeEffect ? `snake-effect ${effectType}` : ''}`} // Adiciona efeito e tipo dinamicamente
            />

        </svg>
    );
};

export default Snake;


