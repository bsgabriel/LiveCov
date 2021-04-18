function fetchApi(url, targetConfirmados, targetRecuperados, targetMortos, targetAtivos)
{
  fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const {confirmed, recovered, deaths, population} = data.All;

    const numerosConfirmados = document.querySelector(targetConfirmados);
    const numerosRecuperados = document.querySelector(targetRecuperados);
    const numerosMortes = document.querySelector(targetMortos);
    const numerosAtivos = document.querySelector(targetAtivos);

    const ativos = confirmed - deaths - recovered;

    numerosConfirmados.innerHTML = confirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    numerosRecuperados.innerHTML = recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    numerosMortes.innerHTML = deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    numerosAtivos.innerHTML = ativos.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    const indiceBandeira = ativos * 100 / population;
    if (indiceBandeira > 0.5) {
      console.log("vermelho")
    } else if (indiceBandeira <= 0.5 && indiceBandeira > 2.3){
      console.log("amarelo")
    } else {
      console.log("verde")
    }
  });
}

fetchApi('https://covid-api.mmediagroup.fr/v1/cases?country=Brazil', '.numerosConfirmados', '.numerosRecuperados', '.numerosMortes', '.numerosAtivos');

function searchButtonClicked(){
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
  window.AppInventor.setWebViewString(JSON.stringify({
    isValid: true,
    action: 'goToScreen',   
    value,              
    goToScreen: 'Search',
  })); 
}