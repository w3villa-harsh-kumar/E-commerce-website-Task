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

/* Check User is Logged In or Not */
function isUserLoggedIn() {
  document.getElementById("all-products-conatiner").classList.add("d-none");
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
                              <a> <i class="fa-regular fa-user"></i> <span style="font-size: 11px;">${user.name} </span></a>
                            </li>`;
    userLogout.innerHTML = ` <li class="list-item" style="cursorpointer;" onclick="handleLogout()">
                              <a> <i class="fa-regular fa-right-from-bracket"></i> <span style="font-size: 11px;">Logout </span></a>
                            </li>`;
    mobileUserLogin.innerHTML = `
      <li class="mobile-menu-item" style="cursor:pointer;">
        <a> <i class="fa-regular fa-user"></i> <span style="font-size: 11px;">${user.name} </span></a>
      </li>
    `;
    mobileUserLogout.innerHTML = `
      <li class="mobile-menu-item" style="cursor:pointer;" onclick="handleLogout()">
        <a> <i class="fa-regular fa-right-from-bracket"></i> <span style="font-size: 11px;">Logout </span></a>
      </li>`;
  } else {
    userLogin.innerHTML = ` <li class="list-item" id="login-page" onclick="redirectToPage(this.id)">
                              <a href="login-signup.html"> <i class="fa-regular fa-user"></i> <span style="font-size: 11px;">Login</span></a>
                            </li>`;
    userLogout.innerHTML = `<li class="list-item" id="register-page" onclick="redirectToPage(this.id)">
                              <a href="login-signup.html"><i class="fa-regular fa-user-plus"></i> <span style="font-size: 11px;">Register</span></a>
                            </li>`;
    mobileUserLogin.innerHTML = `
      <li class="mobile-menu-item" id="login-page" onclick="redirectToPage(this.id)">
        <a href="login-signup.html"> <i class="fa-regular fa-user"></i><span style="font-size: 11px;">Login</span></a>
      </li>
    `;

    mobileUserLogout.innerHTML = `
      <li class="mobile-menu-item" id="register-page" onclick="redirectToPage(this.id)">
        <a href="login-signup.html"><i class="fa-regular fa-user-plus"></i> <span style="font-size: 11px;">Register</span></a>
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
function showActivePage(searchTerm="") {
  const allProductsConatiner = document.getElementById(
    "all-products-conatiner"
  );
  const cartContainer = document.getElementById("cart-products-container");
  const wishlistContainer = document.getElementById(
    "wishlist-products-container"
  );

  console.log(localStorage.getItem("activeContainer"))

  switch (localStorage.getItem("activeContainer")) {
    case "search-page":
      location.href = "./search.html?search=" + searchTerm;
      break;

    case "cartPaginationPage":
      allProductsConatiner.classList.add("d-none");
      cartContainer.classList.remove("d-none");
      wishlistContainer.classList.add("d-none");
      break;

    case "wishlistPaginationPage":
      allProductsConatiner.classList.add("d-none");
      cartContainer.classList.add("d-none");
      wishlistContainer.classList.remove("d-none");
      break;

    default:
      allProductsConatiner.classList.remove("d-none");
      cartContainer.classList.add("d-none");
      wishlistContainer.classList.add("d-none");
      break;
  }
}

/* ************************ Search Code Start **************************** */


// Handling Search Button Click and passing the search term to the searchProduct function
const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", handleSearch);

function handleSearch() {
  const searchInput = document.getElementById("search-input");
  localStorage.setItem("activeContainer", "search-page");
  showActivePage(searchInput.value);
}

function handleMobileSearch() {
  const searchInput = document.getElementById("search-mobile-input");
  localStorage.setItem("activeContainer", "search-page");
  showActivePage(searchInput.value);
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
                <i class="fa-solid fa-heart"></i>
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
                <i class="fa-regular fa-heart"></i>
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
      pages = Math.ceil(allProductsData.length / 6);
      break;

    case "cart":
      let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      pages = Math.ceil(cartItems.length / 6);
      break;

    case "wishlist":
      let wishlistItems =
        JSON.parse(localStorage.getItem("wishlistItems")) || [];
      pages = Math.ceil(wishlistItems.length / 6);
      break;

    case "search":
      let searchItems = JSON.parse(localStorage.getItem("searchItems")) || [];
      pages = Math.ceil(searchItems.length / 6);
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
          pageProduct: allProductsData.slice(i * 6 - 6, i * 6),
        };
        break;

      case "cart":
        let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        paginationProducts = {
          page: i,
          pageProduct: cartItems.slice(i * 6 - 6, i * 6),
        };
        break;

      case "wishlist":
        let wishlistItems =
          JSON.parse(localStorage.getItem("wishlistItems")) || [];
        paginationProducts = {
          page: i,
          pageProduct: wishlistItems.slice(i * 6 - 6, i * 6),
        };
        break;

      case "search":
        let searchItems = JSON.parse(localStorage.getItem("searchItems")) || [];
        paginationProducts = {
          page: i,
          pageProduct: searchItems.slice(i * 6 - 6, i * 6),
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

isUserLoggedIn();
showCountOfCartItems();