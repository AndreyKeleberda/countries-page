import refs from "../js/refs.js";
const { searchForm, searchResults, countriesList, modal, modalContent } = refs;

import countriesListItem from "../template/countriesListItem.hbs";
import modalCountryItem from "../template/modalCountryItem.hbs";
import countrySearchItem from "../template/countrySearchItem.hbs";

window.addEventListener("DOMContentLoaded", getAllCountries);

searchForm.addEventListener("submit", (event) => {
  // <!-- отменяем дефолтное событие браузера - отправку формы -->
  event.preventDefault();

  // <!-- получаем значение из инпута с  name="search" и сохраняем в переменную searchName -->
  let searchName = event.target.elements.search.value;

  // <!-- вызываем функцию searchCountry для запроса и отрисовки страны по введенному значению, передаем в ее вызов полученное из формы значение значение  -->
  searchCountry(searchName);
  // <!-- зачищаем форму после отправки запроса -->
  searchForm.reset();
});
// ---------------------------------

// закрываем модальное окно по Escape, добавляя класс is-hidden всему модальному окну
// и зачищаем див с классом modal-content

window.addEventListener("keydown", (e) => {
  if (e.code === "Escape") {
    modal.classList.add("is-hidden");
  }
  modalContent.innerHTML = "";
});
// --------------------------

// закрываем модальное окно по клику за пределами карточки,
// т.е. если целевой элеменет не имеет id="content-modal"

modal.addEventListener("click", (e) => {
  if (e.target.id !== "modal-content") {
    modal.classList.add("is-hidden");
    modalContent.innerHTML = "";
  }
});
// ----------------------------------------------

async function getAllCountries() {
  let url = `https://restcountries.eu/rest/v2/all`;
  let response = await fetch(url);
  let data = await response.json();
  const items = countriesListItem(data);
  countriesList.insertAdjacentHTML("afterbegin", items);
  const countries = [...countriesList.children];

  countries.forEach((country) => {
    country.addEventListener("click", async (e) => {
      const name = e.currentTarget.textContent.trim();
      let url = `https://restcountries.eu/rest/v2/name/${name}`;
      let response = await fetch(url);
      let data = await response.json();
      const item = modalCountryItem(data);
      modalContent.insertAdjacentHTML("afterbegin", item);
      modal.classList.remove("is-hidden");
    });
  });
}

async function searchCountry(searchName) {
  let url = `https://restcountries.eu/rest/v2/name/${searchName}`;
  let response = await fetch(url);
  let data = await response.json();
  const item = countrySearchItem(data);
  searchResults.insertAdjacentHTML("afterbegin", item);
  const countries = [...searchResults.children];

  countries.forEach((country) => {
    country.addEventListener("click", async (e) => {
      let name = e.currentTarget.textContent.trim();
      let url = `https://restcountries.eu/rest/v2/name/${name}`;
      let response = await fetch(url);
      let data = await response.json();
      const item = modalCountryItem(data);
      modalContent.insertAdjacentHTML("afterbegin", item);
      modal.classList.remove("is-hidden");
    });
  });
}
