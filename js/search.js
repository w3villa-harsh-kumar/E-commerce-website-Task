let products = [];

// get the search from url
const urlParams = new URLSearchParams(window.location.search);
const searchTerm = urlParams.get("search");

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

// Show Search Result Function
async function showSearchResult(viewType) {
  products = await searchProduct(searchTerm);
  const searchInput = document.getElementById("search-input");
  const searchQueryNameContainer = document.getElementById("search-query-name");
  const searchQueryNameInput = document.getElementById(
    "search-query-name-input"
  );
  searchInput.value = searchTerm;
  searchQueryNameContainer.innerHTML = '"' + searchTerm + '"';
  searchQueryNameInput.value = searchTerm;
  searchInput.value = searchTerm;

  const arr = [];
  const pages = Math.ceil(products.length / 6);
  localStorage.setItem("pages", pages);
  for (let i = 1; i <= pages; i++) {
    let paginationProducts = {
      page: i,
      pageProduct: products.slice(i * 6 - 6, i * 6),
      viewType: viewType,
    };

    arr.push(paginationProducts);
    localStorage.setItem("pagination", JSON.stringify(arr));
  }

  if (products.length === 0) {
    const searchProducts = document.getElementById("search-products");
    searchProducts.innerHTML = `<h1>No Products Found</h1>`;
    searchProducts.classList.add("no-products-found");
    searchProducts.classList.remove("search-products-grid");
    return;
  } else {
    handlePagination((id = "page-1"), viewType);
  }
}

// Handling Pagination for Search Result
function handlePagination(id = "page-1") {
  console.log(id);
  let paginationConatiner = document.getElementById(
    "search-pagination-container"
  );
  let pages = localStorage.getItem("pages");
  let pagination = `<div class="pagination"><a class="leftnav" onclick="handleSearchLeftpagination()" ><</a>
      `;
  for (let i = 1; i <= pages; i++) {
    pagination += `
      <a style="cursor:pointer" id="page-${i}" onclick="handlePagination(this.id)" >
        ${i}
      </a>
        `;
  }
  pagination += `<a onclick="handleSearchRightpagination(${pages})" class="rightnav" >></a></div>`;
  paginationConatiner.innerHTML = pagination;

  console.log(id);
  let itemsArr = JSON.parse(localStorage.getItem("pagination"));
  let page = itemsArr.find(
    (item) => Number(item.page) == Number(id.split("-")[1])
  );
  localStorage.setItem("paginationPage", Number(id.split("-")[1]));
  localStorage.setItem("activeContainer", "search-page");

  let searchItemsContainer = document.getElementById("search-products");
  searchItemsContainer.style.marginTop = "16px";
  searchItemsContainer.style.marginBottom = "16px";

  let searchItems = "";
  page.pageProduct.forEach((item, index) => {
    let type = page.viewType;
    searchItems += `
    <div class="item" index="${index}">
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
    ${
      type === "grid"
        ? `
      <div class="gray-strip">
      <div class="company-name">${item.company || "Apple"}</div>
      <div class="modal">Modal ${item?.id || 23}</div>
    </div>`
        : ""
    }
    <div class="details">
    ${
      type === "list"
        ? `
      <div class="brand-strip">
      <div class="brand">Brand: <span>${item.company || "Apple"}</span></div>
      <div class="modal">Model: Product ${item?.id || 23}</div>
    </div>
    `
        : ""
    }
      <div class="name">
        <span>${item.name}</span>
      </div>
      ${type === "list"? `<div class="description">
      ${item.description}
      </div>
      `: ""
      }
      <div class="price">
        <div class="discount">
          <span>$${item.discountedPrice || item.price - 100}</span>
        </div>
        <div class="current">
          <span>$${item.actualPrice || item.price}</span>
        </div>
      </div>
      ${
        type === "list"
          ? `<div class="tax">
                                                    <span>Ex Tax: $100</span>
                                                </div>`
          : ""
      }
      <div class="bottom ${
        type === "grid" ? "flex-between-center" : "flex-start-center"
      }">
        <div class="${type === "grid" ? "left-cont" : "left-bottom-part"}">
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
          ${type==="list" ? `<i class="fa-regular fa-cart-shopping"></i>` : ""} Add to cart
          </div>
          <div class="mobile-cart">
            <a href=""><i class="fa-regular fa-cart-shopping"></i></a>
          </div>
        </div>
        ${type === "grid" ? `<div class="right-cont">` : ""}
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
        ${type === "grid" ? `</div>` : ""}
      </div>
      ${
        type === "list"
          ? `<div class="gray-strip-list">
        <div class="buy-now"><i class="fa-regular fa-circle-dollar"></i> Buy Now</div>
        <div class="question"><i class="fa-regular fa-circle-question"></i> Question</div>
      </div>`
          : ""
      }
    </div>
    ${
      type === "grid"
        ? `    <div class="gray-strip">
      <div class="buy-now"><i class="fa-regular fa-circle-dollar"></i> Buy Now</div>
      <div class="question"><i class="fa-regular fa-circle-question"></i> Question</div>
    </div>`
        : ""
    }
  </div>`;
  });

  searchItemsContainer.innerHTML = searchItems;
  let activePage = document.getElementById(
    `page-${localStorage.getItem("paginationPage")}`
  );
  activePage.classList.add("active");
  // console.log(activePage);\
  localStorage.setItem("activeContainer", "search-page");
}

/* Handle Left Pagination for Search Result */
function handleSearchLeftpagination() {
  commonLeftPagination("searchPaginationPage", handlePagination);
}

/* Handle Right Pagination for Search Result */
function handleSearchRightpagination(totalPages) {
  commonRightPagination("searchPaginationPage", handlePagination, totalPages);
}

function changeView(type = "grid") {
  const searchItemViewContainer = document.getElementById(
    "search-item-view-container"
  );
  const searchProductMainConatiner = document.getElementById("search-products");
  if (type === "grid") {
    searchProductMainConatiner.classList.add("search-products-grid");
    searchProductMainConatiner.classList.remove("search-products-list");
    searchItemViewContainer.classList.add("show-grid");
    searchItemViewContainer.classList.remove("show-list");
  } else {
    searchProductMainConatiner.classList.add("search-products-list");
    searchProductMainConatiner.classList.remove("search-products-grid");
    searchItemViewContainer.classList.add("show-grid");
    searchItemViewContainer.classList.remove("show-list");
  }
  showSearchResult(type);
}

showSearchResult("grid");
