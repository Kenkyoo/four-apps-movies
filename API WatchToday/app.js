const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDEzZGYyYTE2MjJhZDM1OTQyYzAwOTJmMGE0YmNjOCIsIm5iZiI6MTcyMTY0MDI0NS44ODQ3MTcsInN1YiI6IjY2MDVlYjI1NDE3YWFmMDE3ZDYwYjgxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RiQoSaSfOiak1pRfbSqB3SPCnuF4B-3dXlyx6zE8ZKg'
    }
  };

axios.get('https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1', options)
  .then(function (response) {
    // manejar respuesta exitosa
    displayCards(response.data.results);
  })
  .catch(function (error) {
    // manejar error
    console.log(error);
  })
  .finally(function () {
    // siempre sera executado
  });

function displayCards(array) {
    const divCards = document.getElementById('divCards');
    const urlImage = 'https://image.tmdb.org/t/p/original/';
    let cards = "";
    array.forEach(element => {
    const yearAirDate = moment(element.first_air_date).year();
        cards += `
        <div class="col mx-auto my-auto border-bottom">
          <div class="card mb-3 shadow-lg mx-auto" style="max-width: 540px;">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${urlImage}${element.poster_path}" class="img-fluid rounded-start" alt="${element.original_name}">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${element.name}  (${yearAirDate})</h5>
                  <p class="card-text">${element.overview}</p>
                  <span class="badge text-bg-success">${element.vote_average}</span>
                  <p class="card-text"><small class="text-body-secondary">${element.popularity}</small></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        `;
    });
    divCards.innerHTML = cards;
}

/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2024 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

(() => {
    'use strict'
  
    const getStoredTheme = () => localStorage.getItem('theme')
    const setStoredTheme = theme => localStorage.setItem('theme', theme)
  
    const getPreferredTheme = () => {
      const storedTheme = getStoredTheme()
      if (storedTheme) {
        return storedTheme
      }
  
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
  
    const setTheme = theme => {
      if (theme === 'auto') {
        document.documentElement.setAttribute('data-bs-theme', (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
      } else {
        document.documentElement.setAttribute('data-bs-theme', theme)
      }
    }
  
    setTheme(getPreferredTheme())
  
    const showActiveTheme = (theme, focus = false) => {
      const themeSwitcher = document.querySelector('#bd-theme')
  
      if (!themeSwitcher) {
        return
      }
  
      const themeSwitcherText = document.querySelector('#bd-theme-text')
      const activeThemeIcon = document.querySelector('.theme-icon-active use')
      const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`)
      const svgOfActiveBtn = btnToActive.querySelector('svg use').getAttribute('href')
  
      document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
        element.classList.remove('active')
        element.setAttribute('aria-pressed', 'false')
      })
  
      btnToActive.classList.add('active')
      btnToActive.setAttribute('aria-pressed', 'true')
      activeThemeIcon.setAttribute('href', svgOfActiveBtn)
      const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`
      themeSwitcher.setAttribute('aria-label', themeSwitcherLabel)
  
      if (focus) {
        themeSwitcher.focus()
      }
    }
  
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      const storedTheme = getStoredTheme()
      if (storedTheme !== 'light' && storedTheme !== 'dark') {
        setTheme(getPreferredTheme())
      }
    })
  
    window.addEventListener('DOMContentLoaded', () => {
      showActiveTheme(getPreferredTheme())
  
      document.querySelectorAll('[data-bs-theme-value]')
        .forEach(toggle => {
          toggle.addEventListener('click', () => {
            const theme = toggle.getAttribute('data-bs-theme-value')
            setStoredTheme(theme)
            setTheme(theme)
            showActiveTheme(theme, true)
          })
        })
    })
  })()