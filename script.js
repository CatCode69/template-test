const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById("nav");
const toggleIcon = document.getElementById("toggle-icon");
const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const image3 = document.getElementById("image3");
const textBox = document.getElementById("text-box");

// Theme and Local Storage
(function getSavedTheme() {
  if (localStorage.getItem("theme") === "light") return;
  if (localStorage.getItem("theme") === "dark") {
    toggleSwitch.checked = true;
    darkMode();
  }
})();

// Dark Mode Styles
function setImagesTheme(theme) {
  image1.src = `img/undraw_proud_coder_${theme}.svg`;
  image2.src = `img/undraw_feeling_proud_${theme}.svg`;
  image3.src = `img/undraw_conceptual_idea_${theme}.svg`;
}

function darkMode() {
  localStorage.setItem("theme", "dark");

  document.documentElement.setAttribute("data-theme", "dark");

  nav.style.backgroundColor = "rgb(0 0 0 / 50%)";
  textBox.style.backgroundColor = "rgb(255 255 255 / 50%)";
  toggleIcon.firstElementChild.textContent = "Dark Mode";
  toggleIcon.lastElementChild.classList.replace("fa-sun", "fa-moon");
  setImagesTheme("dark");
}

function lightMode() {
  localStorage.setItem("theme", "light");

  document.documentElement.setAttribute("data-theme", "light");

  nav.style.backgroundColor = "rgb(255 255 255 / 50%)";
  textBox.style.backgroundColor = "rgb(0 0 0 / 50%)";
  toggleIcon.firstElementChild.textContent = "Light Mode";
  toggleIcon.lastElementChild.classList.replace("fa-moon", "fa-sun");
  setImagesTheme("light");
}

// Switch Theme Dynamically
function switchTheme(e) {
  if (e.target.checked) {
    darkMode();
  } else {
    lightMode();
  }
}

// Event Listener
toggleSwitch.addEventListener("change", switchTheme);
