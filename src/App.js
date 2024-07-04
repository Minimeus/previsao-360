// Instalar Router Dom no projeto "npm install react-router-dom"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';


//Import os ficheiros do projeto para esta
import DadosMeteo from './components/DadosMeteo';
import NavBar from './components/NavBar';
import MapaInfravermelho from './components/MapaInfravermelho';
import Alertas from './components/Alertas';
import MinhasAlertas from './components/MinhasAlertas';

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
      <h1>Previsão Meteorológica   <i className="qi-300-fill"></i></h1>
      <button onClick={toggleDarkMode} className="dark-mode-button">
          {window.innerWidth > 1200 ? (
            isDarkMode ? 'Modo Claro' : 'Modo Escuro'
          ) : (
            isDarkMode ?  <i className="qi-150"></i> :  <i className="qi-100"></i>
          )
            }
        </button>
      </header>
      <main>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<MapaInfravermelho />} />
          <Route path="/dados-meteo" element={<DadosMeteo />} />
          <Route path="//my-alertas" element={<MinhasAlertas />} />
        </Routes>
        </BrowserRouter>
        </main>
        <footer>
          <Alertas />
        </footer>
      </div>
  );
}

export default App;