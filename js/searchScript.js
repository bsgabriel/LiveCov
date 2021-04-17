function search(data){
  const value = data ? data : document.getElementById("txtSearch").value;

  if (value === '') return; // Se deu true aqui, o usuário n clicou em nenhum botão e n dgitou nada, então n é pra fazer nada

  window.AppInventor.setWebViewString(JSON.stringify({
    isValid: true,
    value,
    goToScreen: 'html2' // Alterar para o nome da página no app final
  }));  
}

function generateList(historyArray){ // Array com todo o histórico de pesquisa já formatado (formatar no app inventor)
  historyArray.map(historyItem => {
    document.getElementById('historyList').innerHTML += 
    `<li
      class="listItem"
      onClick="search('${historyItem}');"
    >
      ${historyItem}
    </li>`;
  })
}