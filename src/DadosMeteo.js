import React from 'react';

function DadosMeteo() {

// Dados simulados de previsão do tempo para diferentes regiões de Portugal
  const dados = [
    { regiao: 'Norte', temperatura: '10°C', meteo: 'Ensolarado', humidade: '65%' },
    { regiao: 'Centro', temperatura: '16°C', meteo: 'Parcialmente Nublado', humidade: '70%' },
    { regiao: 'Sul', temperatura: '18°C', meteo: 'Chuva Leve', humidade: '60%' },
    { regiao: 'Ilhas', temperatura: '21°C', meteo: 'Nublado', humidade: '75%' }
  ];


  return (
    <div>
      <h2>Previsão do Tempo Nacional</h2>
      <table>
        <thead>
          <tr>
            <th>Região</th>
            <th>Temperatura</th>
            <th>Condições Meteorológicas</th>
            <th>Umidade</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapeamento dos dados de previsão do tempo para cada região */}
          {dados.map(dado => (
            <tr key={dado.regiao}>
              <td>{dado.regiao}</td>
              <td>{dado.temperatura}</td>
              <td>{dado.meteo}</td>
              <td>{dado.humidade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DadosMeteo;
