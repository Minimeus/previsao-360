import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar() {

  /* Quando sao écrãs >800 entao mostra o antigo navBar com 4 janelas, quando são écras menores mostra um menu hamburger*/
  const [menu, setMenu] = useState(false);

  const toggleMenu = () => {
    setMenu(!menu);
  }

  return (
    <div>

      {window.innerWidth > 800 ? (
        <nav>
        <ul>
          <li><NavLink to="/" className="button">Página Inicial</NavLink></li>
  
          <li><a href="/dados-meteo#previsao-hoje" className="button"> Meteorologia de Hoje </a></li>
          <li><a href="/dados-meteo#previsao-5dias" className="button"> Previsao de 5 dias </a></li>
  
          <li><a href="/my-alertas" className="button"> Alertas Guardados </a></li>
        </ul>
      </nav>
      ) : (
        <div id="hamburger-menu">
          <button onClick={toggleMenu} className="button">Menu</button>
          {menu && (
            <nav>
              <ul>
                <li><NavLink to="/" className="button">Página Inicial</NavLink></li>
                <li><a href="/dados-meteo#previsao-hoje" className="button">Meteorologia de Hoje</a></li>
                <li><a href="/dados-meteo#previsao-5dias" className="button">Previsao de 5 dias</a></li>
                <li><a href="/my-alertas" className="button">Alertas Guardados</a></li>
              </ul>
            </nav>
          )}
        </div>
      )}
    </div>
  );
}
