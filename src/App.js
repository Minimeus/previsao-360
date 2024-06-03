import './App.scss';
import DadosMeteo from './DadosMeteo.js';

function App() {
  return (
    <div className="container">
      <h1>Previsão 360</h1>
      <p>Meteorologia intuitiva para todos</p>
      <DadosMeteo />
      {/* i class vem qweather.com */}
      <i class="qi-300-fill"></i>
    </div>
  );
}

export default App;
