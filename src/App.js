import './App.scss';
import DadosMeteo from './DadosMeteo.js';
import NavBar from './NavBar.js';
import MapaInfravermelho from './MapaInfravermelho';

function App() {
  return (
    <div className="container">
      <h1>Previsão 360</h1>
      <NavBar />
      <p>Meteorologia intuitiva para todos</p>
      <div className="map-container">
        <MapaInfravermelho/>
      </div>
              <DadosMeteo />
      {/* i class vem de qweather.com  */}
      <i className="qi-300-fill"></i> 

    </div>
  );
}

export default App;
