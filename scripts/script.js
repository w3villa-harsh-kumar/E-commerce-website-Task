async function getData(url){
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

async function bannarProducts() {
  let data = await getData("./data/bannarProducts.json");
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
    `
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


async function fashionProducts() {
  let data = await getData("./data/fashionProducts.json");
  const featuredCategoryCarousel = document.getElementById(
    "featurred-category-carousel"
  );

  let featuredCategoryCarouselData = "";
  Array.from(data["fashionProducts"]).forEach((item, index) => {
    featuredCategoryCarouselData += `
    <div class="item" id="${index}">
    <div class="image">
      <img
        src=${item.img} />
      <div class="green-strip product-strip" style="background-color: ${item?.tags[0]?.color || "green"};">
        <span>${item?.tags[0]?.tag || "free"}</span>
      </div>
      <div class="red-strip product-strip" style="background-color: ${item?.tags[1]?.color || "red"};">
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
    },
  });
}

async function reviews() {
  let data = await getData("./data/peopleReview.json")
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
        items: 3
      }
    },
  });
}

async function mostViewedProducts() {
  const data = await getData("./data/mostViewedProducts.json");
  const mostViewedProducts = document.getElementById("most-viewed-products");

  let mostViewedProductsData = `<div id="most-viewed-carousel" class="owl-carousel owl-theme">`;
  Array.from(data["mostViewedProducts"]).forEach((item, index) => {
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
      }
    },
  });

}

bannarProducts();
fashionProducts();
buyFromUs("top-categories");
featuredProducts("featured");
blogs("latest-post");
reviews();
mostViewedProducts();