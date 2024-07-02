import React from 'react';
//import App from './src/App.scss';

const calcularTemperaturaMedia = (tMin, tMax) => (tMin + tMax) / 2;

const determinarCorPorTemperatura = (temperatura) => {
  // Azul quando >10 
  if (temperatura <= 10) return '#0000ff'; 
  //Amarelo quando >20 
  if (temperatura <= 20) return '#ffff00'; 
  //Laranja para >30
  if (temperatura <= 30) return '#ffff00'; 
  //Vermelho para <30
  return '#ff0000'; 
};

const MapaInfravermelho = () => {
  return (
      <div>
          <h2>Mapa Infravermelho de Portugal</h2>
          <div className="map-svg-container">
              <img src="/portugal.svg" alt="Temperaturas das Localidades portuguesas" />
          </div>
      </div>
  );
};


export default MapaInfravermelho;