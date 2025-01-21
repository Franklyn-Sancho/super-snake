import React from 'react';
import './Button.css'; // Importando o CSS do botão

const Button = ({ onClick, children, type = 'button' }) => {
    return (
        <button className="custom-button" onClick={onClick} type={type}>
            {children}
        </button>
    );
};

export default Button;
