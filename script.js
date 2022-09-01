// Document
const imageContainer = document.getElementById("image-container");
const intersectionObserverTarget = document.getElementById(
  "intersection-observer"
);
const loader = document.getElementById("loader");

// Unsplash API
let loadedImages = 0;
let totalImages = 0;
const count = 10;
const apiKey = "O2q99Pw6SQmMW99zjp9f5YBUUEwfSOLqSZy75YlAUVY";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Loading Spinner
function showLoadingSpinner() {
  loader.hidden = false;
}
showLoadingSpinner();

function hideLoadingSpinner() {
  loader.hidden = true;
}

function imageLoadHandler() {
  loadedImages++;
  if (totalImages === loadedImages) {
    hideLoadingSpinner();
  }
}

// Get photos from Unsplash API

function displayPhotos(photos) {
  loadedImages = 0;
  totalImages = photos.length;
  photos
    .slice()
    .map(
      (photo) => `
<a href='${photo.links.html}' target="_blank">
<img
onLoad='imageLoadHandler()'
src="${photo.urls.regular}"
alt="${photo.alt_description}"
title="${photo.alt_description}"
/>
</a>
  `
    )
    .forEach((img) => {
      imageContainer.insertAdjacentHTML("beforeend", img);
    });

  createIntersectionObserver(imageContainer.lastElementChild);
  // hideLoadingSpinner();
}

async function getPhotos() {
  // showLoadingSpinner();
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    displayPhotos(data);
  } catch (error) {
    // Catch Error Here
  }
}

// Infinite Scroll
function createIntersectionObserver(target) {
  const infiniteScrollObserverOptions = {
    root: null,
    rootMargin: "800px",
    threshold: 1.0,
  };

  let count = 0;
  const infiniteScrollObserverHandler = function (entries, observer) {
    const [entry] = entries;
    count++;
    count > 1 &&
      entry.isIntersecting &&
      getPhotos() &&
      observer.unobserve(target) &&
      (count = 0);
  };

  const infiniteScrollObserver = new IntersectionObserver(
    infiniteScrollObserverHandler,
    infiniteScrollObserverOptions
  );
  infiniteScrollObserver.observe(target);
}

// On Load
getPhotos();
