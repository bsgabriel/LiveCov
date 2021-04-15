function search(){
  const value = document.getElementById("txtSearch").value;
  window.AppInventor.setWebViewString(value);  
}

function generateList(historyArray){ // Array com todos os históricos
  historyArray.map(historyItem => {
    let list = document.getElementById('historyList').innerHTML;

    document.getElementById('historyList').innerHTML += 
    `<li class="listItem ${list ? 'withBorder' : ''}">
    ${historyItem}
    </li>`;
  })
}