import React, { useState, useEffect } from 'react';
import DadosMeteo from './DadosMeteo';

//import App from './src/App.scss';

const calcularTemperaturaMedia = (tMin, tMax) => (tMin + tMax) / 2;

const determinarCorPorTemperatura = (temperatura) => {
  // Azul quando >10 
  if (temperatura <= 10) return '#0000ff'; 
  //Amarelo quando >20 
  if (temperatura <= 20) return '#ffff00'; 
  //Laranja para >30
  if (temperatura <= 30) return '#ffa500'; 
  //Vermelho para <30
  return '#ff0000'; 
};
const MapaInfravermelho = () => {
  const [showMapa, setShowMapa] = useState(true);

  const toggleShow = () => {
    setShowMapa(prevShow => !prevShow);
  };

  return (
    <div>
      {window.innerWidth > 1200 ? (
        <div className="map-svg-container">
          <img src="/portugal.svg" alt="Temperaturas das Localidades portuguesas" />
        </div>
      ) : (
        <div>
          <button onClick={toggleShow} className="button" id="mapa">
            {showMapa ? 'Esconder Mapa Infravermelho' : 'Mostrar Mapa Infravermelho'}
          </button>
          {showMapa && (
            <div className="map-svg-container">
              <img src="/portugal.svg" alt="Temperaturas das Localidades portuguesas" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MapaInfravermelho;