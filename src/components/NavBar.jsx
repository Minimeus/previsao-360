import React from 'react';

export default function NavBar() {
  return (
    <nav>
      <button className="button">Página Inicial</button>
      <a href="#previsao-hoje" className="button">Meteorologia de Hoje</a>
      <a href="#previsao-5dias" className="button">Meteorologia de 5 dias</a>
      <button className="button">Alertas</button>
      <button className="button">Outro</button>
    </nav>
  );
}
