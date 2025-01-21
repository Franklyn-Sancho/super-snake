import React from 'react';
import './Footer.css'; // Garantir que o CSS do Footer seja importado
import Button from '../Button/Button';

const Footer = () => {
    return (
        <footer className="footer">
            <nav className="footer-nav">
                <Button>Sobre</Button>
                <Button>Contato</Button>
            </nav>
            <div className="footer-text">
                <p>Desenvolvido por Franklyn Sancho</p>
            </div>
        </footer>
    );
};

export default Footer;
