// Navbar animation && Button animation
const navEl = document.querySelector("#navbar");
const btnTop = document.getElementById("btn-back-to-top");
window.addEventListener("scroll", () => {
  if (window.scrollY >= 40) {
    navEl.classList.add("navbar-scrolled");
    btnTop.style.display = "block";
  } else if (window.scrollY < 40) {
    navEl.classList.remove("navbar-scrolled");
    btnTop.style.display = "none";
  }
});

// Navbar click active
const navLinkEls = document.querySelectorAll(".nav-link");
navLinkEls.forEach((navLinkEl) => {
  navLinkEl.addEventListener("click", () => {
    document.querySelector(".active")?.classList.remove("active");
    navLinkEl.classList.add("active");
  });
});

// Navbar scroll active
const sectionEls = document.querySelectorAll("section");
let currentSection = "home";
window.addEventListener("scroll", () => {
  sectionEls.forEach((sectionEl) => {
    if (window.scrollY >= sectionEl.offsetTop - 180) {
      currentSection = sectionEl.id;
    }
  });

  navLinkEls.forEach((navLinkEl) => {
    if (navLinkEl.href.includes(currentSection)) {
      document.querySelector(".active")?.classList.remove("active");
      navLinkEl.classList.add("active");
    }
  });
});

// Fixed navigations covering content on scroll
const navHeight = document.querySelector("#navbar").offsetHeight;
document.documentElement.style.setProperty("--scroll-padding", navHeight - 1 + "px");

// Save form value
const feedback = document.querySelectorAll("input, textarea");
feedback.forEach((element) => {
  element.addEventListener("keyup", function () {
    sessionStorage.setItem(element.name, element.value);
  });
});

// Set form value
document.addEventListener("DOMContentLoaded", function () {
  feedback.forEach((element) => {
    element.value = sessionStorage.getItem(element.name);
  });
  updateCartDisplay();
  // $('.card--float').hover(function () {
  //   $('.card--float').stop().fadeTo('fast', 0.3);
  //   $(this).stop().fadeTo('fast', 1);
  // }, function () {
  //     $('.card--float').stop().fadeTo('fast', 1);
  // });
});

const buttons = document.querySelectorAll(".card-body button");
buttons.forEach(function (button) {
  button.addEventListener("click", function (event) {
    let buttonId = event.target.id;
    addToCart(buttonId);
  });
});

let cart = [];
const products = {
  plan01: {
    name: "初階課程",
    price: 1999,
    image: "./image/plan01.jpg",
  },
  plan02: {
    name: "中階課程",
    price: 3999,
    image: "./image/plan02.jpg",
  },
  plan03: {
    name: "進階課程",
    price: 6999,
    image: "./image/plan03.jpg",
  },
};

function addToCart(productId) {
  const existingCartItem = cart.find((item) => item.id === productId);
  const { name, price, image } = products[productId];

  if (existingCartItem) {
    existingCartItem.quantity++;
  } else {
    const cartItem = {
      id: productId,
      image: image,
      name: name,
      quantity: 1,
      price: price,
    };
    cart.push(cartItem);
  }
  console.log(cart);
  updateCartDisplay();
}

const cartTable = document.querySelector("table");
const cartHeader = document.querySelector("thead");
const cartBody = document.querySelector("tbody");
const cartFooter = document.querySelector("tfoot");
const cartCount = document.querySelector(".cartCount");
const cartControls = document.querySelector(".cart-controls");

function updateCartDisplay() {
  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  cartCount.textContent = `${totalCount}`;
  cartTable.style.textAlign = "center";
  cartHeader.textContent = "";
  cartBody.textContent = "";
  cartFooter.textContent = "";
  if (cart.length === 0) {
    const emptyRow = document.createElement("tr");
    const emptyCell = document.createElement("td");
    emptyCell.colSpan = 5;
    emptyCell.textContent = "購物車目前沒有商品！";
    emptyRow.appendChild(emptyCell);
    cartBody.appendChild(emptyRow);
    cartControls.classList.add("hidden-important");
    return;
  } else {
    cartControls.classList.remove("hidden-important");
  }
  // Header
  const headerRow = document.createElement("tr");
  const columnLabels = ["商品圖片", "名稱", "數量", "價格", "刪除"];
  columnLabels.forEach((label) => {
    const headerCell = document.createElement("th");
    headerCell.textContent = label;
    headerRow.appendChild(headerCell);
  });
  cartHeader.appendChild(headerRow);
  // Body
  cart.forEach((item) => {
    const row = document.createElement("tr");
    const imageCell = document.createElement("td");
    // 新增圖片
    const imageElement = document.createElement("img");
    imageElement.src = item.image;
    imageElement.alt = item.name;
    imageElement.style.objectFit = "cover";
    imageElement.height = 100;
    imageElement.width = 100;
    imageCell.appendChild(imageElement);
    row.appendChild(imageCell);

    for (const key in item) {
      if (item.hasOwnProperty(key) && key !== "image" && key !== "id") {
        const cell = document.createElement("td");
        cell.textContent = item[key];
        row.appendChild(cell);
      }
    }
    // 新增刪除按鈕
    const deleteCell = document.createElement("td");
    const deleteButton = document.createElement("a");
    deleteButton.href = "#";
    deleteButton.textContent = "x";
    deleteButton.style.textDecoration = "none";
    deleteButton.style.color = "black";
    deleteButton.addEventListener("click", (event) => {
      event.preventDefault();
      removeFromCart(item.id);
    });
    deleteCell.appendChild(deleteButton);
    row.appendChild(deleteCell);
    cartBody.appendChild(row);
  });
  // Footer
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const borderTopStyle = "border-top: 1px solid black;";
  const row = document.createElement("tr");
  row.style.cssText = borderTopStyle;
  const cell = document.createElement("td");
  cell.setAttribute("colspan", "5");
  cell.style.textAlign = "right";
  cell.textContent = `總金額 NT$ ${totalPrice}`;
  row.appendChild(cell);
  cartFooter.appendChild(row);

  console.log(totalCount);
}

const clearCartBtn = document.querySelector(".clearCart");
clearCartBtn.addEventListener("click", clearCart);
function clearCart() {
  cart.length = 0;
  updateCartDisplay();
}

function removeFromCart(productId) {
  const index = cart.findIndex((item) => item.id === productId);
  if (index !== -1) {
    cart.splice(index, 1);
    updateCartDisplay();
  }
}
