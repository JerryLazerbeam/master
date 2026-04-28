document.querySelectorAll('.favorite-form').forEach((form) => {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const heartIcon = form.querySelector('img');

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: {
          Accept: 'application/json'
        }
      });

      if (!response.ok) {
        return;
      }

      const data = await response.json();
      heartIcon.classList.toggle('active', data.isFavorite);
    } catch (error) {
      console.log(error);
    }
  });
});
