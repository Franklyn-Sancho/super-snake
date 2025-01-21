
import './Header.css'
import Button from '../Button/Button';

const Header = () => {
    return (
        <header className="header">
            <h1 className="app-name">Super Snake</h1>
            <nav className="nav-buttons">
                <Button>Inicio</Button>
                <Button>Configurações</Button>
            </nav>
        </header>
    );
};

export default Header;