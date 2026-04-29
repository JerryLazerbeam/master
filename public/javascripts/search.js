const searchInput = document.getElementById('searchInput');
const searchDropdown = document.getElementById('searchDropdown');

if (searchInput && searchDropdown) {
  searchInput.addEventListener('input', async () => {
    const query = searchInput.value.trim();

    if (!query) {
      searchDropdown.innerHTML = '';
      searchDropdown.style.display = 'none';
      return;
    }

    const response = await fetch(`/search/suggestions?q=${encodeURIComponent(query)}`);
    const products = await response.json();

    if (products.length === 0) {
      searchDropdown.innerHTML = '<div class="search-dropdown-item">Ingen träff</div>';
      searchDropdown.style.display = 'block';
      return;
    }

  searchDropdown.innerHTML = products.map(product => `
    <a class="search-dropdown-item" href="/search?q=${encodeURIComponent(product.name)}">
      ${product.name}
    </a>
  `).join('');

    searchDropdown.style.display = 'block';
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.search-wrapper')) {
      searchDropdown.style.display = 'none';
    }
  });
}
