import { getObjByCategory } from './apiConexion'
import { buildProductList } from '../index'

const displayCategories = document.querySelector('#categories');

export function buildCategoryList(list) {
  displayCategories.innerHTML = "";
    const ul = document.createElement('ul');
    ul.classList.add('categories')
    list.forEach(elem => {
      const li = document.createElement('li');
      li.setAttribute('data-name', elem.name);
      li.textContent = elem.name
      li.addEventListener('click', (event) => {
        displayByCategory(event.target.dataset.name)
      })
      ul.appendChild(li)
    })
    displayCategories.appendChild(ul)
}

export function displayByCategory (catName) {
  getObjByCategory(catName).then(res => {
    buildProductList(res)
  })
}

