const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Get Quotes From API

let apiQuotes;

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
function removeLoadingSpinner() {
  quoteContainer.hidden = false;
  quoteContainer.classList.remove("no-display");
  loader.hidden = true;
}

// Show New Quote
function newQuote() {
  showLoadingSpinner();
  // Pick a random quote from apiQuotes araay
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  authorText.textContent = quote.author ? quote.author : "Unknown";

  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  // Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  removeLoadingSpinner();
}

async function getQuotes() {
  showLoadingSpinner();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch("https://type.fit/api/quotes");
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {}
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "");
}

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// on Load
getQuotes();
