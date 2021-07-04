// импортируем объект доступов из файла refs.js под именем refs
// деструктуризируем свойства объекта доступов, чтобы обращаться к DOM-элементам напрямую, не через объект refs

import refs from "../js/refs.js";
const { searchForm, searchResults, countriesList, modal, modalContent } = refs;
// ------------------------------------------

// импортируем шаблоны из папки template

import countriesListItem from "../template/countriesListItem.hbs";
import modalCountryItem from "../template/modalCountryItem.hbs";
import countrySearchItem from "../template/countrySearchItem.hbs";
// --------------------------------------------

// вешаем слушателя событий на глобальный объект window по событию загрузки страницы,
// передаем ссылку на функцию getAllCountries для запроса и отрисовки списка стран сразу при загрузке

window.addEventListener("DOMContentLoaded", getAllCountries);
// --------------------------------------

// вешаем слушателя событий на форму с полем ввода названия страны и вызываем функцию запроса и отрисоки
// полученных стран или страны для отрисовки в результатах поиска

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

// создаем функцию getAllCountries для запроса всех стран для вывода общего списка

function getAllCountries() {
  let url = `https://restcountries.eu/rest/v2/all`;

  fetch(url)
    // преобразуем полученный ответ в формат json
    // и возвращаем его
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // вызываем шаблон countriesListItem, передаем в него полученную data и записываем результат в переменную items
      const items = countriesListItem(data);
      // встраиваем созданную шаблоном разметку items в `<ul class="coutries-list" id="coutries-list"></ul>` - вспоминаем, как назвали деструктуризированную из объекта refs переменную с ссылкой на этот ul
      //   для встраивания разметки используем метод insertAdjacentHTML
      countriesList.insertAdjacentHTML("afterbegin", items);
      // теперь создаем переменную countries и записываем в нее преобразование коллекции "детей" вышеуказанного списка стран в полноценный массив с помощью [...SPREAD]
      const countries = [...countriesList.children];
      // перебираем через forEach созданный массив стран и на каждую вешаем слушателя по клику

      countries.forEach((country) => {
        country.addEventListener("click", (event) => {
          // записываем в переменную name значение свойства textContent с применением метода trim(), чтобы убить лишние пробелы из целевого элемента события
          const name = event.currentTarget.textContent.trim();
          // снова добавляем переменную с адресом запроса
          let url = `https://restcountries.eu/rest/v2/name/${name}`;

          // делаем новый запрос через метод fetch(url)
          //   обрабатываем методами then

          fetch(url)
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              // при получении данных о стране, передаем их в вызов шаблона modalCountryItem
              //   результат встраиваем в `<div class="modal-content" id="modal-content"></div>` - его переменная должна быть деструктуризирована из refs
              // у `<div class="modal is-hidden" id="modal">` - переменная, там же из refs
              //   удаляем класс "is-hidden" для отображения
              const item = modalCountryItem(data);
              modalContent.insertAdjacentHTML("afterbegin", item);
              modal.classList.remove("is-hidden");
            });
        });
      });
    });
}
// ---------------------------------------

// создаем функцию searchCountry для запроса и отрисовки страны по введенному значению
function searchCountry(searchName) {
  let url = `https://restcountries.eu/rest/v2/name/${searchName}`;

  fetch(url)
    .then((response) => {
      // возвращаем ответ в формате json
      return response.json();
    })
    .then((data) => {
      // передаем полученную data в вызов countrySearchItem
      const item = countrySearchItem(data);
      console.log(item);
      // встраиваем разметку из countrySearchItem в
      //   `<ul class="search-results" id="search-results"></ul>` методом insertAdjacentHTML
      searchResults.insertAdjacentHTML("afterbegin", item);

      // теперь создаем переменную countries и записываем в нее преобразование коллекции "детей" вышеуказанного списка стран в полноценный массив с помощью [...SPREAD]
      const countries = [...searchResults.children];
      // перебираем через forEach созданный массив стран и на каждую вешаем слушателя по клику

      countries.forEach((country) => {
        country.addEventListener("click", (event) => {
          // записываем в переменную name значение свойства textContent с применением метода trim(), чтобы убить лишние пробелы из целевого элемента события
          let name = event.currentTarget.textContent.trim();

          // добавляем переменную с адресом запроса
          let url = `https://restcountries.eu/rest/v2/name/${name}`;

          // делаем новый запрос через метод fetch(url)
          // обрабатываем методами then
          fetch(url)
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              // при получении данных о стране, передаем их в вызов шаблона modalCountryItem
              // результат встраиваем в `<div class="modal-content" id="modal-content"></div>` - его переменная должна быть деструктуризирована из refs
              // у `<div class="modal is-hidden" id="modal">` - переменная, там же из refs
              // удаляем класс "is-hidden" для отображения
              const item = modalCountryItem(data);
              modalContent.insertAdjacentHTML("afterbegin", item);
              modal.classList.remove("is-hidden");
            });
        });
      });
    });
}
