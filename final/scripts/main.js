
export async function fetchPetData() {
  const res = await fetch('data/pets.json');
  if (!res.ok) throw new Error('Failed to load animal data');
  return await res.json();
}


export function updateLastVisitMessage(messageElement) {
  const currentDate = new Date();
  const currentTimestamp = currentDate.getTime();
  const lastVisit = localStorage.getItem("lastVisit");

  if (!lastVisit) {
    messageElement.textContent = "Welcome! We hope you enjoy your visit!";
  } else {
    const lastVisitDate = new Date(parseInt(lastVisit));
    const diffTime = currentTimestamp - lastVisitDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 3600 * 24));

    messageElement.textContent = diffDays < 1
      ? "Back so soon! Great!"
      : `You last visited ${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago.`;
  }

  localStorage.setItem("lastVisit", currentTimestamp.toString());
}
