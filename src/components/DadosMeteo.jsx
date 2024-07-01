import React, { useState, useEffect } from 'react';

export default function DadosMeteo() {
  const [dados, setDados] = useState([]);
  const [previsao5Dias, setPrevisao5Dias] = useState([]);

  useEffect(() => {
    let weatherTypeMap = {};
    //console.log(weatherTypeMap);

    
    fetch('https://api.ipma.pt/open-data/weather-type-classe.json')
      .then(res => res.json())
      .then(dataWeatherTypes => {
        // reduce para ter um so resultado final
        //criacao de um novo objeto que recupera os dois dados (traducao PT et id) unicamente
        weatherTypeMap = dataWeatherTypes.data.reduce((newObj, weatherType) => {
          newObj[weatherType.idWeatherType] = weatherType.descWeatherTypePT;

          //console.log(newObj);
          return newObj ;
        }, {});
        

        fetch('https://api.ipma.pt/open-data/distrits-islands.json')
        .then(res => res.json())
        .then(dadosLocais => {
          //propriedade data do API 
          //nomeadamente : globalIdLocal (identificador do local) e local (nome PT do local)
          const localData = dadosLocais.data;

          const globalIdLocais = localData.map(local => local.globalIdLocal);
          console.log(globalIdLocais);

            //reunir por local as infos pertinentes
            localData.forEach(local => {
              fetch(`https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/${local.globalIdLocal}.json`)
                .then(res => res.json())
                .then(dataMeteo => {
                  //reunir por dia
                  const firstDayData = dataMeteo.data[0];
                  const newData = {
                    local: local.local,
                    tMin: firstDayData.tMin,
                    tMax: firstDayData.tMax,
                    classWindSpeed: firstDayData.classWindSpeed,
                    probPrecipita: firstDayData.precipitaProb,
                    classPrecInt: firstDayData.classPrecInt,
                    descWeatherTypePT: weatherTypeMap[firstDayData.idWeatherType]
                  };

                  //array com os novos dados
                  setDados(prevDados => [...prevDados, newData]);


                  // Aqui vamos criar um array de previsões para 5 dias
                  const previsao5Dias = dataMeteo.data.map(dia => ({
                    local: local.local,
                    tMin: dia.tMin,
                    tMax: dia.tMax,
                    descWeatherTypePT: weatherTypeMap[dia.idWeatherType]
                  }));
                  setPrevisao5Dias(prevPrevisao5Dias => [...prevPrevisao5Dias, previsao5Dias]);
                });
            });
          });
      });
  }, []);

  return (
    <div>
      <h2 id="previsao-hoje">Previsão do Tempo Nacional</h2>
      <table>
        <thead>
          <tr>
            <th>Local</th>
            <th>Temperatura Mínima (°C)</th>
            <th>Temperatura Máxima (°C)</th>
            <th>Classe da Intensidade do Vento</th>
            <th>Probabilidade de Precipitação (%)</th>
            <th>Classe da Intensidade da Precipitação</th>
            <th>Condições Meteorológicas</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((dado, index) => (
            <tr key={index}>
              <td>{dado.local}</td>
              <td>{dado.tMin}</td>
              <td>{dado.tMax}</td>
              <td>{dado.classWindSpeed}</td>
              <td>{dado.probPrecipita}</td>
              <td>{dado.classPrecInt}</td>
              <td>{dado.descWeatherTypePT}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 id="previsao-5dias">Previsão do Tempo Nacional - 5 Dias</h2>
      {previsao5Dias.map((previsaoPorLocal, index) => (
        <div key={index}>
          <h3>{previsaoPorLocal[0].local}</h3>
          <table>
            <thead>
              <tr>
                <th>Dia</th>
                <th>Temperatura Mínima (°C)</th>
                <th>Temperatura Máxima (°C)</th>
                <th>Condições Meteorológicas</th>
              </tr>
            </thead>
            <tbody>
              {previsaoPorLocal.map((dado, index) => (
                <tr key={index}>
                  <td>Dia {index + 1}</td>
                  <td>{dado.tMin}</td>
                  <td>{dado.tMax}</td>
                  <td>{dado.descWeatherTypePT}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
