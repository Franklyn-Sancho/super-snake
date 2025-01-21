import React, { useState } from 'react';
import GameBoard from '../../Components/GameBoard/GameBoard';
import Button from '../../Components/Button/Button';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import './SnakePage.css';

const SnakePage = () => {
    const navigate = useNavigate(); // Inicializar useNavigate

    const goBack = () => {
        navigate('/'); // Voltar para a página inicial ou qualquer outra página
    };

    return (
        <div className="snake-page">
            <div className="game-area">
                <GameBoard />
                <div className="game-controls">
                    <Button onClick={goBack}>Voltar para Início</Button>
                </div>
            </div>
        </div>
    );
};

export default SnakePage;


