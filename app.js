const newspapersUrl = './newspapers.json';

// Load newspapers
async function loadNewspapers() {
  const response = await fetch(newspapersUrl);
  const newspapers = await response.json();
  const localNewspapers = JSON.parse(localStorage.getItem('newspapers')) || [];
  const combined = [...newspapers, ...localNewspapers];
  renderNewspapers(combined);
}

// Render newspapers
function renderNewspapers(newspapers) {
  const container = document.getElementById('newspaper-list');
  container.innerHTML = newspapers.map((news, index) => `
    <div class="card">
      <h3>${news.title}</h3>
      <a href="${news.url}" target="_blank">Visit</a>
      <button onclick="toggleFavorite(${index})">
        ${isFavorite(index) ? '♥️' : '🖤'}
      </button>
    </div>
  `).join('');
}

// Favorites logic
function toggleFavorite(index) {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  if (favorites.includes(index)) {
    localStorage.setItem('favorites', JSON.stringify(favorites.filter(i => i !== index)));
  } else {
    favorites.push(index);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
  loadNewspapers(); // Re-render
}

function isFavorite(index) {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  return favorites.includes(index);
}

// Initialize
if (location.pathname.includes('index.html')) loadNewspapers();
if (location.pathname.includes('favorites.html')) {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  fetch(newspapersUrl)
    .then(res => res.json())
    .then(newspapers => {
      const localNewspapers = JSON.parse(localStorage.getItem('newspapers')) || [];
      const combined = [...newspapers, ...localNewspapers];
      renderNewspapers(favorites.map(i => combined[i]));
    });
}
