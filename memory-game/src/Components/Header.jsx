import { useState, useEffect } from "react";

export default function Header({ bestScore, currentScore }) {

    return(
        <header>
            <div className="header-container">
                <h1>Memory Challenge</h1>
                <div className="counter-container">
                    <div className="best-score">
                        <p>Best Score: {bestScore}</p>
                    </div>
                    <div className="current-score">
                        <p>Current Score: {currentScore}</p>
                    </div>
                </div>
            </div>
        </header>
    );
}
