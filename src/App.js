// Instalar Router Dom no projeto "npm install react-router-dom"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';


//Import os ficheiros do projeto para esta
import Main from './components/Main';
import DadosMeteo from './components/DadosMeteo';
import NavBar from './components/NavBar';
import MapaInfravermelho from './components/MapaInfravermelho';

import './App.scss';

function App() {

  //para o Darkmode
  const [isDarkMode, setIsDarkMode] = useState(false); //false for light mode

  //se isDarkMode muda entao useEffect entra em jogo
  useEffect(() => {
    // Aplicar a classe do modo escuro a todo o body e retirar light mode
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };



  return (
      <div className="App">
      <header className="App-header">
      <h1>Previsão Meteorológica</h1>
        <button onClick={toggleDarkMode} className="dark-mode-button">
          {isDarkMode ? 'Modo Claro' : 'Modo Escuro'}
        </button>
      </header>
      <main>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/dados-meteo" element={<DadosMeteo />} />
          <Route path="/mapa-infravermelho" element={<MapaInfravermelho />} />
        </Routes>
        </BrowserRouter>
        </main>
      </div>
  );
}

export default App;


  /* tentei utilizar SO toggle mas nao estava a impactar o resto (fora do titulo e do botao), acredito que React-router-dom devia estar a impactar a situacao => Por isso encontrei e adicionei classList
  
    const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <header className="App-header">
        <h1>Previsão Meteorológica</h1>
        <button onClick={toggleDarkMode} className="dark-mode-button">
          {isDarkMode ? 'Modo Claro' : 'Modo Escuro'}
        </button>
      </header>

  */
