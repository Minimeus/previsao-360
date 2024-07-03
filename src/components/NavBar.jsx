import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  return (

    //criar um botao
    <nav>
      <ul>
        <li><NavLink to="/" className="button">Página Inicial</NavLink></li>

        <li><a href="/dados-meteo#previsao-hoje" className="button"> Meteorologia de Hoje </a></li>
        <li><a href="/dados-meteo#previsao-5dias" className="button"> Previsao de 5 dias </a></li>

      </ul>
    </nav>

    
  );
}
