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

    let indiceBandeira = ativos * 100 / population;
    if (indiceBandeira > 0.5) {
      document.querySelector(".bandeira").innerHTML = `
      <div class="iconeBandeiraContainer vermelho">
        <svg class="iconeBandeira" viewBox="0 0 24 24">
          <path fill="currentColor" d="M13 14H11V9H13M13 18H11V16H13M1 21H23L12 2L1 21Z" />
        </svg>
      </div>
      <div class="bandeiraText">
        <h1>Situação:</h1>
        <h3 class="vermelho">Bandeira Vermelha</h3>
        <p>Não saia de casa pois os índices de contágio na sua região estão muito altos. Preze por sua saúde e principalmente as dos outros.</p>
      </div>
      `
    } else if (indiceBandeira <= 0.5 && indiceBandeira > 0.23){
      document.querySelector(".bandeira").innerHTML = `
      <div class="iconeBandeiraContainer amarelo">
        <svg class="iconeBandeira" viewBox="0 0 24 24">
          <path fill="currentColor" d="M20.25 6C18.79 6 17.61 7.14 17.5 8.58L12.55 7.16C12.19 7.05 11.81 7.05 11.45 7.16L6.5 8.58C6.39 7.14 5.21 6 3.75 6C2.23 6 1 7.23 1 8.75V12.25C1 13.77 2.23 15 3.75 15H5.68C6.81 17.36 9.21 19 12 19S17.19 17.36 18.32 15H20.25C21.77 15 23 13.77 23 12.25V8.75C23 7.23 21.77 6 20.25 6M5 13.5H3.75C3.06 13.5 2.5 12.94 2.5 12.25V8.75C2.5 8.06 3.06 7.5 3.75 7.5S5 8.06 5 8.75V13.5M15 12L12.4 11.3C12.1 11.2 11.8 11.2 11.6 11.3L9 12V11L11.3 10.3C11.7 10.2 12.2 10.2 12.7 10.3L15 11V12M21.5 12.25C21.5 12.94 20.94 13.5 20.25 13.5H19V8.75C19 8.06 19.56 7.5 20.25 7.5S21.5 8.06 21.5 8.75V12.25Z" />
        </svg>
      </div>
      <div class="bandeiraText">
        <h1>Situação:</h1>
        <h3 class="amarelo">Bandeira Amarela</h3>
        <p>Evite sair de casa para evitar a ploriferação do vírus. Não deixe de usar a máscara quando estiver em lugares públicos.</p>
      </div>
      `
    } else {
      document.querySelector(".bandeira").innerHTML = `
      <div class="iconeBandeiraContainer verde">
        <svg class="iconeBandeira" viewBox="0 0 24 24">
          <path fill="currentColor" d="M23,10C23,8.89 22.1,8 21,8H14.68L15.64,3.43C15.66,3.33 15.67,3.22 15.67,3.11C15.67,2.7 15.5,2.32 15.23,2.05L14.17,1L7.59,7.58C7.22,7.95 7,8.45 7,9V19A2,2 0 0,0 9,21H18C18.83,21 19.54,20.5 19.84,19.78L22.86,12.73C22.95,12.5 23,12.26 23,12V10M1,21H5V9H1V21Z" />
      </svg>
      </div>
      <div class="bandeiraText">
        <h1>Situação:</h1>
        <h3 class="verde">Bandeira Verde</h3>
        <p>Sua região está com indices baixos de casos de Covid-19. Mesmo assim não deixe de prezar pela saúde dos outros saindo de casa apenas se necessário</p>
      </div>
      `
    }
  });
}

function searchButtonClicked(){
  window.AppInventor.setWebViewString(JSON.stringify({
    isValid: true,
    action: 'goToScreen',   
    value,              
    goToScreen: 'Search',
  })); 
}

fetchApi('https://covid-api.mmediagroup.fr/v1/cases?country=Brazil', '.numerosConfirmados', '.numerosRecuperados', '.numerosMortes', '.numerosAtivos');