import './GameScreen.css'
import { Link } from 'react-router-dom'
import Button from '../Button/Button'

const GameScreen = () => {
    return (
        <main className="gamescreen-content">
            <h1>Bem-vindo ao Jogo Snake</h1>
            <p>Desafie-se em uma versão expandida do jogo Snake!</p>
            <Link to="/snake">
                <Button>Começar jogo</Button>
            </Link>
        </main>
    )
}

export default GameScreen