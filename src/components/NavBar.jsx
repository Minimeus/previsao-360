import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav>
      <ul>
        <li><NavLink to="/" className="button">Página Inicial</NavLink></li>

        <li><NavLink to="/dados-meteo#previsao-hoje"className="button">Meteorologia de Hoje</NavLink></li>

{/* como redirecionar so para uma parte do return ? Perguntar Ivo => Switch de react router dom ? */}
        <li><NavLink className="button" to="/dados-meteo#previsao-5dias">Previsao de 5 dias</NavLink></li>

        <li><NavLink to="/mapa-infravermelho"className="button">Mapa Infravermelho</NavLink></li>

        <li><NavLink to="/alertas"className="button">Alertas</NavLink></li>

      </ul>
    </nav>

    
  );
}
