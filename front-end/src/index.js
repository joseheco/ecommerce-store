import './styles.css';

const url = 'localhost'

const getObj = new Promise((resolve) => {
  fetch(url).then(res => res.json())
  .then(data => {
    resolve(data.id)
  })
})

const img = document.createElement('img');
document.body.appendChild(img);

async function display(){
  const items = await getObj;
  const displaySection = document.querySelector('.items')

  const card = document.createElement('div');

  card.classList.add('card');
  card.innerHTML = `<img src="${meals[i].strMealThumb}">
                    <div class="cardTitle">
                    <h1>${meals[i].strMeal}</h1>
                    <box-icon data-value="${meals[i].idMeal}" class="heart" name='heart'></box-icon>
                    </div>
                    <p data-value="${meals[i].idMeal}" class="likes">0 likes</p>
                    <div class="btns">
                    <button data-value="${meals[i].idMeal}" type="button" class="comment-btn">Comments</button>
                    </div>
  `
  
  displaySection.appendChild(card)
  }

