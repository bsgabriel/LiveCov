/*
  isValid: Colocar valid: true para caso o .WebViewStringChange seja
  chamado quando a gente não quiser, não rodar nada.
  Lembrar de colocar um teste para testar se o isValid está como true
  lá no app inventor antes de executar

  action = o que é pra fazer lá no app inventor
  - tipos:
    "search" = Vai mandar um valor "value" para ser pesquisado na api em outra página
    "goBack" = Voltar para a página anterior
*/

function search(data){
  const value = data ? data : document.getElementById("txtSearch").value;

  if (value === '') return; // Se deu true aqui, o usuário n clicou em nenhum botão e n digitou nada, então n é pra fazer nada

  const parsedValue = value.charAt(0).toUpperCase() + value.slice(1);

  window.AppInventor.setWebViewString(JSON.stringify({
    action: 'search',   
    value: parsedValue,              
    goToScreen: 'Screen1',
  }));  
}

function generateList(historyArray){ 
  // historyArray =  Array com todo o histórico de pesquisa já formatado do mais antigo para o mais atual (formatar no app inventor)
  historyArray.reverse().map(historyItem => {
    document.getElementById('historyList').innerHTML += 
    `<li
      class="listItem"
      onClick="search('${historyItem}');"
    >
      <div class="itemTextContainer">
        ${historyItem}
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" class="listItemSvg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
    </li>`;
  })
}

function goBack(){
  window.AppInventor.setWebViewString(JSON.stringify({
    isValid: true,        
    action: 'goBack',     // Linha 1                
    goToScreen: 'Screen1' 
  }));  
}

if(window.AppInventor !== undefined){
  document.getElementById("txtSearch").addEventListener("keyup", (event) => {
    if (event.code === "Enter"){
      document.getElementById("txtSearch").blur();
    }
  });
}