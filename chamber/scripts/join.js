document.addEventListener("DOMContentLoaded", () => {
    const burger = document.querySelector(".burger");
    const navLinks = document.querySelector(".nav-links");

    burger.addEventListener("click", () => {
        navLinks.classList.toggle("open");
    });
});

document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("LastModified").textContent = "Last Modified: " + document.lastModified;
document.addEventListener("DOMContentLoaded", () => {
    // Set timestamp
    const timestampField = document.getElementById("timestamp");
    timestampField.value = new Date().toISOString();

    // Membership data
    const memberships = [
        {
            level: "Non-Profit",
            title: "Non-Profit Membership",
            description: "Free membership for non-profit organizations.",
            price: "Free",
            benefits: ["Community listing", "Event access", "Newsletter"]
        },
        {
            level: "Bronze",
            title: "Bronze Membership",
            description: "Basic membership, highly recommended for small businesses and startups.",
            price: "$50/Month",
            benefits: ["Directory listing", "Networking events", "Small business support and resources", "Starting a business guide and coaching."]
        },
        {
            level: "Silver",
            title: "Silver Membership",
            description: "Premium membership for growing businesses wanting more visibility and support.",
            price: "$200/Month",
            benefits: ["Everything in the Bronze membership", "Homepage spotlight", "Workshops", "Marketing support", "Access to exclusive webinars"]
        },
        {
            level: "Gold",
            title: "Gold Membership",
            description: "Top-tier membership with all features.",
            price: "$300/Month",
            benefits: ["Everything in Bronze and Silver Memberships", "VIP events", "Custom promotions", "Business consulting", "One-on-one coaching", "Business loans and funding assistance."]
        }
    ];

    const container = document.getElementById("membershipCards");

    memberships.forEach((membership, i) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
  <h3>${membership.title}</h3>
  <div class="card-button-container">
    <button data-index="${i}" class="openModal">Learn More</button>
  </div>
  <dialog class="box" id="modal-${i}">
    <h4>${membership.title}</h4>
    <p><b>Description:</b> ${membership.description}</p>
    <ul>${membership.benefits.map(b => `<li>${b}</li>`).join("")}</ul>
    <p><b>Price:</b> ${membership.price}</p>
    <button class="closeModal">Close</button>
  </dialog>
`;
        container.appendChild(card);
    });

    // Modal logic
    document.addEventListener("click", (e) => {
        if (e.target.matches(".openModal")) {
            const index = e.target.getAttribute("data-index");
            document.getElementById(`modal-${index}`).showModal();
        }

        if (e.target.matches(".closeModal")) {
            e.target.closest("dialog").close();
        }
    });
});

// Thankyou.html page
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("thankyou.html")) {
    const urlParams = new URLSearchParams(window.location.search);
    document.getElementById("firstName").textContent = urlParams.get("first-name") || '';
    document.getElementById("lastName").textContent = urlParams.get("last-name") || '';
    document.getElementById("email").textContent = urlParams.get("email") || '';
    document.getElementById("phone").textContent = urlParams.get("tel") || '';
    document.getElementById("orgName").textContent = urlParams.get("organization-name") || '';
    document.getElementById("timestamp").textContent = urlParams.get("timestamp") || '';
  }
});



