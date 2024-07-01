// Instalar Router Dom no projeto "npm install react-router-dom"
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Import os ficheiros do projeto para esta
import Main from './components/Main';
import DadosMeteo from './components/DadosMeteo';
import NavBar from './components/NavBar';
import MapaInfravermelho from './components/MapaInfravermelho';

import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>Previsão 360</h1>
        <NavBar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/dados-meteo" element={<DadosMeteo />} />
          <Route path="/mapa-infravermelho" element={<MapaInfravermelho />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
