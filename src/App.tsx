import { useState } from 'react';
import logo from '@/assets/images/quantilope-logo.svg';
import '@/App.scss';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>Full-stack Coding Challenge</p>
            </header>
        </div>
    );
}

export default App;
