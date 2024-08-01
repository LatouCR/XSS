const header = document.querySelector("[data-header]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  const isScrollTop = window.scrollY === 0;

  if (isScrollBottom) {
    header.style.paddingBlock = '0';
    header.style.top = '10px';
    header.style.backgroundColor = 'hsla(40, 12%, 5%, 1)';
    header.classList.add("active", "hide");
  } else if (isScrollTop) {
    header.style.paddingBlock = '40px';
    header.style.top = '10px';
    header.style.backgroundColor = 'transparent';
    header.classList.remove("hide");
  } else {
    header.style.paddingBlock = '10px';
    header.style.top = '0';
    header.style.backgroundColor = 'hsla(0, 0%, 13%, 1)';
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
};

window.addEventListener("scroll", hideHeader);

document.addEventListener('DOMContentLoaded', function() {

  /*
    Get the search query from the URL. For example:
    http://xss-example-page.nowhere/?q=Searching+for+things
  */
  var q = getQueryParameter('q');

  if (q) {

    search(q, function(error, results) {
      showQueryAndResults(q, results);
    });
  }
});

function search(q, callback) {

  // Fake results. We don't actually searching anything.
  var results = [
    'Result #1',
    'Result #2',
    'Result #3'
  ];

  callback(null, results);
}

function showQueryAndResults(q, results) {

  var resultsEl = document.querySelector('#results');
  var html = '';

  html += '<p>Your search query:</p>';
  html += '<pre>' + q + '</pre>';
  html += '<ul>';

  for (var index = 0; index < results.length; index++) {
    html += '<li>' + results[index] + '</li>';
  }

  html += '</ul>';

  resultsEl.innerHTML = html;
}

function getQueryParameter(name) {

  var pairs = window.location.search.substring(1).split('&');
  var pair;

  for (var index = 0; index < pairs.length; index++) {

    pair = pairs[index].split('=');

    if (decodeURIComponent(pair[0]) === name) {
      return decodeURIComponent(pair[1]);
    }
  }

  return false;
}