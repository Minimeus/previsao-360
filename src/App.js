import './App.scss';
import Main from './components/Main';
import DadosMeteo from './components/DadosMeteo';
import NavBar from './components/NavBar';
import MapaInfravermelho from './components/MapaInfravermelho';

function App() {
  return (
    <div className="container">
      <h1>Previsão 360</h1>
      <NavBar />
      <Main />
      <DadosMeteo />
      <MapaInfravermelho />
    </div>
  );
}

export default App;
