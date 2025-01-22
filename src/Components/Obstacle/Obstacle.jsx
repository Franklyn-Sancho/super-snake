import React from "react";
import './Obstacle.css'

const Obstacle = React.memo(({ type, positions, size }) => {
    return (
        <>
            {positions.map(([top, left], index) => (
                <div
                    key={`${top}-${left}-${index}`}
                    className={`obstacle ${type}`}
                    style={{
                        top: `${top * size}px`,
                        left: `${left * size}px`,
                        width: `${size}px`,
                        height: `${size}px`
                    }}
                />
            ))}
        </>
    );
});

export default Obstacle;


