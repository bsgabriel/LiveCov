import fetchApi from './modules/fetchApi.js';

fetchApi('https://covid-api.mmediagroup.fr/v1/cases?country=Brazil', '.numerosConfirmados', '.numerosRecuperados', '.numerosMortes');
