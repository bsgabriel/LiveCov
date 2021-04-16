export default function fetchApi(url, targetConfirmados, targetRecuperados, targetMortos)
{
  fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const numerosConfirmados = document.querySelector(targetConfirmados);
    const numerosRecuperados = document.querySelector(targetRecuperados);
    const numerosMortes = document.querySelector(targetMortos);
    numerosConfirmados.innerHTML = data.All.confirmed;
    numerosRecuperados.innerHTML = data.All.recovered ;
    numerosMortes.innerHTML = data.All.deaths;
  });
}
