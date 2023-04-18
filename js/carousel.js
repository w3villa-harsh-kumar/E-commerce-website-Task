// get add products
async function getAllProductsData() {
  let response = await fetch("data/products.json");
  let data = await response.json();
  return data;
}

// get the data from json file
async function getData(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

// Banner Products Listing Function
async function bannarProducts() {
  let data = await getData("data/bannarProducts.json");
  const bannarCarousel = document.getElementById("bannar-carousel");
  let bannarCarouselData = "";
  Array.from(data["bannar-products"]).forEach((item, index) => {
    bannarCarouselData += `
      <div class="item">
      <img
        src="${item.img}"
        alt="image" />
      <div class="content p-lr-40px">
        <div class="badge m-tb">
          <span>${item.tag}</span>
        </div>
        <div class="heading m-tb">
          ${item.description}
        </div>
        <div class="button m-tb">
          <a href="">Learn More &nbsp; <i class="fa-regular fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
      `;
  });

  bannarCarousel.innerHTML = bannarCarouselData;
  $("#bannar-carousel").owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    autoplay: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  });
}

// Buy From us Listing Function
async function buyFromUs(term) {
  let response = await fetch("data/buyFromUs.json");
  let data = await response.json();
  let cartegoryCarousel = document.getElementById("category-carousel");
  let html = `<div id="category-carousel-${term}" class="owl-carousel owl-theme">`;
  data[term].forEach((item) => {
    html += `
      <div class="item">
          <div class="image">
            <img
              src="${item.img}"
              alt="${item.name}" />
          </div>
        <div class="category">${item.name}</div>
      </div>
      `;
  });

  cartegoryCarousel.innerHTML = html;
  $(`#category-carousel-${term}`).owlCarousel({
    pagination: false,
    loop: true,
    margin: 10,
    nav: true,
    navText: [
      '<div class="nav-btn prev-slide"><i class="fa-regular fa-chevron-left"></i></div>',
      '<div class="nav-btn next-slide"><i class="fa-regular fa-chevron-right"></i></div>'
    ],
    autoplay: true,
    responsive: {
      0: {
        items: 1,
      },
      700: {
        items: 2,
      },
      1000: {
        items: 3,
      },
      1200: {
        items: 4,
      },
      1400: {
        items: 5,
      },
    },
  });
}

// Featured Products Listing Function
async function featuredProducts(term) {
  let data = await getAllProductsData();
  let filteredData = Array.from(data["products"]).filter((product) => {
    if (product["category"] === term) {
      return product;
    }
  });

  let cartegoryCarousel = document.getElementById(
    "featurred-products-category-carousel"
  );
  let html = `<div id="featurred-products-carousel-${term}" class="owl-carousel owl-theme">`;
  filteredData.forEach((item, index) => {
    html += `
      <div class="item">
          <div class="image">
            <img
              src="${item.img}"
              alt="image" />
            <div class="green-strip product-strip" style="background-color: ${
              item?.tags?.[0]?.color || "green"
            };">
              <span>${item?.tags?.[0]?.tag || "free"}</span>
            </div>
            <div class="red-strip product-strip" style="background-color: ${
              item?.tags?.[1]?.color || "red"
            };">
              <span>${item?.tags?.[1]?.tag || "new"}</span>
            </div>
            <div class="badges">
              <span class="badge badge1">-70%</span>
              <span class="badge badge2">hot</span>
              <span class="badge badge3">top brand</span>
            </div>
          </div>
          <div class="gray-strip">
            <div class="company-name">${item.company}</div>
            <div class="modal">Modal ${item.modalNo}</div>
          </div>
          <div class="details">
            <div class="name">
              <span>${item.name}</span>
            </div>
            <div class="price">
              <div class="discount">
                <span>$${item.discountedPrice}</span>
              </div>
              <div class="current">
                <span>$${item.actualPrice}</span>
              </div>
            </div>
            <div class="bottom flex-between-center">
              <div class="left">
                <div class="quantity">
                  <div class="quantity-input">
                    <input type="number" readonly id="quantity-input-${index}" name="name" value="1" />
                    <div class="button-container">
                      <button class="up-btn" onclick="handleQuantityUpButton(this)" type="button" name="button">
                        <i class="fa-sharp fa-regular fa-chevron-up"></i>
                      </button>
                      <button class="down-btn" onclick="handleQuantityDownButton(this)" type="button" name="button">
                        <i class="fa-sharp fa-regular fa-chevron-down"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="add-to-cart" id="${
                  item.id
                }" onclick="handleAddToCart(this.id)">
                  Add to cart
                </div>
                <div class="mobile-cart" id="${
                  item.id
                }" onclick="handleAddToCart(this.id)">
                  <a href=""><i class="fa-regular fa-cart-shopping"></i></a>
                </div>
              </div>
              <div class="right">
                <div id="${item.id}" id="${
      item.id
    }" class="wishlist"  onclick="handleAddToWishlist(this.id)">
                  <li class="list-item">
                    <a><i class="fa-regular fa-heart"></i></a>
                  </li>
                </div>
                <div class="compare">
                  <li class="list-item">
                    <a href=""><i class="fa-regular fa-circle-waveform-lines"></i>
                    </a>
                  </li>
                </div>
              </div>
            </div>
          </div>
          <div class="gray-strip">
            <div class="buy-now"><i class="fa-regular fa-circle-dollar"></i> Buy Now</div>
            <div class="question" onclick="triggerModal()"><i class="fa-regular fa-circle-question"></i> Question</div>
          </div>
        </div>
      `;
  });

  cartegoryCarousel.innerHTML = html;
  $(`#featurred-products-carousel-${term}`).owlCarousel({
    pagination: false,
    loop: true,
    margin: 20,
    nav: true,
    navText: [
      '<div class="nav-btn prev-slide"><i class="fa-regular fa-chevron-left"></i></div>',
      '<div class="nav-btn next-slide"><i class="fa-regular fa-chevron-right"></i></div>'
    ],
    autoplay: true,
    responsive: {
      0: {
        items: 1,
      },
      700: {
        items: 2,
      },
      1000: {
        items: 3,
      },
      1200: {
        items: 4, 
      },
    },
  });
}

// Fashion Products Listing Function
async function fashionProducts() {
  let data = await getAllProductsData();

  let filteredData = Array.from(data["products"]).filter((product) => {
    if (product["category"] === "fashionProducts") {
      return product;
    }
  });

  const featuredCategoryCarousel = document.getElementById(
    "featurred-category-carousel"
  );

  let featuredCategoryCarouselData = "";
  filteredData.forEach((item, index) => {
    featuredCategoryCarouselData += `
      <div class="item" id="${index}">
      <div class="image">
        <img
          src=${item.img} />
        <div class="green-strip product-strip" style="background-color: ${
          item?.tags?.[0]?.color || "green"
        };">
          <span>${item?.tags?.[0]?.tag || "free"}</span>
        </div>
        <div class="red-strip product-strip" style="background-color: ${
          item?.tags?.[1]?.color || "red"
        };">
          <span>${item?.tags?.[1]?.tag || "new"}</span>
        </div>
        <div class="badges">
          <span class="badge badge1">-70%</span>
          <span class="badge badge2">new</span>
        </div>
      </div>
      <div class="details">
        <div class="name">
          <span>${item.name}</span>
        </div>
        <div class="price">
          <div class="current">
            <span>$ ${item.price}</span>
          </div>
        </div>
        <div class="bottom flex-between-center">
          <div class="bottom-left">
            <div class="add-to-cart" id="${
              item.id
            }" onclick="handleAddToCart(this.id)">
              Add to cart
            </div>
          </div>
          <div class="bottom-right">
            <div id="${
              item.id
            }" class="wishlist" onclick="handleAddToWishlist(this.id)">
              <li class="list-item">
                <a><i class="fa-regular fa-heart"></i></a>
              </li>
            </div>
            <div class="compare">
              <li class="list-item">
                <a href=""><i class="fa-regular fa-circle-waveform-lines"></i>
                </a>
              </li>
            </div>
          </div>
        </div>
      </div>
    </div>
      `;
  });

  featuredCategoryCarousel.innerHTML = featuredCategoryCarouselData;

  $("#featurred-category-carousel").owlCarousel({
    pagination: false,
    loop: true,
    margin: 10,
    nav: true,
    navText: [
      '<div class="nav-btn prev-slide"><i class="fa-regular fa-chevron-left"></i></div>',
      '<div class="nav-btn next-slide"><i class="fa-regular fa-chevron-right"></i></div>'
    ],
    autoplay: true,
    responsive: {
      0: {
        items: 1,
      },
      700: {
        items: 2,
      },
      1000: {
        items: 3,
      },
      1200: {
        items: 4,
      },
      1450: {
        items: 5,
      },
      1850: {
        items: 6,
      },
    },
  });
}

// Blogs Listing Function
async function blogs(term) {
  let response = await fetch("data/blogs.json");
  let data = await response.json();
  const blogsContainer = document.getElementById(
    "blog-categories-carousal-container"
  );
  let blogsData = `<div id="blog-carousel-${term}" class="owl-carousel owl-theme">`;
  Array.from(data[term]).forEach((item, index) => {
    blogsData += `
  <div class="item">
          <div class="image">
            <img src="${item.img}" alt="image" />
            <div class="date">
              <div class="day">${new Date(item.date).getDay()}</div>
              <div class="month">${new Date(item.date)
                .toLocaleString("default", { month: "long" })
                .slice(0, 3)}</div>
            </div>
            <div class="strip">
              <div class="admin">
                <i class="fa-solid fa-user"></i> admin
              </div>
              <div class="commnets">
                <i class="fa-solid fa-comment-lines"></i> ${item.commentCount}
              </div>
              <div class="view">
                <i class="fa-solid fa-eye"></i> ${item.views}
              </div>
            </div>
          </div>
          <div class="blog-container">
            <div class="title">
              ${item.title}
            </div>
            <div class="description">
              ${item.content}
            </div>
            <div class="read-more">
              Read More <i class="fas fa-arrow-right"></i>
            </div>
          </div>
        </div>
  `;
  });
  blogsData += `</div>`;
  blogsContainer.innerHTML = blogsData;

  $(`#blog-carousel-${term}`).owlCarousel({
    pagination: false,
    loop: true,
    margin: 20,
    nav: true,
    navText: [
      '<div class="nav-btn prev-slide"><i class="fa-regular fa-chevron-left"></i></div>',
      '<div class="nav-btn next-slide"><i class="fa-regular fa-chevron-right"></i></div>'
    ],
    autoplay: true,
    responsive: {
      0: {
        items: 1,
      },
      700: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  });
}

// Review Listing Function
async function reviews() {
  let data = await getData("data/peopleReview.json");
  const peopleReviews = document.getElementById("people-reviews-container");

  let peopleReviewsData = `<div id="review-carousel" class="owl-carousel owl-theme">`;
  Array.from(data["peopleReviews"]).forEach((item, index) => {
    peopleReviewsData += `
      <div class="item">
              <div class="review-container">
                <div class="icon">
                  <i class="fa-duotone fa-quote-left"></i>
                </div>
                <div class="description">
                  ${item.reviewContent}
                </div>
                <div class="name">
                  - ${item.author}
                </div>
              </div>
            </div>
      `;
  });

  peopleReviewsData += `</div>`;

  peopleReviews.innerHTML = peopleReviewsData;
  $("#review-carousel").owlCarousel({
    pagination: false,
    loop: true,
    margin: 20,
    nav: true,
    navText: [
      '<div class="nav-btn prev-slide"><i class="fa-regular fa-chevron-left"></i></div>',
      '<div class="nav-btn next-slide"><i class="fa-regular fa-chevron-right"></i></div>'
    ],
    autoplay: true,
    responsive: {
      0: {
        items: 1,
      },
      700: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  });
}

// Most Viewed Products Function
async function mostViewedProducts() {
  let data = await getAllProductsData();

  let filteredData = Array.from(data["products"]).filter((product) => {
    if (product["category"] === "mostViewedProducts") {
      return product;
    }
  });

  const mostViewedProducts = document.getElementById("most-viewed-products");

  let mostViewedProductsData = `<div id="most-viewed-carousel" class="owl-carousel owl-theme">`;
  filteredData.forEach((item, index) => {
    mostViewedProductsData += `
      <div class="item">
      <div class="image">
        <img src="${item.img}"
          alt="image" />
      </div>
      <div class="most-viewed-container">
        <div class="title">
          <span>${item.name}</span>
        </div>
        <div class="price">
          <span>$ ${item.price}</span>
        </div>
        <div class="icons">
          <div class="icon">
            <a href=""><i class="fa-regular fa-cart-shopping"></i></a>
          </div>
          <div class="icon">
            <a href=""><i class="fa-regular fa-heart"></i></a>
          </div>
          <div class="icon">
            <a href=""><i class="fa-regular fa-circle-waveform-lines"></i></a>
          </div>
        </div>
      </div>
    </div>
      `;
  });

  mostViewedProductsData += `</div>`;

  mostViewedProducts.innerHTML = mostViewedProductsData;
  $("#most-viewed-carousel").owlCarousel({
    pagination: false,
    loop: true,
    margin: 20,
    dots: false,
    autoplay: true,
    responsive: {
      0: {
        items: 1,
      },
      700: {
        items: 2,
      },
      1000: {
        items: 3,
      },
      1300: {
        items: 4,
      },
    },
  });
}

// Brand Carousel Function
$(document).ready(function () {
  $("#brand-carousel").owlCarousel({
    pagination: false,
    loop: true,
    margin: 20,
    nav: true,
    navText: [
      '<div class="nav-btn prev-slide"><i class="fa-regular fa-chevron-left"></i></div>',
      '<div class="nav-btn next-slide"><i class="fa-regular fa-chevron-right"></i></div>'
    ],
    autoplay: true,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 3,
      },
      600: {
        items: 4,
      },
      1000: {
        items: 6,
      },
      1200: {
        items: 8,
      },
      1400: {
        items: 9,
      },
    },
  });
});

bannarProducts();
buyFromUs("top-categories");
featuredProducts("featured");
fashionProducts();
blogs("latest-post");
reviews();
mostViewedProducts();

var modal = document.querySelector(".modal");
var closeButton = document.querySelector(".close-button");

function toggleModal() {
  modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}

closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

function triggerModal() {
  toggleModal();
}