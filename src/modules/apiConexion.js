export const getProducts = async () => {
  const url = 'https://nodejs-bsale.herokuapp.com/product'
  const response = await fetch(url);
  const result = await response.json();
  return result
}

export const getCategories = async () => {
  const url = `https://nodejs-bsale.herokuapp.com/category`
  const response = await fetch(url);
  const result = await response.json();
  return result
}

export const getObjByCategory = async (catName) => {
  const url = `https://nodejs-bsale.herokuapp.com/product/category/${catName}`
  const response = await fetch(url);
  const result = await response.json();
  return result
}

export const productsByName = async (prodName) => {
  const url = `https://nodejs-bsale.herokuapp.com/product/search/${prodName}`
  const response = await fetch(url);
  const result = await response.json();
  return result
}
