let casesData, deathsData;
var NUMBER_OF_COUNTRIES_IN_GRAPH = 10;

async function initPage() {
  renderTopChart();
  renderPerMillionChart();
  renderTotalDeathChart();
  renderTotalDeaths();
}

async function getTranslatedCountries(countriesNames) { // n ta funcionando (ainda)
  // let body = countriesNames.map(c => {return {Text:c}})

  console.log("body: ", JSON.stringify([{ Text: "I'm testing" }, { Text: "I'm testing" }, { Text: "I'm testing" }]));

  let headers = new Headers();

  headers.append("x-rapidapi-key", "f56f7bd46fmsh9defc43b365ae9ap1c0889jsn66fd72bca751");
  headers.append("Content-Type", "application/json");

  fetch('https://microsoft-translator-text.p.rapidapi.com/translate?to=pt&api-version=3.0', {
    headers,
    method: 'POST',
    body: JSON.stringify([{ Text: "I'm testing" }, { Text: "I'm testing" }, { Text: "I'm testing" }]),
  })
    .then(data => data.json())
    .then(data => {
      console.log("Data: ", data);
      return data;
    })

  // return data;
}

async function getTopTenCountriesPerMillion() {
  if (!casesData) {
    casesData = await fetch("https://covid-api.mmediagroup.fr/v1/cases")
      .then(res => res.json());
  }

  const parsedData = Object.entries(casesData);

  setUpdatedAt(parsedData);

  const parsedPerMillion = parsedData.map(country => {
    const {confirmed, population} = country[1].All;
    if(!confirmed || !population){
      return [
        ...country,
        0
      ]
    }

    return [
      ...country,
      confirmed * 1000000 / population
    ];
  });

  parsedPerMillion.sort(([_a, __a, a], [_b, __b, b]) => {
    if (a >= b) {
      return 1;
    } else if (a < b) {
      return -1;
    } else {
      return 0;
    }
  });

  parsedPerMillion.reverse();
  parsedPerMillion.splice(0, 1); // Tirar os dados "Global"
  parsedPerMillion.splice(NUMBER_OF_COUNTRIES_IN_GRAPH, parsedPerMillion.length - NUMBER_OF_COUNTRIES_IN_GRAPH);

  return parsedPerMillion;
}

async function getTopTenCountries() {
  if (!casesData) {
    casesData = await fetch("https://covid-api.mmediagroup.fr/v1/cases")
      .then(res => res.json());
  }

  const parsedData = Object.entries(casesData);

  setUpdatedAt(parsedData);
  
  parsedData.sort(([_a, a], [_b, b]) => {
    if (a.All.confirmed >= b.All.confirmed) {
      return 1;
    } else if (a.All.confirmed < b.All.confirmed) {
      return -1;
    } else {
      return 0;
    }
  })

  parsedData.reverse();

  setTotalGlobalCases(parsedData[0][1].All.confirmed);

  parsedData.splice(0, 1); // Tirar os dados "Global"
  parsedData.splice(NUMBER_OF_COUNTRIES_IN_GRAPH, parsedData.length - NUMBER_OF_COUNTRIES_IN_GRAPH);

  return parsedData;
}

async function renderTopChart() {
  const topData = await getTopTenCountries();

  const options = {
    series: [{
      data: topData.map(country => country[1].All.confirmed),
    }],
    chart: {
      type: 'bar',
      height: 380,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        barHeight: '90%',
        horizontal: true,
        dataLabels: {
          position: 'bottom',
        },
      }
    },
    colors: ['#a10f19'],
    dataLabels: {
      enabled: true,
      textAnchor: 'start',
      style: {
        colors: ['#fff']
      },
      style: {
        fontSize: '12px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 600,
        colors: ['#f5f5f5']
      },
      formatter: function (val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val.toLocaleString('pt-BR')
      },
      offsetX: 0,
      dropShadow: {
        enabled: true
      }
    },
    stroke: {
      width: 1,
      colors: ['#fff']
    },
    xaxis: {
      categories: topData.map(e => e[0]),
      show: false,
      labels: {
        show: false
      },
    },
    yaxis: {
      labels: {
        show: false
      },
    },
    tooltip: {
      theme: 'dark',
      style: {
        color: '#fff'
      },
      y: {
        title: {
          formatter: () => {
            return ''
          }
        }
      }
    }
  };

  const chartDiv = document.querySelector("#chart");
  chartDiv.innerHTML = '';
  const chart = new ApexCharts(chartDiv, options);
  chart.render();
}

async function renderPerMillionChart(){
  const topData = await getTopTenCountriesPerMillion();
  // const countriesNames = topData.map(country => country[0]);
  // const translatedCountries = await getTranslatedCountries(countriesNames);

  const options = {
    series: [{
      data: topData.map(country => country[2].toFixed(2)),
    }],
    chart: {
      type: 'bar',
      height: 380,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        barHeight: '90%',
        horizontal: true,
        dataLabels: {
          position: 'bottom',
        },
      }
    },
    colors: ['#a10f19'],
    dataLabels: {
      enabled: true,
      textAnchor: 'start',
      style: {
        colors: ['#fff']
      },
      style: {
        fontSize: '12px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 600,
        colors: ['#f5f5f5']
      },
      formatter: function (val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val.toLocaleString('pt-BR')
      },
      offsetX: 0,
      dropShadow: {
        enabled: true
      }
    },
    stroke: {
      width: 1,
      colors: ['#fff']
    },
    xaxis: {
      categories: topData.map(e => e[0]),
      show: false,
      labels: {
        show: false
      },
    },
    yaxis: {
      reversed: true,
      labels: {
        show: false
      },
    },
    tooltip: {
      theme: 'dark',
      style: {
        color: '#fff'
      },
      y: {
        title: {
          formatter: () => {
            return ''
          }
        }
      }
    }
  };

  const chartDiv = document.querySelector("#chartPerMillion");
  chartDiv.innerHTML = "";
  const chart = new ApexCharts(chartDiv, options);
  chart.render();
}

function goBack() {
  window.AppInventor.setWebViewString(JSON.stringify({
    action: 'goToScreen',
    goToScreen: 'Screen1'
  }));
}

function animaNumeros()
{
  const numeros = document.querySelectorAll('[data-numero]');
  numeros.forEach((numero) => {
    const total = +numero.innerText;
    const incremento = Math.floor(total / 100); // Valor relativo ao numero total (como eram numeros bem distintos, não faria sentido incrementar de um em um)
    let start = 0;
    const timer = setInterval(() => {
      start += incremento;
      numero.innerText = start.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); 
      if(start > total) // Caso o numero passe do total (numero da api), ele deixa o texto como o total, aplica o RegEx e limpa o timer
      {
        numero.innerText = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); 
        clearInterval(timer);
      }
    }, 10 * Math.random()) // Esse math.random é só pra deixar mais 'orgânico'
  })
}

function setUpdatedAt(data) {
  const updatedAtDiv = document.querySelector(".updated");
  if (updatedAtDiv.innerText !== "-") return;

  const updated = data[0][1].All.updated
    ? data[0][1].All.updated
    : Object.entries(data[0][1])[1][1].updated;

  updatedAtDiv.innerHTML = new Date(updated).toLocaleDateString('pt-BR');
}

function setTotalGlobalCases(value){
  document.querySelector(".numerosConfirmados").innerText = value;
  animaNumeros();
}

async function renderTotalDeaths(){
  if (!casesData) {
    casesData = await fetch("https://covid-api.mmediagroup.fr/v1/cases")
      .then(res => res.json());
  }

  document.getElementById("totalDeaths").innerText = casesData.Global.All.deaths.toLocaleString('pt-BR')
}

async function getHistoryData(){
  const NUMBER_OF_DATES = 20;

  if (!deathsData) {
    deathsData = await fetch('https://covid-api.mmediagroup.fr/v1/history?status=Deaths&country=Global')
    .then(res => res.json());
  }

  const allDates = Object.keys(deathsData.All.dates);

  const lastNumberDays = allDates.splice(0, NUMBER_OF_DATES);

  const lastNumberDaysData = lastNumberDays.map(day => deathsData.All.dates[day]);

  return {
    dates: lastNumberDays,
    cases: lastNumberDaysData,
  }
}

async function renderTotalDeathChart(){
  const history = await getHistoryData();

  const options = {
    colors: ['#111'],
    series: [{
      data: history.cases,
    }],
    chart: {
      type: 'area',
      height: 350,
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    labels: history.dates,
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      opposite: true
    },
    legend: {
      horizontalAlign: 'left'
    },
    tooltip: {
      theme: 'dark',
      style: {
        color: '#fff'
      },
      y: {
        title: {
          formatter: () => {
            return ''
          }
        }
      }
    }
  };


  const chartDiv = document.querySelector("#totalDeathsChart");
  chartDiv.innerHTML = "";
  const chart = new ApexCharts(chartDiv, options);
  chart.render();
}