export const getProducts = async () => {
  const url = '/product'
  const response = await fetch(url);
  const result = await response.json();
  return result
}

export const getCategories = async () => {
  const url = `/category`
  const response = await fetch(url);
  const result = await response.json();
  return result
}

export const getObjByCategory = async (catName) => {
  const url = `/product/category/${catName}`
  const response = await fetch(url);
  const result = await response.json();
  return result
}

export const productsByName = async (prodName) => {
  const url = `/product/search/${prodName}`
  const response = await fetch(url);
  const result = await response.json();
  return result
}
