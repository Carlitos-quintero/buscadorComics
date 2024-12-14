const API_URL = 'https://api.jikan.moe/v4/anime?q=';

// Función para buscar animes en la API usando una palabra clave
const searchAnime = async (keyword) => {
  try {
    const response = await fetch(`${API_URL}${keyword}`); // Realiza la solicitud a la API con la palabra clave ingresada por el usuario
    const data = await response.json();// Convierte la respuesta de la API a formato JSON
    
    // Llama a la función displayResults para mostrar los datos en la página
    displayResults(data.data);
  } catch (error) {
    console.error("Error al obtener datos del anime:", error);
  }
};

// Función para mostrar los resultados en la página
const displayResults = (results) => {
  // Obtiene el elemento HTML que contendrá los resultados
  const container = document.getElementById('results');
  // Limpia el contenido anterior en el elemento HTML
  container.innerHTML = '';
  // Itera sobre los resultados y agrega cada anime en la lista en el elemento HTML
  results.forEach((anime) => {
    // Agrega el anime en la lista en el elemento HTML con sus datos específicos
    container.innerHTML += `
      <div class="anime-card">
        <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
        <h3>${anime.title}</h3>
        <p>Episodios: ${anime.episodes || 'N/A'}</p>
        <a href="${anime.url}" target="_blank">Leer mas</a>
      </div>
    `;
  });
};

// Agregar un event listener para el evento 'click'
document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('search-btn');
  const searchInput = document.getElementById('search-input');

  searchButton.addEventListener('click', () => {
    const keyword = searchInput.value.trim(); // Limpia espacios en blanco al inicio y final
    if (keyword) {
      searchAnime(keyword); // Llama a la función de búsqueda
    } else {
      alert('Por favor, escribe un nombre de anime para buscar.'); // Manejo de caso vacío
    }
  });
});
