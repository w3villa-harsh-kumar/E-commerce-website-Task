const params = new URLSearchParams(location.search);
const productID = params.get("product_id");



// get add products
async function getProductData() {
  let response = await fetch("data/products.json");
  let data = await response.json();
  let product = data.products.find((product) => product.id == productID);
  return product;
}

getProductData();

// display product
async function displayDetails() {
  let product = await getProductData();
  console.log(product);
  const activeProductName = document.getElementById("active-product-name");
  const productName = document.getElementById("product-name");
  const imageBarImages = document.getElementsByClassName("image-bar-image");
  const text = document.getElementById("text");
  const actualPrice = document.getElementById("actual-price");
  const discountedPrice = document.getElementById("discounted-price");

  activeProductName.innerText = product.name;
  productName.innerText = product.name;
  Array.from(imageBarImages).forEach((image) => {
    image.src = product.img;
  });
  text.innerText = product.description;
  actualPrice.innerText = product.price || product.actualPrice || 200;
  discountedPrice.innerText = product?.discountedPrice || product.price-50;
}

displayDetails();
