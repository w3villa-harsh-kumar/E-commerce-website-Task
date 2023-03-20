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
            item?.tags[0]?.color || "green"
          };">
            <span>${item?.tags[0]?.tag || "free"}</span>
          </div>
          <div class="red-strip product-strip" style="background-color: ${
            item?.tags[1]?.color || "red"
          };">
            <span>${item?.tags[1]?.tag || "new"}</span>
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
              <span>${item.discountedPrice}</span>
            </div>
            <div class="current">
              <span>${item.actualPrice}</span>
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
              <div class="add-to-cart">
                Add to cart
              </div>
              <div class="mobile-cart">
                <a href=""><i class="fa-regular fa-cart-shopping"></i></a>
              </div>
            </div>
            <div class="right">
              <div class="wishlist">
                <li class="list-item">
                  <a href=""><i class="fa-regular fa-heart"></i></a>
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
        item?.tags[0]?.color || "green"
      };">
        <span>${item?.tags[0]?.tag || "free"}</span>
      </div>
      <div class="red-strip product-strip" style="background-color: ${
        item?.tags[1]?.color || "red"
      };">
        <span>${item?.tags[1]?.tag || "new"}</span>
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
          <div class="add-to-cart">
            Add to cart
          </div>
        </div>
        <div class="bottom-right">
          <div class="wishlist">
            <li class="list-item">
              <a href=""><i class="fa-regular fa-heart"></i></a>
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

// Search Product Function
async function searchProduct(searchTerm) {
  let data = await getAllProductsData();

  // combine all products in one array
  let allProducts = Object.values(data["products"]).flat();

  // Find all the product with the search term
  let filteredData = allProducts.filter((item) => {
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
  let data = await searchProduct(searchInput.value);
  showSearchResult(data);
});

function showSearchResult(products) {
  let searchItemsContainer = document.getElementById("search-items-container");

  let searchItems = "";
  Array.from(products).forEach((item, index) => {
    searchItems += `
    <div class="item" id="${index}">
    <div class="image">
      <img
        src=${item.img} />
      <div class="green-strip product-strip" style="background-color: ${
        item?.tags[0]?.color || "green"
      };">
        <span>${item?.tags[0]?.tag || "free"}</span>
      </div>
      <div class="red-strip product-strip" style="background-color: ${
        item?.tags[1]?.color || "red"
      };">
        <span>${item?.tags[1]?.tag || "new"}</span>
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
          <span>$ ${item.price || 200}</span>
        </div>
      </div>
      <div class="bottom flex-between-center">
        <div class="bottom-left">
          <div class="add-to-cart">
            Add to cart
          </div>
        </div>
        <div class="bottom-right">
          <div class="wishlist">
            <li class="list-item">
              <a href=""><i class="fa-regular fa-heart"></i></a>
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
    
    // let arr = []
    // let page = Math.ceil(Array.from(products).length / 6);

    // let pagination = document.getElementById("pagination");
    // pagination.innerHTML = "";
    // for (let i = 1; i <= page; i++) {
    //   let paginationProducts = {
    //     page: i,
    //     pageProduct: Array.from(products).slice(i * 6 - 6, i * 6)
    //   }

    //   arr.push(paginationProducts)
    //   localStorage.setItem("pagination", JSON.stringify(arr))

    //   pagination.innerHTML += `
    //   <li class="list-item">
    //     <a href="#" class="page-link">${paginationProducts.page}</a>
    //   </li>
    //   `;
    // }

    

  });

  searchItemsContainer.innerHTML = searchItems;
  let mainContainer = document.getElementById("main-container");
  mainContainer.style.display = "none";
}

bannarProducts();
buyFromUs("top-categories");
featuredProducts("featured");
fashionProducts();
blogs("latest-post");
reviews();
mostViewedProducts();

// Go to top Functionality
let goToTop = document.getElementById("top");
window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    goToTop.style.display = "flex";
    goToTop.style.transition = "all .6s ease-in-out";
  } else {
    goToTop.style.display = "none";
    goToTop.style.transition = "all .6s ease-in-out";
  }
});

// Handling Categories Lists
function handleClick(id) {
  buyFromUs(id);
  let currentActive = document.getElementById(id);
  let categoriesList1 = document.getElementById("categories-list1");
  categoryListWorking(categoriesList1.firstElementChild, id, currentActive, 1);
}

function handleClick1(id) {
  featuredProducts(id);
  let currentActive = document.getElementById(id);
  let categoriesList2 = document.getElementById("categories-list2");
  categoryListWorking(categoriesList2.firstElementChild, id, currentActive, 2);
}
function handleClick2(id) {
  blogs(id);
  let currentActive = document.getElementById(id);
  let categoriesList3 = document.getElementById("categories-list3");
  categoryListWorking(categoriesList3.firstElementChild, id, currentActive, 3);
}

// Category List Working Function
function categoryListWorking(firstChild, id, currentActive, num) {
  if (Array.from(firstChild.classList).includes("active") === true) {
    firstChild.classList.remove("active");
    currentActive.classList.add("active");
    localStorage.setItem(`recentActiveID-${num}`, id);
  } else {
    let recentActive = document.getElementById(
      localStorage.getItem(`recentActiveID-${num}`)
    );
    recentActive.classList.remove("active");
    currentActive.classList.add("active");
    localStorage.setItem(`recentActiveID-${num}`, id);
  }
}

// Sticky Navbar
let tag1 = document.getElementById("tag1");
let tag2 = document.getElementById("tag2");
window.onscroll = function () {
  myFunction();
};

var navbar = document.getElementById("header-bottom");
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
    tag1.style.display = "none";
    tag2.style.display = "none";
    navbar.style.transform = "all .5s ease-in-out";
  } else {
    navbar.classList.remove("sticky");
    tag1.style.display = "block";
    tag2.style.display = "block";
    navbar.style.transform = "all .5s ease-in-out";
  }
}

// DropDown Handling Code
let dropdownContainer = document.getElementById("dropdown__container");
let dropdownContainer1 = document.getElementById("dropdown__container1");
let dropdownContainer2 = document.getElementById("dropdown__container2");
let dropdownContainer3 = document.getElementById("dropdown__container3");
let dropdownContainer4 = document.getElementById("dropdown__container4");
let iconContainer = document.getElementById("icon");
let iconContainer1 = document.getElementById("icon1");
let iconContainer2 = document.getElementById("icon2");
let iconContainer3 = document.getElementById("icon3");
let iconContainer4 = document.getElementById("icon4");

dropdownContainer.addEventListener("click", () => {
  dropdownFunction(dropdown, iconContainer);
});
dropdownContainer1.addEventListener("click", () => {
  dropdownFunction(dropdown1, iconContainer1);
});
dropdownContainer2.addEventListener("click", () => {
  dropdownFunction(dropdown2, iconContainer2);
});
dropdownContainer3.addEventListener("click", () => {
  dropdownFunction(dropdown3, iconContainer3);
});
dropdownContainer4.addEventListener("click", () => {
  dropdownFunction(dropdown4, iconContainer4);
});

function dropdownFunction(dropdown, iconContainer) {
  if (dropdown.style.display === "none" || dropdown.style.display === "") {
    dropdown.style.display = "block";
    iconContainer.innerHTML = `
            <i class="fa fa-angle-up" aria-hidden="true"></i>
            `;
  } else {
    dropdown.style.display = "none";
    iconContainer.innerHTML = `
            <i class="fa fa-angle-down" aria-hidden="true"></i>
            `;
  }
}

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

function isUserLoggedIn() {
  let loggedUserId = localStorage.getItem("loggedUserId") || false;
  let userLogin = document.getElementById("userLogin");
  let userLogout = document.getElementById("userLogout");

  // get user details from local storage
  let users = JSON.parse(localStorage.getItem("users"));
  let user = users?.find((user) => user?.id == loggedUserId);

  if (loggedUserId) {
    userLogin.innerHTML = ` <li class="list-item" style="cursorpointer;">
                              <a> <i class="fa-regular fa-user"></i> ${user.name}</a>
                            </li>`;
    userLogout.innerHTML = ` <li class="list-item" style="cursorpointer;" onclick="handleLogout()">
                              <a> <i class="fa-regular fa-right-from-bracket"></i> Logout</a>
                            </li>`;
  } else {
    userLogin.innerHTML = ` <li class="list-item" id="login-page" onclick="redirectToPage(this.id)">
                              <a href="login-signup.html"> <i class="fa-regular fa-user"></i> Login</a>
                            </li>`;
    userLogout.innerHTML = `<li class="list-item" id="register-page" onclick="redirectToPage(this.id)">
                              <a href="login-signup.html"><i class="fa-regular fa-user-plus"></i> Register</a>
                            </li>`;
  }
}

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

function redirectToPage(id) {
  if (id === "login-page") {
    localStorage.setItem("redirectPage", "login");
  } else if (id === "register-page") {
    localStorage.setItem("redirectPage", "register");
  }
}

isUserLoggedIn();

