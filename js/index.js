/*
    01) Listing all items ==> Done
    02) Adding new items
    03) Deleting items
    04) Editing items
    05) Listing item by different parameters
    06) Searching items ==> Done
    07) Add item to cart ==> Done
    08) Remove item from cart ==> Done
    09) Login ==> Done
    10) Logout ==> Done
    11) Register ==> Done
*/

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
    nav: false,
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
  filteredData.forEach((item) => {
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
                  <input type="text" name="name" value="1" />
                  <div class="button-container">
                    <button class="up-btn" type="button" name="button">
                      <i class="fa-sharp fa-regular fa-chevron-up"></i>
                    </button>
                    <button class="up-btn" type="button" name="button">
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
              <div class="mobile-cart">
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
          <div class="question"><i class="fa-regular fa-circle-question"></i> Question</div>
        </div>
      </div>
    `;
  });

  cartegoryCarousel.innerHTML = html;
  $(`#featurred-products-carousel-${term}`).owlCarousel({
    pagination: false,
    loop: true,
    margin: 20,
    nav: false,
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
    nav: false,
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
    nav: false,
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
    nav: false,
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
    nav: false,
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
    nav: false,
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

/* Check User is Logged In or Not */
function isUserLoggedIn() {
  document.getElementById("all-products-conatiner").classList.add("d-none");
  document.getElementById("search-products-container").classList.add("d-none");
  document.getElementById("cart-products-container").classList.add("d-none");
  document
    .getElementById("wishlist-products-container")
    .classList.add("d-none");

  let loggedUserId = localStorage.getItem("loggedUserId") || false;
  let userLogin = document.getElementById("userLogin");
  let userLogout = document.getElementById("userLogout");
  let mobileUserLogin = document.getElementById("mobileUserLogin");
  let mobileUserLogout = document.getElementById("mobileUserLogout");

  // get user details from local storage
  let users = JSON.parse(localStorage.getItem("users"));
  let user = users?.find((user) => user?.id == loggedUserId);

  if (loggedUserId) {
    userLogin.innerHTML = ` <li class="list-item" style="cursor:pointer;">
                              <a> <i class="fa-regular fa-user"></i> ${user.name}</a>
                            </li>`;
    userLogout.innerHTML = ` <li class="list-item" style="cursorpointer;" onclick="handleLogout()">
                              <a> <i class="fa-regular fa-right-from-bracket"></i> Logout</a>
                            </li>`;
    mobileUserLogin.innerHTML = `
      <li class="mobile-menu-item" style="cursor:pointer;">
        <a> <i class="fa-regular fa-user"></i>${user.name}</a>
      </li>
    `;
    mobileUserLogout.innerHTML = `
      <li class="mobile-menu-item" style="cursor:pointer;" onclick="handleLogout()">
        <a> <i class="fa-regular fa-right-from-bracket"></i> Logout</a>
      </li>`;
  } else {
    userLogin.innerHTML = ` <li class="list-item" id="login-page" onclick="redirectToPage(this.id)">
                              <a href="login-signup.html"> <i class="fa-regular fa-user"></i> Login</a>
                            </li>`;
    userLogout.innerHTML = `<li class="list-item" id="register-page" onclick="redirectToPage(this.id)">
                              <a href="login-signup.html"><i class="fa-regular fa-user-plus"></i> Register</a>
                            </li>`;
    mobileUserLogin.innerHTML = `
      <li class="mobile-menu-item" id="login-page" onclick="redirectToPage(this.id)">
        <a href="login-signup.html"> <i class="fa-regular fa-user"></i>Login</a>
      </li>
    `;

    mobileUserLogout.innerHTML = `
      <li class="mobile-menu-item" id="register-page" onclick="redirectToPage(this.id)">
        <a href="login-signup.html"><i class="fa-regular fa-user-plus"></i> Register</a>
      </li>
    `;
  }
}

/* Handle Logout */
function handleLogout() {
  localStorage.removeItem("loggedUserId");
  Swal.fire({
    icon: "success",
    title: "Success",
    text: "logout Successfully!",
    confirmButtonColor: "#4285f4",
    confirmButtonText: "Ok",
  }).then(() => {
    location.reload();
  });
}

/* Redirect to Login or Register Page */
function redirectToPage(id) {
  if (id === "login-page") {
    localStorage.setItem("redirectPage", "login");
  } else if (id === "register-page") {
    localStorage.setItem("redirectPage", "register");
  }
}

/* Show Active Container Function */
function showActivePage() {
  const allProductsConatiner = document.getElementById(
    "all-products-conatiner"
  );
  const searchItemsContainer = document.getElementById(
    "search-products-container"
  );
  const cartContainer = document.getElementById("cart-products-container");
  const wishlistContainer = document.getElementById(
    "wishlist-products-container"
  );

  switch (localStorage.getItem("activeContainer")) {
    case "searchPaginationPage":
      allProductsConatiner.classList.add("d-none");
      searchItemsContainer.classList.remove("d-none");
      cartContainer.classList.add("d-none");
      wishlistContainer.classList.add("d-none");
      break;

    case "cartPaginationPage":
      allProductsConatiner.classList.add("d-none");
      searchItemsContainer.classList.add("d-none");
      cartContainer.classList.remove("d-none");
      wishlistContainer.classList.add("d-none");
      break;

    case "wishlistPaginationPage":
      allProductsConatiner.classList.add("d-none");
      searchItemsContainer.classList.add("d-none");
      cartContainer.classList.add("d-none");
      wishlistContainer.classList.remove("d-none");
      break;

    default:
      allProductsConatiner.classList.remove("d-none");
      searchItemsContainer.classList.add("d-none");
      cartContainer.classList.add("d-none");
      wishlistContainer.classList.add("d-none");
      break;
  }
}

/* ************************ Search Code Start **************************** */

// Search Product Function
async function searchProduct(searchTerm) {
  const data = await getAllProductsData();

  // combine all products in one array
  const allProducts = data["products"];

  // Find all the product with the search term
  const filteredData = allProducts.filter((item) => {
    if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return item;
    }
  });

  return filteredData;
}

// Handling Search Button Click and passing the search term to the searchProduct function
const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", async () => {
  const searchInput = document.getElementById("search-input");
  const data = await searchProduct(searchInput.value);
  localStorage.setItem("searchItems", JSON.stringify(data));
  showSearchResult(data);
});

// Show Search Result Function
function showSearchResult(products) {
  if (products.length === 0) {
    document.getElementById(
      "search-items-parent"
    ).innerHTML = `<h1>No Products Found</h1>`;
    let mainContainer = document.getElementById("main-container");
    mainContainer.style.display = "none";
    return;
  } else {
    let mainContainer = document.getElementById("main-container");
    mainContainer.style.display = "none";
    handlePagination();
  }
}

/* Handling Pagination for Search Result */
async function handlePagination(id = "page-1") {
  commonShowItems(
    "search",
    id,
    "search",
    "handleSearchLeftpagination",
    "handleSearchRightpagination",
    "handlePagination",
    "search"
  );
}

/* Handle Left Pagination for Search Result */
function handleSearchLeftpagination() {
  commonLeftPagination("searchPaginationPage", handlePagination);
}

/* Handle Right Pagination for Search Result */
function handleSearchRightpagination(totalPages) {
  commonRightPagination("searchPaginationPage", handlePagination, totalPages);
}

/* ************************ Search Code E nd**************************** */

/* ************************ All Products Code Start **************************** */

/* All Products Pagination */
async function handleAllProductsPagination(id) {
  await commonShowItems(
    "all-products",
    id,
    "all-products",
    "handleLeftpagination",
    "handleRightpagination",
    "handleAllProductsPagination",
    "allProducts"
  );
}

/* Handle Left Pagination for All Products */
function handleLeftpagination() {
  commonLeftPagination(
    "allProductsPaginationPage",
    handleAllProductsPagination
  );
}

/* Handle Right Pagination for All Products */
function handleRightpagination(totalPages) {
  commonRightPagination(
    "allProductsPaginationPage",
    handleAllProductsPagination,
    totalPages
  );
}

/* ************************ All Products Code End **************************** */

/* ************************ Cart Code Start **************************** */

/* Handle Add to Cart */
function handleAddToCart(id) {
  commonAddItems(id, "cart");
}

/* Show count of cart items */
async function showCountOfCartItems() {
  const totalPrice = await getPriceOfCartItems();
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  let cartCount = document.getElementById("cart-icon-container");
  let mobileCartCount = document.getElementById("mobile-cart-icon-container");
  if (cartItems.length > 0) {
    cartCount.innerHTML = `
    <div class="info" id="cart-info">${cartItems.length} item(s) - $${totalPrice}</div>
    <div class="my-cart" onclick="handleCartPagination()">
      <div class="cart-logo">
      <i class="fa-regular fa-cart-shopping"></i> 
      </div>
      <div class="count-badge">${cartItems.length}</div>
    </div>`;

    mobileCartCount.innerHTML = `
      <div class="cart-logo" onclick="handleCartPagination()">
      <i class="fa-regular fa-cart-shopping"></i>
      </div>
      <div class="count-badge">${cartItems.length}</div>`;
  } else {
    cartCount.innerHTML = `
    <div class="info" id="cart-info">0 item(s) - $0.00</div>
    <div class="cart-logo" onclick="handleCartPagination()">
      <i class="fa-regular fa-cart-shopping"></i>
    </div>`;

    mobileCartCount.innerHTML = `
      <div class="cart-logo" onclick="handleCartPagination()">
      <i class="fa-regular fa-cart-shopping"></i>
      </div>
      `;
  }
}

/* Get Price of Cart Items */
async function getPriceOfCartItems() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  let totalPrice = 0;

  const data = await getAllProductsData();
  const products = data["products"];
  cartItems.forEach((item) => {
    let product = products.find((product) => product.id == item);
    totalPrice += Number(product.price || product.actualPrice);
  });

  return totalPrice;
}

/* Handle Show Cart Items */
async function handleCartPagination(id = "page-1") {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  if (cartItems.length == 0) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Cart Is Empty!",
      confirmButtonColor: "#4285f4",
      confirmButtonText: "Ok",
    });
    return;
  }

  await commonShowItems(
    "cart",
    id,
    "cart",
    "handleCartLeftpagination",
    "handleCartRightpagination",
    "handleCartPagination",
    "cart"
  );
}

/* Handle Left Pagination for Cart */
function handleCartLeftpagination() {
  commonLeftPagination("cartPaginationPage", handleCartPagination);
}

/* Handle Right Pagination for Cart */
function handleCartRightpagination(totalPages) {
  commonRightPagination("cartPaginationPage", handleCartPagination, totalPages);
}

/* Remove Item from Cart */
function handleRemoveFromCart(id) {
  commonRemoveItems(id, "cart", handleCartPagination);
}

/* ************************ Cart Code End **************************** */

/* ************************ Wishlist Code Start **************************** */

/* Handle Add to Wishlist */
function handleAddToWishlist(id) {
  commonAddItems(id, "wishlist");
}

/* Handle Show Wishlist */
async function handleWishlistPagination(id = "page-1") {
  let wishlistItems = JSON.parse(localStorage.getItem("wishlistItems")) || [];

  // Check if wishlist is empty
  if (wishlistItems.length == 0) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Wishlist Is Empty!",
      confirmButtonColor: "#4285f4",
      confirmButtonText: "Ok",
    });
    return;
  }

  // Show wishlist items
  commonShowItems(
    "wishlist",
    id,
    "wishlist",
    "handleWishlistLeftpagination",
    "handleWishlistRightpagination",
    "handleWishlistPagination",
    "wishlist"
  );
}

/* Handle Left Pagination for Wishlist */
function handleWishlistLeftpagination() {
  commonLeftPagination("wishlistPaginationPage", handleWishlistPagination);
}

/* Handle Right Pagination for Wishlist */
function handleWishlistRightpagination(totalPages) {
  commonRightPagination(
    "wishlistPaginationPage",
    handleWishlistPagination,
    totalPages
  );
}

/* Handle Remove form Wishlist */
function handleRemoveFromWishlist(id) {
  commonRemoveItems(id, "wishlist", handleWishlistPagination);
}

/* ************************ Wishlist Code End **************************** */

/* ************************ Common Modules Code Start **************************** */

/* Remove item from Array at a specific Location */
function removeElt(arr, elt) {
  const index = arr.indexOf(elt);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

/* Common Show Items */
function commonAddItems(id, type) {
  let items = JSON.parse(localStorage.getItem(`${type}Items`)) || [];
  if (items.includes(id)) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: `Product already in ${type}!`,
      confirmButtonColor: "#4285f4",
      confirmButtonText: "OK",
    });
    return;
  }

  items.push(id);
  localStorage.setItem(`${type}Items`, JSON.stringify(items));
  Swal.fire({
    icon: "success",
    title: "Success",
    text: `Product added to ${type} successfully!`,
    confirmButtonColor: "#4285f4",
    confirmButtonText: "OK",
  });

  if (type === "cart") {
    showCountOfCartItems();
  }
}

/* Common Show Items */
function commonRemoveItems(id, type, handlePagination) {
  let items = JSON.parse(localStorage.getItem(`${type}Items`)) || [];
  localStorage.setItem(`${type}Items`, JSON.stringify(removeElt(items, id)));

  if (type === "cart") {
    showCountOfCartItems();
  }

  if (items.length === 0) {
    Swal.fire({
      icon: "success",
      title: "Success",
      text: `Product removed from ${type} successfully!`,
      confirmButtonColor: "#4285f4",
      confirmButtonText: "OK",
    }).then(() => {
      location.href = "index.html";
    });
  } else {
    Swal.fire({
      icon: "success",
      title: "Success",
      text: `Product removed from ${type} successfully!`,
      confirmButtonColor: "#4285f4",
      confirmButtonText: "OK",
    }).then(() => {
      handlePagination();
    });
  }
}

/* Common Pagination */
async function commonShowItems(
  type,
  id = "page-1",
  pagination,
  leftPagination,
  rightPagination,
  mainPaginationFunction,
  paginationPage
) {
  let data = await getAllProductsData();
  let products = data["products"];

  await commonPagination(
    type,
    id,
    pagination,
    leftPagination,
    rightPagination,
    mainPaginationFunction
  );

  let itemsArr = JSON.parse(localStorage.getItem(`${pagination}-pagination`));
  let page = itemsArr.find((item) => item.page == Number(id.split("-")[1]));
  localStorage.setItem(
    `${paginationPage}PaginationPage`,
    Number(id.split("-")[1])
  );
  localStorage.setItem("activeContainer", `${pagination}PaginationPage`);

  let itemsContainer;
  let allItemsContainer;
  if (type === "all-products") {
    itemsContainer = document.getElementById(`${pagination}-conatiner`);
    allItemsContainer = document.getElementById(`${pagination}`);
  } else if (type === "cart" || type === "wishlist" || type === "search") {
    itemsContainer = document.getElementById(
      `${pagination}-products-container`
    );
    allItemsContainer = document.getElementById(`${pagination}-products`);
  }

  let itemsItems = "";
  itemsContainer.classList.remove("d-none");
  allItemsContainer.style.marginTop = "16px";
  allItemsContainer.style.marginBottom = "16px";
  if (type === "all-products" || type === "search") {
    Array.from(page.pageProduct).forEach((item) => {
      itemsItems += `
    <div class="item">
      <div class="image">
        <img src=${item.img} />
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
            <span>$ ${item.price || item.actualPrice || 200}</span>
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
          <div class="bottom-right" title="Add to favourite">
            <div id="${
              item.id
            }" class="wishlist" onclick="handleAddToWishlist(this.id)">
              <li class="list-item">
                <a href=""><i class="fa-solid fa-heart"></i></a>
              </li>
            </div>
          </div>
        </div>
      </div>
    </div>`;
    });
  } else if (type === "cart" || type === "wishlist") {
    Array.from(page.pageProduct).forEach((item) => {
      let product = products.find((product) => product.id == item);
      itemsItems += `
    <div class="item">
      <div class="image">
        <img src=${product.img} />
      </div>
      <div class="details">
        <div class="name">
          <span>${product.name}</span>
        </div>
        <div class="price">
          <div class="current">
            <span>$ ${product.price || product.actualPrice}</span>
          </div>
        </div>
        <div class="bottom flex-between-center">
          <div class="bottom-left">
            <div class="add-to-cart" id="${
              product.id
            }" onclick="handleRemoveFromCart(this.id)">
              Remove from cart
            </div>
          </div>
          <div class="bottom-right" title="Add to favourite">
            <div id="${
              item.id
            }" class="wishlist" onclick="handleWishlistPagination(this.id)">
              <li class="list-item">
                <a href=""><i class="fa-regular fa-heart"></i></a>
              </li>
            </div>
          </div>
        </div>
      </div>
    </div>`;
    });
  }

  allItemsContainer.innerHTML = itemsItems;
  let activePgae = document.getElementById(
    `page-${localStorage.getItem(`${paginationPage}PaginationPage`)}`
  );
  activePgae.classList.add("active");

  let mainContainer = document.getElementById("main-container");
  mainContainer.style.display = "none";
  showActivePage();
}

/* common pagination function */
async function commonPagination(
  type,
  id = "page-1",
  pagination,
  leftPagination,
  rightPagination,
  mainPaginationFunction
) {
  let data = await getAllProductsData();
  let allProductsData = data["products"];

  let arr = [];
  let paginationConatiner = document.getElementById(
    `${pagination}-pagination-container`
  );

  let pages;
  switch (type) {
    case "all-products":
      pages = Math.ceil(allProductsData.length / 8);
      break;

    case "cart":
      let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      pages = Math.ceil(cartItems.length / 8);
      break;

    case "wishlist":
      let wishlistItems =
        JSON.parse(localStorage.getItem("wishlistItems")) || [];
      pages = Math.ceil(wishlistItems.length / 8);
      break;

    case "search":
      let searchItems = JSON.parse(localStorage.getItem("searchItems")) || [];
      pages = Math.ceil(searchItems.length / 8);
      break;
  }

  let paginationHtml = `<div class="pagination"><a class="leftnav" onclick="${leftPagination}()" ><</a>
    `;
  for (let i = 1; i <= pages; i++) {
    let paginationProducts;
    switch (type) {
      case "all-products":
        paginationProducts = {
          page: i,
          pageProduct: allProductsData.slice(i * 8 - 8, i * 8),
        };
        break;

      case "cart":
        let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        paginationProducts = {
          page: i,
          pageProduct: cartItems.slice(i * 8 - 8, i * 8),
        };
        break;

      case "wishlist":
        let wishlistItems =
          JSON.parse(localStorage.getItem("wishlistItems")) || [];
        paginationProducts = {
          page: i,
          pageProduct: wishlistItems.slice(i * 8 - 8, i * 8),
        };
        break;

      case "search":
        let searchItems = JSON.parse(localStorage.getItem("searchItems")) || [];
        paginationProducts = {
          page: i,
          pageProduct: searchItems.slice(i * 8 - 8, i * 8),
        };
        break;
    }

    arr.push(paginationProducts);
    localStorage.setItem(`${pagination}-pagination`, JSON.stringify(arr));

    paginationHtml += `
          <a style="cursor:pointer" id="page-${paginationProducts.page}" onclick="${mainPaginationFunction}(this.id)" >${paginationProducts.page}</a>
        `;
  }
  paginationHtml += `<a onclick="${rightPagination}(${pages})" class="rightnav" >></a></div>`;
  paginationConatiner.innerHTML = paginationHtml;
}

/* common left pagination function */
function commonLeftPagination(p, pagination) {
  let page = localStorage.getItem(p);
  if (page == 1) {
    return;
  } else {
    pagination(`page-${Number(page) - 1}`);
  }
}

/* common right pagination function */
function commonRightPagination(p, pagination, totalPages) {
  let page = localStorage.getItem(p);
  if (page == totalPages) {
    return;
  } else {
    pagination(`page-${Number(page) + 1}`);
  }
}

/* ************************ Common Modules Code End **************************** */

bannarProducts();
buyFromUs("top-categories");
featuredProducts("featured");
fashionProducts();
blogs("latest-post");
reviews();
mostViewedProducts();
isUserLoggedIn();
showCountOfCartItems();