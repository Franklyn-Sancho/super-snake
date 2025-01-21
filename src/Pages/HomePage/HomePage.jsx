import React from 'react';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

import './HomePage.css'
import GameScreen from '../../Components/GameScreen/GameScreen';


const HomePage = () => {
    return (
        <div className="home-page">
            <Header />
            <GameScreen />
            <Footer />
        </div>
    );
};

export default HomePage;
