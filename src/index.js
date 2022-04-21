import './styles.css';
import 'boxicons'
import { getProducts, getCategories, productsByName  } from './modules/apiConexion'
import { buildCategoryList } from './modules/categories';

const displaySection = document.querySelector('.items');
const search = document.querySelector('#search');

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

export function buildProductList(list) {
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

function searchByProdName(prodName) {
  productsByName(prodName).then(res => {
    buildProductList(res)
  })
}

search.addEventListener('input', (event) => {
  searchByProdName(event.target.value)
})

function display() {
  getCategories().then(res => {
    buildCategoryList(res);
    getProducts().then(res => {
      buildProductList(res)
    })
  })
}

display();
