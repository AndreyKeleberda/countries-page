import css from "./css/styles.css";

// импорты файлов стилей
import modalStyles from "./css/modal.css";
import normalize from "./css/modern-normalize.css";

// импорт файла с кодом запросов инфо о странах
import "./js/countries.js";

import refs from "./js/refs.js";
const { searchForm, searchResults, countriesList, modal, modalContent } = refs;

import countriesListItem from "./template/countriesListItem.hbs";
import modalCountryItem from "./template/modalCountryItem.hbs";
import countrySearchItem from "./template/countrySearchItem.hbs";

// window.addEventListener("DOMContentLoaded", getAllCountries);

searchForm.addEventListener("submit", (event) => {
  // <!-- отменяем дефолтное событие браузера - отправку формы -->
  event.preventDefault();

  // <!-- получаем значение из инпута с  name="search" и сохраняем в переменную searchName -->
  let searchName = event.target.elements.search.value;

  // <!-- вызываем функцию searchCountry для запроса и отрисовки страны по введенному значению, передаем в ее вызов полученное из формы значение значение  -->

  // <!-- зачищаем форму после отправки запроса -->
  searchForm.reset();
});
