import React from 'react';
import { Link } from 'react-router-dom';
import './CSScomponents/LandingPage.css';

const LandingPage = () => {
    return (
        <div className="landing-page">
                <Link to="/home">
                    <button className="button-container">ENTRAR</button>
                </Link>
        </div>
    );
}

export default LandingPage;

