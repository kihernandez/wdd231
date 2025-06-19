document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes("thankyou.html")) {
        const urlParams = new URLSearchParams(window.location.search);
        document.getElementById("firstName").textContent = urlParams.get("firstName") || '';
        document.getElementById("lastName").textContent = urlParams.get("lastName") || '';
        document.getElementById("email").textContent = urlParams.get("email") || '';
        document.getElementById("phone").textContent = urlParams.get("phone") || '';
        document.getElementById("adopt").textContent = urlParams.get("adopt") || 'No';
        document.getElementById("donate").textContent = urlParams.get("donate") || 'No';
        document.getElementById("donationAmount").textContent = urlParams.get("donationAmount") || '$0';
        document.getElementById("comments").textContent = urlParams.get("comments") || 'None';
    }
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