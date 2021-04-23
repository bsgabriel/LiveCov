const fetch = require("node-fetch");

fetch("https://covid-api.mmediagroup.fr/v1/cases?country=all")
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
    parsedData.splice(0,1);
    for(let i = 0; i <= 10; i++){
        console.log(parsedData[i][0], " - ", parsedData[i][1].All.confirmed);
    }

    /*  parsedDAta = top de casos de covid em ordem :)
    Ex: parsedData = [
        ['Nome do país top 1', {...informações}],
        ['Nome do país top 2', {...informações}],
        ['Nome do país top 3', {...informações}],
        ['Nome do país top 4', {...informações}],
        ...,
    ]
    */
})