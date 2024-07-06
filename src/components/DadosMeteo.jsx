//Amelhorar : criar uma verificacao de quanto tempo esta no localstorage a informacao, se menos de 3 horas refazer (Utilizar stringy para a data do localstorage, com a criacao de varios const (getItem e setItem de localstorage) no use effect) => Mas depois deu problema, devido a tempo de delivery tive que pausar a questao do numero de chamadas APIs. Como no projeto "forms".

import React, { useState, useEffect } from 'react';

//const storageTime = 3 * 60 * 60 * 1000;

export default function DadosMeteo() {
  const [dados, setDados] = useState([]);
  const [previsao5Dias, setPrevisao5Dias] = useState([]);
  //dar display default
  const [displaySection, setDisplaySection] = useState(window.location.hash === '#previsao-5dias'? "cincodias": "hoje");

  const [locations, setLocations] = useState([]);//array para meter todas as localizacoes

  const [selectedLocation, setSelectedLocation] = useState('');//empty by default

/*   const calcularTemperaturaMedia = (tMin, tMax) => (tMin + tMax) / 2;

  const [temperaturasMedias, setTemperaturasMedias] = useState([]); */



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


                   /* const temperaturasMedia = calcularTemperaturaMedia(firstDayData.tMin, firstDayData.tMax); 
                  setTemperaturasMedias(prevState => [
                    ...prevState,
                    { local: local.local, temperaturaMedia: temperaturasMedia }
                  ]); 

                  console.log(setTemperaturasMedias); */


                  const newData = {
                    local: local.local,
                    tMin: firstDayData.tMin,
                    tMax: firstDayData.tMax,
                    classWindSpeed: firstDayData.classWindSpeed,
                    probPrecipita: firstDayData.precipitaProb,
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

  /* Para responsive : quando o écra é menos de 600 width, entao os titulos da tabela ajustam-se */

  const tamanhoTitulos = () => {
    if (window.innerWidth > 600) {
      return (
        <>
          <th>Dia</th>
          <th>Temperatura Mínima (°C)</th>
          <th>Temperatura Máxima (°C)</th>
          <th>Condições Meteorológicas</th>
        </>
      );
    } else {
      return (
        <>
          <th>Dia</th>
          <th>Mínimas</th>
          <th>Máximas</th>
          <th>Condições</th>
        </>
      );
    }
  };

  //sendo uma tabela maior, aumentei o width para os titulos
  const tamanhoTitulosHoje = () => {
    if (window.innerWidth > 900) {
      return (
        <>
            <th>Local</th>
            <th>Temperatura Mínima (°C)</th>
            <th>Temperatura Máxima (°C)</th>
            <th>Classe da Intensidade do Vento</th>
            <th>Probabilidade de Precipitação (%)</th>
            <th>Condições Meteorológicas</th>
        </>
      );
    } else {
      return (
        <>
          <th>Local</th>
          <th>Mínimas</th>
          <th>Máximas</th>
          <th>Tempo</th>
        </>
      );
    }
  };

  /* https://javascript.info/switch */
  const iconesMeteo = (condicao) => {
    switch (condicao) {
      case 'Céu limpo':
        return <i className="qi-100-fill"></i>;
      case 'Chuvisco':
      case 'Aguaceiros/chuva fracos':
      case 'chuva fraca':
      case 'chuvisco':
        return <i className="qi-309-fill"></i>;
      case 'Aguaceiros/chuva':
      case 'Aguaceiros/chuva fortes':
      case 'Chuva/aguaceiros':
      case 'Chuva/aguaceiros forte':
      case 'Períodos de chuva':
      case 'Períodos de chuva forte':
      case 'Períodos de chuva fraca':
        return <i className="qi-300-fill"></i>;
      case 'Aguaceiros e possibilidade de trovoada':
      case 'Chuva e possibilidade de trovoada':
      case 'Aguaceiros e possibilidade de trovoada':
      case 'Trovoada':
        return <i className="qi-303-fill"></i>;
      case 'Granizo':
      case 'Geada':
        return <i className="qi-304-fill"></i>;
      case 'Céu com períodos de muito nublado':
      case 'Céu nublado':
      case 'Nebulosidade convectiva':
      case 'Céu muito nublado ou encoberto':
      case 'Céu parcialmente nublado':
      case 'Céu pouco nublado':
      case 'Nevoeiro ou nuvens baixas':
      case 'Neblina':
      case 'Nevoeiro':
      case 'Céu nublado por nuvens altas':
        return <i className="qi-101-fill"></i>;
      case 'Aguaceiros de neve':
      case 'Chuva e Neve':
      case 'Neve':
        return <i className="qi-2215"></i>;
      default:
        return condicao;
    }
  };


  //Para poder chamar estas consts diretamente

  const Hoje = (
    <div>
      <h2 id="previsao-hoje">Previsão do Tempo Nacional</h2>
      <table>
        <thead>
          <tr>
          {tamanhoTitulosHoje()}
          </tr>
        </thead>
        <tbody>
          {dados.map((dado, index) => (
            <tr key={index}>
              <td>{dado.local}</td>
              <td>{dado.tMin}</td>
              <td>{dado.tMax}</td>
              {window.innerWidth > 600 && (
                <>
                  <td>{dado.classWindSpeed}</td>
                  <td>{dado.probPrecipita}</td>
                  {/* <td>{dado.classPrecInt}</td> */}
                </>
              )}
              <td>{iconesMeteo(dado.descWeatherTypePT)}</td>
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

      {/* selecionar a localidade */}
      <select id="select-local" onChange={handleLocationChange} value={selectedLocation}>
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
                {tamanhoTitulos()}
                </tr>
              </thead>
              <tbody>
                {previsaoPorLocal.map((dado, index) => (
                  <tr key={index}>
                    <td>Dia {index + 1}</td>
                    <td>{dado.tMin}</td>
                    <td>{dado.tMax}</td>
                    <td>{iconesMeteo(dado.descWeatherTypePT)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))

        //Senao houver uma localidade selecionada, entao selecione uma 
      ) : (
        <p>Por favor, selecione a sua localidade.</p>
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
