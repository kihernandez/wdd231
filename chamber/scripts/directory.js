
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("LastModified").textContent = "Last Modified: " + document.lastModified;


const container = document.createElement('section');
container.className = 'directory-container grid-view'; 
document.querySelector('main').appendChild(container);

async function loadMembers() {
  const response = await fetch('data/members.json');
  const members = await response.json();

  members.forEach(member => {
    const card = document.createElement('div');
    card.className = 'member-card';

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name}" loading="lazy">
      <div class="member-content">
      <h3>${member.name}</h3>
      <p>${member.description}</p>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><a href="${member.website}"  target="_blank">${member.website}</a></p>
      <p><strong>Membership Level:</strong> ${member.membership_level}</p>
      </div>
    `;

    container.appendChild(card);
  });
}

loadMembers();


const gridBtn = document.getElementById('toggle-btn');
const listBtn = document.getElementById('toggle-btn2');

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

const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
