var totalGlobalCases = '-';

async function getTranslatedCountries(countriesNames){
    // let body = countriesNames.map(c => {return {Text:c}})

    console.log("body: ",JSON.stringify([{Text: "I'm testing"},{Text: "I'm testing"},{Text: "I'm testing"}]));

    let headers = new Headers();

    headers.append("x-rapidapi-key", "f56f7bd46fmsh9defc43b365ae9ap1c0889jsn66fd72bca751");
    headers.append("Content-Type", "application/json");

    fetch('https://microsoft-translator-text.p.rapidapi.com/translate?to=pt&api-version=3.0', {
        headers,
        method: 'POST',
        body:  JSON.stringify([{Text: "I'm testing"},{Text: "I'm testing"},{Text: "I'm testing"}]),
    })
    .then(data => data.json())
    .then(data => {
        console.log("Data: ",data);
        return data;
    })

    // return data;
}

async function getTopTenCountries(){
    const NUMBER_OF_COUNTRIES_IN_GRAPH = 10;

    const data = fetch("https://covid-api.mmediagroup.fr/v1/cases")
    .then(res => res.json())
    .then((data) => {
        const parsedData = Object.entries(data);

        parsedData.sort(([_a, a], [_b, b]) => {
            if(a.All.confirmed >= b.All.confirmed){
                return 1;
            }else if(a.All.confirmed < b.All.confirmed){
                return -1;
            } else {
                return 0;
            }
        })

        parsedData.reverse();

        totalGlobalCases = parsedData[0][1].All.confirmed.toLocaleString('pt-BR');

        parsedData.splice(0, 1); // Tirar os dados "Global"
        parsedData.splice(NUMBER_OF_COUNTRIES_IN_GRAPH,parsedData.length - NUMBER_OF_COUNTRIES_IN_GRAPH); 

        return parsedData;
    });

    return data;
}

async function renderChart(){
    const topData = await getTopTenCountries();
    const countriesNames = topData.map(country => country[0]);
    const translatedCountries = await getTranslatedCountries(countriesNames);

    var options = {
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
            formatter: function(val, opt) {
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
            y: {
                title: {
                    formatter: () => {
                        return ''
                    }
                }
            }
        }
    };
    
    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
}

async function initPage(){
    await renderChart();
    document.querySelector(".totalContainer").innerHTML = `
        <h2>Total de casos:</h2>
        <p class="numerosConfirmados" data-numero>${totalGlobalCases}</p>
    `
}

function goBack(){
  window.AppInventor.setWebViewString(JSON.stringify({
    action: 'goBack',            
    goToScreen: 'Home' 
  }));  
}

function animaNumeros() {
  const numeros = document.querySelectorAll('[data-numero]'); 

  numeros.forEach((numero) => {
    const total = +numero.innerText;
    const incremento = Math.floor(total / 100); 
    let start = 0;
    const timer = setInterval(() => {
      start += incremento;
      numero.innerText = start.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); 
      if(start > total) 
      {
        numero.innerText = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); 
        clearInterval(timer);
      }
    }, 10 * Math.random()) 
  })
}
