import React, { useState, useEffect } from 'react';
import DadosMeteo from './DadosMeteo';

//import App from './src/App.scss';

/* const corPorTemperatura = (temperatura) => {
  // Azul quando as temperaturas são abaixo de >10 
  if (temperatura <= 10) return '#0000ff';
  // Amarelo para <= 20
  else if (temperatura <= 20) return '#ffff00'; 
  // Laranja para <= 30
  else if (temperatura <= 30) return '#ffa500'; 
  // Vermelho para > 30°C
  else return '#ff0000';
}; */

const MapaInfravermelho = () => {
  const [showMapa, setShowMapa] = useState(true);
/*   const [temperaturasMedias, setTemperaturasMedias] = useState([]);

  useEffect(() => {

    //o erro temperaturasMedias is undefined aparece se DadosMeteo.temperaturasMedias nao for definido antes
    if (DadosMeteo && DadosMeteo.temperaturasMedias) {
      setTemperaturasMedias(DadosMeteo.temperaturasMedias);
    }
  }, [DadosMeteo]); */


  const toggleShow = () => {
    setShowMapa(prevShow => !prevShow);
  };

/*   useEffect(() => {
    if (temperaturasMedias && temperaturasMedias.length > 0) {
      temperaturasMedias.forEach(localTemperatura => {
        const path = document.getElementById(localTemperatura.local);
        if (path) {
          path.setAttribute('fill', corPorTemperatura(localTemperatura.temperaturasMedia));
        }
      });
    }
  }, [temperaturasMedias]); */
  

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
