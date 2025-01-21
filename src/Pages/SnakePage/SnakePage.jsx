import React, { useState } from 'react';
import GameBoard from '../../Components/GameBoard/GameBoard';
import Button from '../../Components/Button/Button';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import './SnakePage.css';
import Game from '../../Components/Game/Game';

const SnakePage = () => {
    const navigate = useNavigate(); // Inicializar useNavigate

    const goBack = () => {
        navigate('/'); // Voltar para a página inicial ou qualquer outra página
    };

    return (
        <div className="snake-page">
            <div className="game-area">
                <Game/>
            </div>
        </div>
    );
};

export default SnakePage;


