import React from "react";
import { useNavigate } from "react-router-dom";
import "./MenuScreen.css"

const MenuScreen = ({ onStartGame }) => {
    const navigate = useNavigate(); // Inicializar useNavigate

    const goBack = () => {
        navigate('/'); // Voltar para a página inicial ou qualquer outra página
    };

    return (
        <div className="menu-screen">
            <h1>Snake Game</h1>
            <p>Escolha seu modo de jogo:</p>
            <div className="menu-options">
                <button onClick={() => onStartGame('classic')}>Modo Clássico</button>
                <button onClick={() => onStartGame('survival')}>Modo Sobrevivência</button>
                <button onClick={() => onStartGame('time-attack')}>Contra o Tempo</button>
                <button onClick={goBack}>Voltar a tela Inicial</button>
            </div>
        </div>
    );
};

export default MenuScreen;