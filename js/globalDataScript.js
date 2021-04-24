async function getTopTenCountries(){
    const NUMBER_OF_COUNTRIES_IN_GRAPH = 10;

    const data = fetch("https://covid-api.mmediagroup.fr/v1/cases?country=all")
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
        parsedData.splice(NUMBER_OF_COUNTRIES_IN_GRAPH,parsedData.length - NUMBER_OF_COUNTRIES_IN_GRAPH); 
        parsedData.splice(0, 1); // Tirar os dados "Global"

        // for(let i = 0; i <= 10; i++){
        //console.log(parsedData[i][0], " - ", parsedData[i][1].All.confirmed);
        // }

        return parsedData;
    });

    return data;
}

async function renderChart(){
    const topData = await getTopTenCountries();

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
            categories: topData.map(country => country[0]),
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

renderChart();

  