async function loadFeaturedAnimals() {
  try {
    const res = await fetch('data/pets.json');
    if (!res.ok) throw new Error('Failed to load animal data');

    const data = await res.json();

    const container = document.querySelector('.animal-list');
    container.innerHTML = ''; 

    const featured = data;

    featured.forEach((animal, index) => {
     
      const card = document.createElement('div');
      card.classList.add('animal-card');
      card.innerHTML = `
        <img src="images/${animal.image}" alt="${animal.name}" width="200" loading="lazy">
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
    console.error('Error loading animal data:', err);
  }
}


document.addEventListener('DOMContentLoaded', loadFeaturedAnimals);


document.addEventListener('DOMContentLoaded', () => {
  const gridBtn = document.getElementById('gridView');
  const listBtn = document.getElementById('listView');
  const container = document.querySelector('.animal-list');

  gridBtn.addEventListener('click', () => {
    container.classList.add('grid-view');
    container.classList.remove('list-view');
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
  });

  listBtn.addEventListener('click', () => {
    container.classList.add('list-view');
    container.classList.remove('grid-view');
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
  });
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

const lastVisitMessage = document.getElementById("last-visit-message");
  const currentDate = new Date();
  const currentTimestamp = currentDate.getTime();
  const lastVisit = localStorage.getItem("lastVisit");

  if (!lastVisit) {
    lastVisitMessage.textContent = "Welcome! We hope you enjoy your visit!";
  } else {
    const lastVisitDate = new Date(parseInt(lastVisit));
    const diffTime = currentTimestamp - lastVisitDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 3600 * 24));

    if (diffDays < 1) {
      lastVisitMessage.textContent = "Back so soon! Great!";
    } else {
      lastVisitMessage.textContent = `You last visited ${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago.`;
    }
  }

  
  localStorage.setItem("lastVisit", currentTimestamp.toString());