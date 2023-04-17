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

// If dropdown is open and user clicks outside of it, close it
window.onclick = function (event) {
  if (!event.target.matches(".dropdown__container")) {
    var dropdowns = document.getElementsByClassName("dropdown");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.style.display === "block") {
        openDropdown.style.display = "none";
        openDropdown.previousElementSibling.innerHTML = `
                <i class="fa fa-angle-down" aria-hidden="true"></i>
                `;
      }
    }
  }
}

// Hide and show mobile search
let mobileSearchInput = document.getElementById("mobile-search-input");
let mobileSearchButton = document.getElementById("submit-icon");
let mobileSearchIcon = document.getElementById("mobile-search-icon");

mobileSearchIcon.addEventListener("click", () => {
  mobileSearch();
})

function mobileSearch() {
  if (Array.from(mobileSearchInput.classList).includes("d-none")) {
    mobileSearchInput.classList.remove("d-none");
    mobileSearchButton.classList.remove("d-none");
  }
  else {
    mobileSearchInput.classList.add("d-none");
    mobileSearchButton.classList.add("d-none");
  }
}

// Make Quantity Input Number Functional
const handleQuantityUpButton = (self) => {
  let quantity = document.getElementById(self.parentElement.parentElement.firstElementChild.id);
  quantity.value = parseInt(quantity.value) + 1;
}

const handleQuantityDownButton = (self) => {
  let quantity = document.getElementById(self.parentElement.parentElement.firstElementChild.id);
  if (quantity.value > 1) {
    quantity.value = parseInt(quantity.value) - 1;
  }
}
