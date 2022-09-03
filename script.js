const elements = {};
function getElByID(obj) {
  for (let key in obj) {
    elements[key] = document.getElementById(obj[key]);
  }
}
getElByID({
  menuBars: "menu-bars",
  overlay: "overlay",
  nav1: "nav-1",
  nav2: "nav-2",
  nav3: "nav-3",
  nav4: "nav-4",
  nav5: "nav-5",
});

function toggleNav() {
  elements.menuBars.classList.toggle("change");

  elements.overlay.classList.toggle("overlay-active");
  if (elements.overlay.classList.contains("overlay-active")) {
    // Animate In
    elements.nav1.classList.remove("slide-out-1");
    elements.nav1.classList.add("slide-in-1");
    elements.nav2.classList.remove("slide-out-2");
    elements.nav2.classList.add("slide-in-2");
    elements.nav3.classList.remove("slide-out-3");
    elements.nav3.classList.add("slide-in-3");
    elements.nav4.classList.remove("slide-out-4");
    elements.nav4.classList.add("slide-in-4");
    elements.nav5.classList.remove("slide-out-5");
    elements.nav5.classList.add("slide-in-5");
    elements.overlay.classList.remove("overlay-slide-left");
    elements.overlay.classList.add("overlay-slide-right");
  } else {
    elements.overlay.classList.remove("overlay-slide-right");
    elements.overlay.classList.add("overlay-slide-left");
    // Animate Out
    elements.nav1.classList.remove("slide-in-1");
    elements.nav1.classList.add("slide-out-1");
    elements.nav2.classList.remove("slide-in-2");
    elements.nav2.classList.add("slide-out-2");
    elements.nav3.classList.remove("slide-in-3");
    elements.nav3.classList.add("slide-out-3");
    elements.nav4.classList.remove("slide-in-4");
    elements.nav4.classList.add("slide-out-4");
    elements.nav5.classList.remove("slide-in-5");
    elements.nav5.classList.add("slide-out-5");
  }
}

// Event Listeners

elements.menuBars.addEventListener("click", toggleNav);
elements.nav1.addEventListener("click", toggleNav);
elements.nav2.addEventListener("click", toggleNav);
elements.nav3.addEventListener("click", toggleNav);
elements.nav4.addEventListener("click", toggleNav);
elements.nav5.addEventListener("click", toggleNav);
