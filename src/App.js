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
  const [isDarkMode, setIsDarkMode] = useState(() => {
    /* Para que dark mode persista entre as diferentes paginas tem que se utilisar local storage */
    const savedMode = localStorage.getItem('isDarkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  }); //false for light mode


  //se isDarkMode muda entao useEffect entra em jogo = useEffect é um componente reativo que necessita certas condicoes. Aqui a sua dependencia é isDarkMode
  useEffect(() => {
    // Aplicar a classe do modo escuro a todo o body e retirar light mode
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));

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
      <aside className="Sidebar">
        <button onClick={toggleDarkMode} className="dark-mode-button">
          {window.innerWidth > 1200 ? (
            isDarkMode ? 'Modo Claro' : 'Modo Escuro'
          ) : (
            isDarkMode ? <i className="qi-150"></i> : <i className="qi-100"></i>
          )}
        </button>
      </aside>      
      <header className="App-header">
      <h1>Previsão Meteorológica   </h1>
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