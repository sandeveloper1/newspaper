const newspapersUrl = './newspapers.json';

// Fetch and display newspapers
async function loadNewspapers() {
  const response = await fetch(newspapersUrl);
  const newspapers = await response.json();
  displayNewspapers(newspapers, document.getElementById('newspaper-list'));
}

// Display a list of newspapers
function displayNewspapers(newspapers, container) {
  container.innerHTML = newspapers.map((news, index) => `
    <div class="newspaper">
      <img src="${news.thumbnail || './assets/placeholder.png'}" alt="${news.name}">
      <h2>${news.name}</h2>
      <a href="${news.url}" target="_blank">Visit Website</a>
      <button onclick="toggleFavorite(${index})">
        ${isFavorite(index) ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  `).join('');
}

// Manage favorites
function toggleFavorite(index) {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  if (favorites.includes(index)) {
    localStorage.setItem('favorites', JSON.stringify(favorites.filter(i => i !== index)));
  } else {
    favorites.push(index);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
  loadNewspapers(); // Update UI
}

function isFavorite(index) {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  return favorites.includes(index);
}

// Initialize the app
if (location.pathname.endsWith('index.html')) loadNewspapers();
if (location.pathname.endsWith('favorites.html')) {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  fetch(newspapersUrl)
    .then(response => response.json())
    .then(newspapers => displayNewspapers(favorites.map(i => newspapers[i]), document.getElementById('favorites-list')));
}

// Add newspaper
if (location.pathname.endsWith('add-newspaper.html')) {
  document.getElementById('add-newspaper-form').addEventListener('submit', event => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const url = document.getElementById('url').value;
    const thumbnail = document.getElementById('thumbnail').value || './assets/placeholder.png';
    const newspapers = JSON.parse(localStorage.getItem('newspapers')) || [];
    newspapers.push({ name, url, thumbnail });
    localStorage.setItem('newspapers', JSON.stringify(newspapers));
    alert('Newspaper added locally!');
  });
}
