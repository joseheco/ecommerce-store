import './styles.css';

const displaySection = document.querySelector('.items')
const search = document.querySelector('#search')
const displayCategories = document.querySelector('#categories')
const img = document.createElement('img');
document.body.appendChild(img);

const getProducts = async () => {
  const url = 'http://localhost:8080/product'
  const response = await fetch(url);
  const result = await response.json();
  return result
}

const getCategories = async () => {
  const url = `http://localhost:8080/category`
  const response = await fetch(url);
  const result = await response.json();
  return result
}

const getObjByCategory = async (catName) => {
  const url = `http://localhost:8080/product/category/${catName}`
  const response = await fetch(url);
  const result = await response.json();
  console.log(result)
  return result
}

const productsByName = async (prodName) => {
  const url = `http://localhost:8080/product/search/${prodName}`
  const response = await fetch(url);
  const result = await response.json();
  return result
}

function buildProductList(list) {
  displaySection.innerHTML = ""
  for(let i = 0; i < list.length; i++){
    console.log(list[i].name)
    const card = document.createElement('div');
  
    card.classList.add('card');
    card.innerHTML = `<img src="${list[i].url_image}">
                      <div class="cardTitle">
                      <h1>${list[i].name}</h1>
                      <p>${list[i].price}</p>
                      </div>
                      <p >${list[i].discount}</p>
                      <div class="btns">
                      <p>${list[i].category}</p>
                      </div>`
    displaySection.appendChild(card)
  }
}

function displayByCategory(catName) {
  getObjByCategory(catName).then(res => {
    buildProductList(res)
  })
}

function buildCategoryList(list) {
  displayCategories.innerHTML = "";
    const ul = document.createElement('ul');
    list.forEach(elem => {
      const li = document.createElement('li');
      li.setAttribute('data-name', elem.name);
      li.textContent = elem.name
      li.addEventListener('click', (event) => {
        console.log(event.target.dataset.name)
        displayByCategory(event.target.dataset.name)
      })
      ul.appendChild(li)
    })
    displayCategories.appendChild(ul)
}

function display() {
  getCategories().then(res => {
    buildCategoryList(res);
    getProducts().then(res => {
      buildProductList(res)
    })
  })
}

function searchByProdName(prodName) {
  productsByName(prodName).then(res => {
    buildProductList(res)
  })
}

search.addEventListener('input', (event) => {
  searchByProdName(event.target.value)
})

display();
