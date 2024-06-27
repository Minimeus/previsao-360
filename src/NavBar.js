import React from 'react';
import './App.scss';

function Navbar() {
  return (
    <nav>
      <button className="button">Página Inicial</button>
      <button className="button">Meteorologia de Hoje</button>
      <button className="button">Meteorologia de 5 dias</button>
      <button className="button">Alertas</button>
      <button className="button">Outro</button>
    </nav>
  );
}

export default Navbar;
