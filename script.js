// AOS.js
AOS.init({
  duration: 1500,
  delay: 200,
  once: false,
  mirror: false,
});

// Navigation Script
function toggleNavbar(collapseID) {
  document.getElementById(collapseID).classList.toggle("hidden");
  document.getElementById(collapseID).classList.toggle("block");
}
