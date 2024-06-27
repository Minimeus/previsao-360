import React from 'react';
import './App.scss';

function MapaInfravermelho({}) {
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

  return (
    <div className="map-container">
      <h2>Mapa Infravermelho</h2>
    </div>
  );
}

export default MapaInfravermelho;
