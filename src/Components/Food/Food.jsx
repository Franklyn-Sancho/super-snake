import React from 'react';
import './Food.css'

const Food = ({ food, foodEffect }) => {
    return (
        <div
            className={`food ${foodEffect ? 'food-effect' : ''}`} // Aplica o efeito
            style={{
                top: `${food[0] * 20}px`,
                left: `${food[1] * 20}px`,
            }}
        />
    );
};

export default Food;




