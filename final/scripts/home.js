import { fetchPetData, updateLastVisitMessage } from './main.js';

async function loadFeaturedAnimals() {
  try {
    const data = await fetchPetData();
    const container = document.querySelector('.animal-cards');
    container.innerHTML = ''; 

    const featured = data.slice(0, 3);

    featured.forEach((animal, index) => {
      const card = document.createElement('div');
      card.classList.add('animal-card');
      card.innerHTML = `
        <img src="images/${animal.image}" alt="${animal.name}" width="200">
        <h4>${animal.name}</h4>
        <p><strong>Species:</strong> ${animal.species}</p>
        <p><strong>Age:</strong> ${animal.age}</p>
        <button class="learn-more" data-index="${index}">Learn More</button>
      `;
      container.appendChild(card);

      const modal = document.createElement('div');
      modal.classList.add('modal');
      modal.setAttribute('id', `modal-${index}`);
      modal.innerHTML = `
        <div class="modal-content">
          <span class="close-button" data-index="${index}">&times;</span>
          <h3>${animal.name}</h3>
          <p><strong>Description:</strong> ${animal.description}</p>
          <p><strong>Personality:</strong> ${animal.personality}</p>
          <p><strong>History:</strong> ${animal.history}</p>
        </div>
      `;
      document.body.appendChild(modal);
    });

    document.querySelectorAll('.learn-more').forEach(button => {
      button.addEventListener('click', () => {
        const index = button.dataset.index;
        const modal = document.getElementById(`modal-${index}`);
        modal.style.display = 'block';
      });
    });

    document.querySelectorAll('.close-button').forEach(button => {
      button.addEventListener('click', () => {
        const index = button.dataset.index;
        const modal = document.getElementById(`modal-${index}`);
        modal.style.display = 'none';
      });
    });

    window.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
      }
    });

  } catch (err) {
    console.error('Error loading data:', err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadFeaturedAnimals();

  const lastVisitMessage = document.getElementById("last-visit-message");
  updateLastVisitMessage(lastVisitMessage);
});

document.addEventListener("DOMContentLoaded", function () {
  const burger = document.getElementById("burger");
  const navLinks = document.getElementById("navLinks");

  burger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  const links = navLinks.querySelectorAll("a");
  links.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });
});
