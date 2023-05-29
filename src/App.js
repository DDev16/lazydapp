import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Web3Provider from './utils/Web3Provider';
import BatchMint from './components/BatchMinting';
import NavBar from './components/NavBar';
import Mint from './components/Mint';
import MyTokens from './components/MyTokens';
import Home from './components/Home';

function App() {
  return (
    <Web3Provider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mint" element={<Mint />} />
          <Route path="/batch-mint" element={<BatchMint />} />
          <Route path="/my-tokens" element={<MyTokens />} />
        </Routes>
      </Router>
    </Web3Provider>
  );
}

export default App;
