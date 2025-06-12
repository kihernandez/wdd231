document.addEventListener("DOMContentLoaded", () => {
    
    const burger = document.querySelector(".burger");
    const navLinks = document.querySelector(".nav-links");

    burger.addEventListener("click", () => {
        navLinks.classList.toggle("open");
    });

    
    document.getElementById("currentyear").textContent = new Date().getFullYear();
    document.getElementById("LastModified").textContent = "Last Modified: " + document.lastModified;

    
    const cardContainer = document.getElementById("card-container");

    fetch('data/places.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(card => {
                const cardElement = document.createElement("div");
                cardElement.classList.add("card");

                cardElement.innerHTML = `
                    <h2>${card.name}</h2>
                    <figure>
                        <img src="images/${card.image}" alt="${card.name}">
                    </figure>
                    <address>${card.address}</address>
                    <p>${card.description}</p>
                    <button class="learn-more" 
                        data-price="${card.price}" 
                        data-hours="${card.openingHours}">
                        Learn More
                    </button>
                `;

                
                cardContainer.appendChild(cardElement);
            });

            
            document.querySelectorAll(".learn-more").forEach(button => {
                button.addEventListener("click", (e) => {
                    const modal = document.getElementById("modal");
                    const price = e.target.dataset.price;
                    const hours = e.target.dataset.hours;

                    document.getElementById("modal-price").textContent = `Price: ${price}`;
                    document.getElementById("modal-hours").textContent = `Hours: ${hours}`;
                    modal.classList.remove("hidden");
                });
            });
        });

    
    const modal = document.getElementById("modal");
    const closeModalBtn = document.getElementById("close-modal");

    closeModalBtn.addEventListener("click", () => {
        modal.classList.add("hidden");
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.add("hidden");
        }
    });

    
    const lastVisitMessage = document.getElementById("last-visit-message");
    const currentDate = new Date();
    const currentTimestamp = currentDate.getTime();
    const lastVisit = localStorage.getItem("lastVisit");

    if (!lastVisit) {
        lastVisitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitDate = new Date(parseInt(lastVisit));
        const diffTime = currentTimestamp - lastVisitDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 3600 * 24));

        if (diffDays < 1) {
            lastVisitMessage.textContent = "Back so soon! Awesome!";
        } else {
            lastVisitMessage.textContent = `You last visited ${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago.`;
        }
    }

    localStorage.setItem("lastVisit", currentTimestamp.toString());
});


