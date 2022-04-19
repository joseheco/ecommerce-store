import './styles.css';
import 'boxicons'

const displaySection = document.querySelector('.items')
const search = document.querySelector('#search')
const displayCategories = document.querySelector('#categories')

const getProducts = async () => {
  const url = 'http://localhost:3000/product'
  const response = await fetch(url);
  const result = await response.json();
  return result
}

const getCategories = async () => {
  const url = `http://localhost:3000/category`
  const response = await fetch(url);
  const result = await response.json();
  return result
}

const getObjByCategory = async (catName) => {
  const url = `http://localhost:3000/product/category/${catName}`
  const response = await fetch(url);
  const result = await response.json();
  return result
}

const productsByName = async (prodName) => {
  const url = `http://localhost:3000/product/search/${prodName}`
  const response = await fetch(url);
  const result = await response.json();
  return result
}

function displayDiscountFlag(discount){
  if ( discount > 0) {
    return `<p class="discount">&nbsp;-${discount} OFF</p>`;
  }
  return "";
}

function fixFormatPrice(price) {
  var str = price.toString().split(".");
  str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return str.join(".");
}

function buildProductList(list) {
  displaySection.innerHTML = ""
  for(let i = 0; i < list.length; i++){
  const discount = list[i].discount;
  const price = list[i].price
  const card = document.createElement('div');

    card.classList.add('card');
    card.innerHTML = `<img src="${list[i].url_image}">
                      <div class="cardTitle">
                      <h3>${list[i].name}</h3>
                      <div class="price-car">
                        <p class="price">$${fixFormatPrice(price)}</p>
                        <box-icon type='solid' color='white' name='cart' class="car"></box-icon>
                      </div>
                      </div>
                      ${displayDiscountFlag(discount)}`
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
