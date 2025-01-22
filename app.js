const newspapersUrl = './newspapers.json';

// Load newspapers
async function loadNewspapers() {
  const response = await fetch(newspapersUrl);
  const newspapers = await response.json();
  renderNewspapers(newspapers);
}

// Render newspapers
function renderNewspapers(newspapers) {
  const container = document.getElementById('newspaper-list');
  container.innerHTML = newspapers.map((news, index) => `
    <div class="card">
      <h3>${news.title}</h3>
      <button onclick="toggleFavorite(this)">
        🖤
      </button>
    </div>
  `).join('');
}

// Toggle favorite button
function toggleFavorite(button) {
  if (button.textContent === '🖤') {
    button.textContent = '♥️';
  } else {
    button.textContent = '🖤';
  }
}

// Initialize
if (location.pathname.includes('index.html')) loadNewspapers();
