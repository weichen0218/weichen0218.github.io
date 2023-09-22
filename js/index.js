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
    console.log(navLinkEl);
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
  // $('.card--float').hover(function () {
  //   $('.card--float').stop().fadeTo('fast', 0.3);
  //   $(this).stop().fadeTo('fast', 1);
  // }, function () {
  //     $('.card--float').stop().fadeTo('fast', 1);
  // });
});

const buttons = document.querySelectorAll(".card-body button");
let cartCount = document.querySelector(".cartCount");
let cartCountNum = parseInt(cartCount.textContent, 10);

buttons.forEach(function (button) {
  button.addEventListener("click", function (event) {
    let buttonId = event.target.id;
    cartCountNum++;
    cartCount.textContent = cartCountNum.toString();

    switch (buttonId) {
      case "plan01":
        break;
      case "plan02":
        break;
      case "plan03":
        break;
      default:
    }
  });
});
const clearCart = document.querySelector(".clearCart");
let totalPrice = document.querySelector(".totalPrice");

var table = document.getElementsByTagName("tbody")[0];
clearCart.addEventListener("click", function (event) {
  totalPrice.textContent = "總金額 NT$ 0";
  while (table.rows.length > 0) {
    table.deleteRow(0);
  }
});
