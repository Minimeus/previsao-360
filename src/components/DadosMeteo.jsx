//Amelhorar : criar uma verificacao de quanto tempo esta no localstorage a informacao, se menos de 3 horas refazer (Utilizar stringy para a data do localstorage, com a criacao de varios const (getItem e setItem de localstorage) no use effect) => Mas depois deu problema, devido a tempo de delivery tive que pausar a questao do numero de chamadas APIs. Como no projeto "forms".

import React, { useState, useEffect } from 'react';

//const storageTime = 3 * 60 * 60 * 1000;

export default function DadosMeteo() {
  const [dados, setDados] = useState([]);
  const [previsao5Dias, setPrevisao5Dias] = useState([]);
  //dar display default
  const [displaySection, setDisplaySection] = useState("hoje");

  const [locations, setLocations] = useState([]);//array para meter todas as localizacoes

  const [selectedLocation, setSelectedLocation] = useState('');//empty by default



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
          // para poder selecionar na dropdown
          setLocations(localData); 

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


  const handleHashChange = () => {
    const hash = window.location.hash;
    console.log("helo");
    if (hash === '#previsao-5dias') {
      setDisplaySection('cincodias');
    } else {
      setDisplaySection('hoje');
    }
  };
  
  useEffect(() => {
      // este useeffect fica attento ao # utilisado en NavBar.jsx (= window.location ) e procura o id do # para ir para o sitio desse id
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      //removeeventlistener para evitar leaks e duplicos
      window.removeEventListener('hashchange', handleHashChange);
    };     
  }, []);


  //Para poder chamar estas consts diretamente

  const Hoje = (
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
            
            {/* Nao tem dados quase nunca <th>Classe da Intensidade da Precipitação</th> */}
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
              {/* <td>{dado.classPrecInt}</td> */}
              <td>{dado.descWeatherTypePT}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

)


//se na dropdown a localidade mudar
const handleLocationChange = (event) => { 
    setSelectedLocation(event.target.value);
  };

const Local5Dias = previsao5Dias.filter(previsao => {
  if (previsao.lengh === 0) return false;
  return previsao[0].local === selectedLocation ;
});


const cincoDias = (
  <div>
      <h2 id="previsao-5dias">Previsão do Tempo Nacional - 5 Dias</h2>
      <select onChange={handleLocationChange} value={selectedLocation}>
        <option value="">Localidade</option>
        {locations.map((location, index) => (
          <option key={index} value={location.local}>{location.local}</option>
        ))}
      </select>

      {Local5Dias.length > 0 ?
      // se uma localidade tiver sido selecionada e o array local5Dias tiver algo, entao...
      (
        //iterar por cime do array com o map e gerar a tabela
        Local5Dias.map((previsaoPorLocal, index) => (
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
        ))

        //Senao houver uma localidade selecionada, entao selecione uma 
      ) : (
        <p>Por favor selecione a sua localidade.</p>
      )}
    </div>
  );


  return (
    <div>
      {displaySection === 'hoje' && Hoje}
      {displaySection === 'cincodias' && cincoDias}
  </div>
  );
}
